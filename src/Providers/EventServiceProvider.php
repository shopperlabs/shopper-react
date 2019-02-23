<?php

namespace Mckenziearts\Shopper\Providers;

use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Mckenziearts\Shopper\Events\ImageResize;
use Mckenziearts\Shopper\Listeners\ImageCropped;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        ImageResize::class => [
            ImageCropped::class
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();
    }
}
