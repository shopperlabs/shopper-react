<?php

namespace Mckenziearts\Shopper\Models\Sentinel;

use Cartalyst\Sentinel\Throttling\EloquentThrottle as BaseEloquentThrottle;

class EloquentThrottle extends BaseEloquentThrottle
{
    /**
     * {@inheritDoc}
     */
    protected $table = 'backend_throttle';
}
