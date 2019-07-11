<?php

namespace Mckenziearts\Shopper\Plugins\Users\Models;

use Illuminate\Database\Eloquent\Model;
use Mckenziearts\Shopper\Models\Country;
use Mckenziearts\Shopper\Models\State;

/**
 * @property boolean     active
 */
class Address extends Model
{
    /**
     * {@inheritDoc}
     */
    protected $table = 'shopper_addresses';

    /**
     * {@inheritDoc}
     */
    protected $fillable = [
        'active', 'user_id', 'name', 'country_id', 'state_id', 'city', 'street', 'phone_number', 'address', 'post_code'
    ];

    /**
     * {@inheritDoc}
     */
    protected $hidden = ['created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\belongsTo
     */
    public function state()
    {
        return $this->belongsTo(State::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function country()
    {
        return $this->belongsTo(Country::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
