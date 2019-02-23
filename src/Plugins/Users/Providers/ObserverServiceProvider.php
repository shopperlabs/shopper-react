<?php

namespace Mckenziearts\Shopper\Plugins\Users\Providers;

use Illuminate\Support\ServiceProvider;
use Mckenziearts\Shopper\Plugins\Users\Models\User;
use Mckenziearts\Shopper\Plugins\Users\Observers\UserObserver;

class ObserverServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        User::observe(UserObserver::class);
    }
}
