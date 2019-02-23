<?php

namespace Mckenziearts\Shopper\Plugins\Orders\Models;

use Illuminate\Database\Eloquent\Model;

class CartContent extends Model
{
    /**
     * {@inheritDoc}
     */
    protected $table = 'shopper_cart_content';

    /**
     * {@inheritDoc}
     */
    protected $fillable = [
        'cart_id',
        'offer_id',
        'quantity'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function cart()
    {
        return $this->belongsTo(Cart::class);
    }
}
