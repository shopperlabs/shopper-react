<?php

namespace Mckenziearts\Shopper\Plugins\Orders\Models;

use Illuminate\Database\Eloquent\Model;
use Mckenziearts\Shopper\Plugins\Catalogue\Models\Offer;
use Mckenziearts\Shopper\Plugins\Orders\Helpers\PriceHelper;

/**
 * @property int    $id
 * @property int    $order_id
 * @property int    $offer_id
 * @property string $price
 * @property string $old_price
 * @property float  $total_price_value
 * @property int    $quantity
 * @property string $code
 */
class OrderContent extends Model
{
    /**
     * {@inheritDoc}
     */
    protected $table = 'shopper_orders_offer_order';

    /**
     * {@inheritDoc}
     */
    protected $fillable = [
        'offer_id',
        'order_id',
        'price',
        'old_price',
        'quantity',
        'code',
        'total_price_value'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function offer()
    {
        return $this->belongsTo(Offer::class, 'offer_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function order()
    {
        return $this->belongsTo(Order::class, 'offer_id');
    }

    /**
     * Get total price value
     *
     * @return float
     */
    public function getTotalPriceValueAttribute()
    {
        $price = $this->quantity * $this->price;
        $price = PriceHelper::round($price);

        return $price;
    }
}
