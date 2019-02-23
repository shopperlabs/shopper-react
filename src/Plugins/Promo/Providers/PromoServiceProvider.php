<?php

namespace Mckenziearts\Shopper\Plugins\Promo\Providers;

use Illuminate\Support\ServiceProvider;

class PromoServiceProvider extends ServiceProvider
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
}
