<?php

namespace Mckenziearts\Shopper\Plugins\Tags\Providers;

use Illuminate\Support\ServiceProvider;
use Mckenziearts\Shopper\Plugins\Tags\Models\Tag;
use Mckenziearts\Shopper\Plugins\Tags\Observers\TagObserver;

class ObserverServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        Tag::observe(TagObserver::class);
    }
}
