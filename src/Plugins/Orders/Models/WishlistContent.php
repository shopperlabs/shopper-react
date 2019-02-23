<?php

namespace Mckenziearts\Shopper\Plugins\Orders\Models;

use Illuminate\Database\Eloquent\Model;

class WishlistContent extends Model
{
    /**
     * {@inheritDoc}
     */
    protected $table = 'shopper_cart_content';

    /**
     * {@inheritDoc}
     */
    protected $fillable = [
        'wishlist_id',
        'offer_id'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function wishlist()
    {
        return $this->belongsTo(Wishlist::class);
    }
}
