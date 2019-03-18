<?php

namespace Mckenziearts\Shopper\Plugins\Promo\Providers;

use Illuminate\Support\ServiceProvider;
use Mckenziearts\Shopper\Plugins\Promo\Models\Coupon;
use Mckenziearts\Shopper\Plugins\Promo\Observers\CouponObserver;

class ObserverServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Coupon::observe(CouponObserver::class);
    }
}
