<?php

namespace Mckenziearts\Shopper\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Request;
use Mckenziearts\Shopper\Models\Sentinel\EloquentUser;

class AccessLog extends Model
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'backend_access_logs';

    /**
     * {@inheritDoc}
     */
    protected $fillable = ['user_id', 'ip_address'];

    /**
     * Returns the user relationship.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(EloquentUser::class);
    }

    /**
     * Create a log record
     *
     * @param EloquentUser $user
     * @return AccessLog
     */
    public static function add(EloquentUser $user)
    {
        $record = new static;
        $record->user_id = $user->id;
        $record->ip_address = Request::ip();
        $record->save();

        return $record;
    }

    /**
     * Returns a recent entry, latest entry is not considered recent
     * if the creation day is the same as today.
     *
     * @param EloquentUser $user
     * @return self
     */
    public static function getRecent(EloquentUser $user)
    {
        $records = static::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->limit(2)
            ->get();

        if (!count($records)) {
            return null;
        }

        $first = $records->first();

        return !$first->created_at->isToday() ? $first : $records->pop();
    }

    /**
     * @param string $column
     * @return mixed|null
     */
    public function getUser(string $column = null)
    {
        if (! $this->getAttribute('user_id')) {
            return null;
        }

        if (is_null($column) && ! is_null($this->getAttribute('user'))) {
            return $this->getAttribute('user')->first_name;
        }

        if (is_null($this->getAttribute('user'))) {
            return __('Deleted user');
        }

        return $this->getAttribute('user')->{$column};
    }
}
