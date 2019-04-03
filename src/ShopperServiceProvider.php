<?php

namespace Mckenziearts\Shopper;

use Illuminate\Support\ServiceProvider;
use Mckenziearts\Shopper\Facades\Shopper as ShopperFacade;
use Mckenziearts\Shopper\Plugins\ShopperPluginServiceProvider;
use Mckenziearts\Shopper\Providers\ComposerServiceProvider;
use Mckenziearts\Shopper\Providers\ConsoleServiceProvider;
use Mckenziearts\Shopper\Providers\EventServiceProvider;
use Mckenziearts\Shopper\Providers\RouteServiceProvider;

class ShopperServiceProvider extends ServiceProvider
{
    /**
     * Perform post-registration booting of services.
     *
     * @return void
     */
    public function boot()
    {
        $this->loadJsonTranslationsFrom(DASHBOARD_PATH.'/resources/lang');
        $this->registerViews();
        $this->registerProviders();
        $this->registerConfig();
        $this->registerDatabase();

        // Publishing is only necessary when using the CLI.
        if ($this->app->runningInConsole()) {
            $this->bootForConsole();
        }
    }

    /**
     * Register views
     *
     * @return void
     */
    public function registerViews() : void
    {
        $this->loadViewsFrom(array_merge(array_map(function ($path) {
            return $path.'/vendor/mckenziearts/shopper';
        }, config('view.paths')), [
            DASHBOARD_PATH.'/resources/views',
        ]), 'shopper');
    }

    /**
     * Register any package services.
     *
     * @return void
     */
    public function register() : void
    {
        if (! defined('DASHBOARD_PATH')) {
            define('DASHBOARD_PATH', realpath(__DIR__.'/../'));
        }

        $this->app->singleton('shopper', function () {
            return new Shopper();
        });

        /*
        * Create aliases for the dependency.
        */
        $loader = \Illuminate\Foundation\AliasLoader::getInstance();
        $loader->alias('Gravatar', \Thomaswelton\LaravelGravatar\Facades\Gravatar::class);
        $loader->alias('Image', \Intervention\Image\Facades\Image::class);
        // Create aliase for the package provider
        $loader->alias('Shopper', ShopperFacade::class);
    }

    /**
     * Register Package config file
     *
     * @return void
     */
    public function registerConfig() : void
    {
        $this->publishes([
            realpath(DASHBOARD_PATH.'/config/shopper.php')    => config_path('shopper.php'),
            realpath(DASHBOARD_PATH.'/config/larasap.php')    => config_path('larasap.php'),
            realpath(DASHBOARD_PATH.'/config/scout.php')      => config_path('scout.php'),
            realpath(DASHBOARD_PATH.'/config/ttwitter.php')      => config_path('ttwitter.php'),
            realpath(DASHBOARD_PATH.'/config/currencyConverter.php')    => config_path('currencyConverter.php'),
            realpath(DASHBOARD_PATH.'/config/laravellocalization.php')  => config_path('laravellocalization.php'),
            realpath(DASHBOARD_PATH.'/config/cartalyst.sentinel.php')   => config_path('cartalyst.sentinel.php'),
        ], 'shopper');

        $this->mergeConfigFrom(DASHBOARD_PATH.'/config/shopper.php', 'shopper');
    }

    /**
     * Register Datababse and seeders
     *
     * @return void
     */
    public function registerDatabase() : void
    {
        $this->loadMigrationsFrom(DASHBOARD_PATH.'/database/migrations');
        $this->publishes([
            DASHBOARD_PATH.'/database/seeds' => database_path('seeds'),
        ], 'shopper_seeders');
    }

    /**
     * Register provider
     *
     * @return void
     */
    public function registerProviders() : void
    {
        foreach ($this->provides() as $provide) {
            $this->app->register($provide);
        }
    }

    /**
     * Get the services provided by the provider.
     *
     * @return array
     */
    public function provides() : array
    {
        return [
            RouteServiceProvider::class,
            ConsoleServiceProvider::class,
            ComposerServiceProvider::class,
            ShopperPluginServiceProvider::class,
            EventServiceProvider::class
        ];
    }

    /**
     * Console-specific booting.
     *
     * @return void
     */
    protected function bootForConsole()
    {
        // Publishing the configuration file.
        $this->publishes([
            __DIR__.'/../config/shopper.php' => config_path('shopper.php'),
        ], 'shopper.config');
    }
}
