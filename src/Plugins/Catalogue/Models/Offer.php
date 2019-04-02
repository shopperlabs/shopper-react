<?php

namespace Mckenziearts\Shopper\Plugins\Catalogue\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Mckenziearts\Shopper\Plugins\Orders\Models\Order;

class Offer extends Model
{
    use SoftDeletes;

    /**
     * {@inheritDoc}
     */
    protected $table = 'shopper_catalogue_offers';

    /**
     * {@inheritDoc}
     */
    protected $fillable = [
        'active',
        'name',
        'code',
        'price',
        'old_price',
        'product_id',
        'quantity'
    ];

    /**
     * {@inheritDoc}
     */
    protected $hidden = [
        'product',
        'deleted_at',
        'created_at',
        'updated_at'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function orders()
    {
        return $this->belongsToMany(Order::class, 'shopper_orders_offer_order', 'offer_id', 'order_id');
    }
}
