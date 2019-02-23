<?php

namespace Mckenziearts\Shopper\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property boolean     is_enabled
 * @property string      flag
 */
class Country extends Model
{
    /**
     * {@inheritDoc}
     */
    protected $table = 'shopper_location_countries';

    /**
     * {@inheritDoc}
     */
    protected $fillable = [
        'is_enabled', 'name', 'code', 'iso_2', 'iso_3', 'calling_code', 'flag'
    ];

    /**
     * {@inheritDoc}
     */
    protected $hidden = ['created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function states()
    {
        return $this->hasMany(State::class);
    }

    /**
     * @return string
     */
    public function isEnabled()
    {
        return ($this->is_enabled === 1) ? __('Yes') : __('No');
    }

    /**
     * @param string $value
     * @return string
     */
    public function getFlagAttribute($value)
    {
        if (is_null($value)) {
            return 'https://via.placeholder.com/30/20';
        }

        return asset("shopper/img/flags/$value");
    }
}
