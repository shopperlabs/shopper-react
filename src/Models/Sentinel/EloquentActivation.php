<?php

namespace Mckenziearts\Shopper\Models\Sentinel;

use Cartalyst\Sentinel\Activations\EloquentActivation as BaseEloquentActivation;

class EloquentActivation extends BaseEloquentActivation
{
    /**
     * {@inheritDoc}
     */
    protected $table = 'backend_activations';
}
