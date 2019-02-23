<?php

namespace Mckenziearts\Shopper\Plugins\Orders\Models;

use Illuminate\Database\Eloquent\Model;
use Mckenziearts\Shopper\Plugins\Users\Models\User;

class Wishlist extends Model
{
    /**
     * {@inheritDoc}
     */
    protected $table = 'shopper_wishlists';

    /**
     * {@inheritDoc}
     */
    protected $fillable = [
        'user_id'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function whistlistContent()
    {
        return $this->hasMany(WishlistContent::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
