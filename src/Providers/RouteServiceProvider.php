<?php

namespace Mckenziearts\Shopper\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Mckenziearts\Shopper\Http\Middleware\Dashboard;
use Mckenziearts\Shopper\Http\Middleware\RedirectIfAuthenticated;
use Mckenziearts\Shopper\Shopper;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * This namespace is applied to the controller routes in your routes file.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    protected $namespace = 'Mckenziearts\Shopper\Http\Controllers';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @internal param Router $router
     */
    public function boot()
    {
        $this->app['router']->middlewareGroup('dashboard', [Dashboard::class]);
        $this->app['router']->aliasMiddleware('public', RedirectIfAuthenticated::class);
        $this->app['router']->aliasMiddleware('localize', \Mcamara\LaravelLocalization\Middleware\LaravelLocalizationRoutes::class);
        $this->app['router']->aliasMiddleware('localizationRedirect', \Mcamara\LaravelLocalization\Middleware\LaravelLocalizationRedirectFilter::class);
        $this->app['router']->aliasMiddleware('localeSessionRedirect', \Mcamara\LaravelLocalization\Middleware\LocaleSessionRedirect::class);

        parent::boot();
    }

    /**
     * Define the routes for the application.
     *
     * @return void
     */
    public function map()
    {
        $this->mapBackendRoutes();
        $this->mapAuthRoutes();
    }

    /**
     * Define the "backend" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @return void
     */
    protected function mapBackendRoutes()
    {
        Route::middleware(config('shopper.middleware.private'))
            ->prefix(Shopper::prefix())
            ->as('shopper.')
            ->namespace($this->namespace. '\Backend')
            ->group(realpath(DASHBOARD_PATH.'/routes/backend.php'));
    }

    /**
     * Define the "auth" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @return void
     */
    protected function mapAuthRoutes()
    {
        Route::middleware(config('shopper.middleware.public'))
            ->prefix(Shopper::prefix())
            ->as('shopper.')
            ->namespace($this->namespace. '\Backend\Auth')
            ->group(realpath(DASHBOARD_PATH.'/routes/auth.php'));
    }
}
