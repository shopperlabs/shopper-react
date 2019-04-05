<?php

namespace Mckenziearts\Shopper;

use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use Mckenziearts\Shopper\Core\Menu;

class Shopper
{
    /**
     * Shopper Version.
     */
    const VERSION = '1.1';

    /**
     * @var
     */
    public $menu = null;

    /**
     * Permission for applications.
     *
     * @var null
     */
    public $permission = null;

    /**
     * @var array
     */
    public $storage = null;

    public function __construct()
    {
        $this->menu = new Menu();
        $this->permission = '';
        $this->storage = collect();
    }

    /**
     * Get the version number of the application.
     *
     * @return string
     */
    public static function version() : string
    {
        return static::VERSION;
    }

    /**
     * @param string $path
     * @return string
     */
    public static function prefix(string $path = '') : string
    {
        $prefix = LaravelLocalization::setLocale() . '/' . config('shopper.prefix');

        return $prefix.$path;
    }

    /**
     * @return null|Menu
     */
    public function menu() : Menu
    {
        return $this->menu;
    }
}
