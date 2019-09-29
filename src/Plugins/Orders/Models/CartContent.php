<?php

namespace Mckenziearts\Shopper\Plugins\Orders\Models;

use Illuminate\Database\Eloquent\Model;
use Mckenziearts\Shopper\Plugins\Catalogue\Models\Offer;

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

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function offer()
    {
        return $this->belongsTo(Offer::class);
    }
}
