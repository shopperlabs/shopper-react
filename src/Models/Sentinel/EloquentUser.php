<?php

namespace Mckenziearts\Shopper\Models\Sentinel;

use Cartalyst\Sentinel\Users\EloquentUser as BaseUser;
use Illuminate\Notifications\Notifiable;
use Mckenziearts\Shopper\Traits\Mediatable;
use Thomaswelton\LaravelGravatar\Facades\Gravatar;

/**
 * @property string      first_name
 * @property string      last_name
 * @property string      avatar
 * @property string      email
 * @property boolean     is_superuser
 * @property string      last_login
 */
class EloquentUser extends BaseUser
{
    use Mediatable, Notifiable;

    /**
     * {@inheritDoc}
     */
    protected $table = 'backend_users';

    /**
     * {@inheritDoc}
     */
    protected $fillable = [
        'login',
        'email',
        'password',
        'last_name',
        'first_name',
        'avatar',
        'permissions',
        'is_superuser',
    ];

    /**
     * {@inheritDoc}
     */
    protected $dates = ['last_login'];

    /**
     * {@inheritDoc}
     */
    protected $persistableRelationship = 'backend_persistences';

    /**
     * Array of login column names.
     *
     * @var array
     */
    protected $loginNames = ['email', 'login'];

    /**
     * The Eloquent roles model name.
     *
     * @var string
     */
    protected static $rolesModel = 'Mckenziearts\Shopper\Models\Sentinel\EloquentRole';

    /**
     * The Eloquent persistences model name.
     *
     * @var string
     */
    protected static $persistencesModel = 'Mckenziearts\Shopper\Models\Sentinel\EloquentPersistence';

    /**
     * The Eloquent activations model name.
     *
     * @var string
     */
    protected static $activationsModel = 'Mckenziearts\Shopper\Models\Sentinel\EloquentActivation';

    /**
     * The Eloquent reminders model name.
     *
     * @var string
     */
    protected static $remindersModel = 'Mckenziearts\Shopper\Models\Sentinel\EloquentReminder';

    /**
     * The Eloquent throttling model name.
     *
     * @var string
     */
    protected static $throttlingModel = 'Mckenziearts\Shopper\Models\Sentinel\EloquentThrottle';

    /**
     * Returns the roles relationship.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function roles()
    {
        return $this->belongsToMany(static::$rolesModel, 'backend_role_users', 'user_id', 'role_id')->withTimestamps();
    }

    /**
     * Return the ID of the user role
     *
     * @return integer
     */
    public function getRole()
    {
        if ($this->roles->isNotEmpty()) {
            return $this->attributes['role'] = $this->roles()->first()->id;
        }
    }

    /**
     * @return null|string
     */
    public function getLastLogin()
    {
        if (is_null($this->last_login)) {
            return null;
        }

        return $this->last_login->format('Y-m-d h:m');
    }

    /**
     * Return the user avatar
     *
     * @param int $size
     * @return mixed
     */
    public function getAvatar(int $size = 25)
    {
        if (is_null($this->avatar)) {
            return Gravatar::src($this->email, $size);
        }

        return $this->avatar;
    }

    /**
     * Return User full name
     *
     * @return string
     */
    public function getFullName()
    {
        return $this->last_name . ' ' . $this->first_name;
    }

    /**
     * If User is super admin or not
     *
     * @return boolean
     */
    public function isSuperUser()
    {
        return $this->is_superuser === 1;
    }
}
