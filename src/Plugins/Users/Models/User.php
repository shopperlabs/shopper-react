<?php

namespace Mckenziearts\Shopper\Plugins\Users\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Scout\Searchable;
use Mckenziearts\Shopper\Plugins\Catalogue\Models\Review;
use Mckenziearts\Shopper\Plugins\Orders\Models\Order;
use Mckenziearts\Shopper\Plugins\Users\Traits\HasWallet;

/**
 * @property boolean    active
 * @property mixed      email_verified_at
 */
class User extends Authenticatable
{
    use Notifiable, Searchable, HasWallet;

    /**
     * {@inheritDoc}
     */
    protected $table = 'shopper_users';

    /**
     * {@inheritDoc}
     */
    protected $fillable = [
        'name', 'email', 'password', 'last_name', 'avatar', 'phone', 'email_verified_at'
    ];

    /**
     * {@inheritDoc}
     */
    protected $dates = ['last_login', 'email_verified_at'];

    /**
     * {@inheritDoc}
     */
    protected $hidden = [
        'password', 'remember_token', 'created_at', 'updated_at', 'email_verified_at'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function addresses()
    {
        return $this->hasMany(Address::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    /**
     * Return User activated status
     *
     * @return string
     */
    public function isActivated()
    {
        return (!is_null($this->email_verified_at)) ? __('Yes') : __('No');
    }
}
