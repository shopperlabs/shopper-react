<?php

namespace Mckenziearts\Shopper\Plugins\Catalogue\Models;

use Illuminate\Database\Eloquent\Model;

class Size extends Model
{
    /**
     * {@inheritDoc}
     */
    protected $table = 'shopper_media_sizes';

    /**
     * {@inheritDoc}
     */
    protected $fillable = ['name', 'dimension'];
}
