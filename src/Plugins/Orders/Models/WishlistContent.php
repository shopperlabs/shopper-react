<?php

namespace Mckenziearts\Shopper\Plugins\Orders\Models;

use Illuminate\Database\Eloquent\Model;

class WishlistContent extends Model
{
    /**
     * {@inheritDoc}
     */
    protected $table = 'shopper_wishlist_content';

    /**
     * {@inheritDoc}
     */
    protected $fillable = [
        'wishlist_id',
        'product_id'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function wishlist()
    {
        return $this->belongsTo(Wishlist::class);
    }
}
