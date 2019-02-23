<?php

namespace Mckenziearts\Shopper\Models;

use Illuminate\Database\Eloquent\Model;

class State extends Model
{
    /**
     * {@inheritDoc}
     */
    protected $table = 'shopper_location_states';

    /**
     * {@inheritDoc}
     */
    protected $fillable = ['country_id', 'name', 'code'];

    /**
     * {@inheritDoc}
     */
    protected $hidden = ['created_at', 'updated_at'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function country()
    {
        return $this->belongsTo(Country::class);
    }
}
