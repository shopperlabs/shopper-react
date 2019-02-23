<?php

namespace Mckenziearts\Shopper\Models\Sentinel;

use Cartalyst\Sentinel\Roles\EloquentRole as BaseRole;

class EloquentRole extends BaseRole
{
    /**
     * {@inheritDoc}
     */
    protected $table = 'backend_roles';

    /**
     * {@inheritDoc}
     */
    protected $fillable = [
        'name',
        'slug',
        'permissions',
        'description'
    ];

    /**
     * The Eloquent users model name.
     *
     * @var string
     */
    protected static $usersModel = 'Mckenziearts\Shopper\Models\Sentinel\EloquentUser';

    /**
     * The Users relationship.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users()
    {
        return $this->belongsToMany(static::$usersModel, 'backend_role_users', 'role_id', 'user_id')->withTimestamps();
    }
}
