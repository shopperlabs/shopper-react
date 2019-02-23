<?php

namespace Mckenziearts\Shopper\Plugins\Orders\Providers;

use Illuminate\Support\ServiceProvider;
use Mckenziearts\Shopper\Plugins\Orders\Models\Order;
use Mckenziearts\Shopper\Plugins\Orders\Observers\OrderObserver;

class ObserverServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Order::observe(OrderObserver::class);
    }
}
