<?php

namespace Mckenziearts\Shopper\Plugins\Catalogue\Providers;

use Illuminate\Support\ServiceProvider;
use Mckenziearts\Shopper\Plugins\Catalogue\Models\Banner;
use Mckenziearts\Shopper\Plugins\Catalogue\Models\Brand;
use Mckenziearts\Shopper\Plugins\Catalogue\Models\Category;
use Mckenziearts\Shopper\Plugins\Catalogue\Models\Product;
use Mckenziearts\Shopper\Plugins\Catalogue\Models\Size;
use Mckenziearts\Shopper\Plugins\Catalogue\Observers\BannerObserver;
use Mckenziearts\Shopper\Plugins\Catalogue\Observers\BrandObserver;
use Mckenziearts\Shopper\Plugins\Catalogue\Observers\CategoryObserver;
use Mckenziearts\Shopper\Plugins\Catalogue\Observers\ProductObserver;
use Mckenziearts\Shopper\Plugins\Catalogue\Observers\SizeObserver;

class ObserverServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Brand::observe(BrandObserver::class);
        Category::observe(CategoryObserver::class);
        Product::observe(ProductObserver::class);
        Banner::observe(BannerObserver::class);
        Size::observe(SizeObserver::class);
    }
}
