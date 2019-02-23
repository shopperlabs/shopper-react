<?php

namespace Mckenziearts\Shopper\Models;

use Illuminate\Database\Eloquent\Model;
use Mckenziearts\Shopper\Traits\Setting as SettingTrait;

class Setting extends Model
{
    use SettingTrait;

    /**
     * @var string
     */
    protected $table = 'shopper_settings';

    /**
     * @var bool
     */
    public $timestamps = false;

    /**
     * Cache result.
     *
     * @var bool
     */
    public $cache = true;

    /**
     * @var string
     */
    protected $primaryKey = 'key';

    /**
     * @var array
     */
    protected $fillable = ['key', 'value'];

    /**
     * @var array
     */
    protected $casts = [
        'value' => 'array',
    ];
}
