<?php

namespace Mckenziearts\Shopper\Plugins;

use Illuminate\Support\ServiceProvider;
use Mckenziearts\Shopper\Plugins\Catalogue\Providers\CatalogueServiceProvider;
use Mckenziearts\Shopper\Plugins\Orders\Providers\OrderServiceProvider;
use Mckenziearts\Shopper\Plugins\Promo\Providers\PromoServiceProvider;
use Mckenziearts\Shopper\Plugins\Tags\Providers\TagServiceProvider;
use Mckenziearts\Shopper\Plugins\Users\Providers\UserServiceProvider;

class ShopperPluginServiceProvider extends ServiceProvider
{
    /**
     * Perform post-registration booting of services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerProviders();
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
            CatalogueServiceProvider::class,
            UserServiceProvider::class,
            OrderServiceProvider::class,
            TagServiceProvider::class,
            PromoServiceProvider::class
        ];
    }
}
