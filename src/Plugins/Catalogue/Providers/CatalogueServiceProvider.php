<?php

namespace Mckenziearts\Shopper\Plugins\Catalogue\Providers;

use Illuminate\Support\ServiceProvider;

class CatalogueServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerDatabase();
        $this->registerMenu();
        $this->registerProviders();

        $this->loadRoutesFrom(__DIR__ . '/../routes.php');
        $this->loadJsonTranslationsFrom(__DIR__ . '/../Resources/Lang');
    }

    /**
     * Register Datababse and seeders
     *
     * @return void
     */
    public function registerDatabase() : void
    {
        $this->loadMigrationsFrom(__DIR__ . '/../Database/Migrations');
    }

    /**
     * Register Plugin Menu
     *
     * @return void
     */
    public function registerMenu()
    {

    }

    /**
     * Register any package services.
     *
     * @return void
     */
    public function register() : void
    {

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
     * Register any package services.
     *
     * @return array
     */
    public function provides() : array
    {
        return [
            ObserverServiceProvider::class
        ];
    }
}
