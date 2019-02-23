<?php

namespace Mckenziearts\Shopper\Models\Sentinel;

use Cartalyst\Sentinel\Persistences\EloquentPersistence as BaseEloquentPersistence;

class EloquentPersistence extends BaseEloquentPersistence
{
    /**
     * {@inheritDoc}
     */
    protected $table = 'backend_persistences';

    /**
     * The users model name.
     *
     * @var string
     */
    protected static $usersModel = 'Mckenziearts\Shopper\Models\Sentinel\EloquentUser';
}
