<?php

namespace Mckenziearts\Shopper\Plugins\Catalogue\Providers;

use Illuminate\Support\ServiceProvider;
use Mckenziearts\Shopper\Plugins\Catalogue\Models\Brand;
use Mckenziearts\Shopper\Plugins\Catalogue\Models\Category;
use Mckenziearts\Shopper\Plugins\Catalogue\Observers\UserObserver;
use Mckenziearts\Shopper\Plugins\Catalogue\Observers\CategoryObserver;

class ObserverServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Brand::observe(UserObserver::class);
        Category::observe(CategoryObserver::class);
    }
}
