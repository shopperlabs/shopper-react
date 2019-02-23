<?php

namespace Mckenziearts\Shopper\Plugins\Orders\Models;

use Illuminate\Database\Eloquent\Model;
use Mckenziearts\Shopper\Plugins\Catalogue\Models\Offer;
use Mckenziearts\Shopper\Plugins\Orders\Helpers\PriceHelper;
use Mckenziearts\Shopper\Plugins\Users\Models\User;

/**
 * @property string                    order_number
 * @property string                    $secret_key
 * @property int                       id
 * @property int                       $user_id
 * @property int                       $status_id
 * @property int                       $payment_method_id
 * @property int                       $shipping_type_id
 * @property string                    $shipping_price
 * @property string                    $total_price
 * @property float                     $total_price_value
 * @property array                     $property
 *
 * @property ShippingType               $shippingType
 * @property PaymentMethod              $paymentMethod
 * @property Status                     $status
 * @property User                       $user
 *
 * @property \Illuminate\Database\Eloquent\Collection|Offer[]         offers
 * @property \Illuminate\Database\Eloquent\Collection|OrderContent[]  orderContent
 *
 *
 */
class Order extends Model
{
    /**
     * {@inheritDoc}
     */
    protected $table = 'shopper_orders';

    /**
     * {@inheritDoc}
     */
    protected $fillable = [
        'user_id',
        'status_id',
        'order_number',
        'secret_key',
        'total_price',
        'shipping_price',
        'shipping_type_id',
        'payment_method_id',
        'property',
        'total_price_value'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'property' => 'array',
    ];

    /**
     * {@inheritDoc}
     */
    protected $hidden = ['sort_order', 'created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function status()
    {
        return $this->belongsTo(Status::class, 'status_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function shippingType()
    {
        return $this->belongsTo(ShippingType::class, 'shipping_type_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function paymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class, 'payment_method_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function offers()
    {
        return $this->belongsToMany(Offer::class, 'shopper_orders_offer_order', 'order_id', 'offer_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function orderContent()
    {
        return $this->hasMany(OrderContent::class);
    }

    /**
     * Generate secret key
     *
     * @return string
     */
    public function generateSecretKey()
    {
        return md5($this->order_number . (string) microtime(true));
    }

    /**
     * @return mixed|null
     */
    public function getPaymentMethod()
    {
        if (!$this->getAttribute('payment_method_id')) {
            return null;
        }

        return $this->getAttribute('paymentMethod')->name;
    }

    /**
     * @param string $column
     * @return mixed|null
     */
    public function getStatus(string $column = null)
    {
        if (!$this->getAttribute('status_id')) {
            return null;
        }

        if (is_null($column)) {
            return $this->getAttribute('status')->name;
        }

        return $this->getAttribute('status')->{$column};
    }

    /**
     * @param string $column
     * @return mixed|null
     */
    public function getShippingType(string $column = null)
    {
        if (!$this->getAttribute('shipping_type_id')) {
            return null;
        }

        if (is_null($column)) {
            return $this->getAttribute('shippingType')->name;
        }

        return $this->getAttribute('shippingType')->{$column};
    }

    /**
     * @param string $column
     * @return mixed|null
     */
    public function getUser(string $column = null)
    {
        if (!$this->getAttribute('user_id')) {
            return null;
        }

        if (is_null($column)) {
            return $this->getAttribute('user')->name;
        }

        return $this->getAttribute('user')->{$column};
    }

    /**
     * Get total price value
     *
     * @return float
     */
    public function getTotalPriceAttribute()
    {
        $totalPrice = 0;

        // Get all order content
        $orderContentList = $this->orderContent;

        if ($orderContentList->isEmpty()) {
            return $totalPrice;
        }

        foreach ($orderContentList as $orderContent) {
            $totalPrice += $orderContent->total_price_value;
        }

        $totalPrice = PriceHelper::round($totalPrice);

        return $totalPrice;
    }
}
