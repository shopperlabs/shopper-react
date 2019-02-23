<?php

namespace Mckenziearts\Shopper\Models\Sentinel;

use Cartalyst\Sentinel\Reminders\EloquentReminder as BaseEloquentReminder;

class EloquentReminder extends BaseEloquentReminder
{
    /**
     * {@inheritDoc}
     */
    protected $table = 'backend_reminders';
}
