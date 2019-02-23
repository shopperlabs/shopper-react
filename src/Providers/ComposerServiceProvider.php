<?php

namespace Mckenziearts\Shopper\Providers;

use Illuminate\Support\ServiceProvider;
use Mckenziearts\Shopper\Http\Composers\MenuComposer;
use Mckenziearts\Shopper\Http\Composers\ProfileComposer;

class ComposerServiceProvider extends ServiceProvider
{
    /**
     * Indicates if loading of the provider is deferred.
     *
     * @var bool
     */
    protected $defer = true;

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $messages = $this->getLanguages();

        view()->composer('shopper::*', function ($view) use ($messages) {
            return $view->with(['messages' => $messages]);
        });
        view()->composer('shopper::partials.layouts.header', ProfileComposer::class);
        view()->composer('shopper::pages.backend.users.profile', ProfileComposer::class);
        view()->composer('shopper::partials.layouts.sidebar', MenuComposer::class);
        view()->composer('shopper::components.menu.leftSubMenu', MenuComposer::class);
    }

    /**
     * Get language file
     *
     * @return array
     */
    protected function getLanguages() {
        $fr = json_decode(file_get_contents(DASHBOARD_PATH . "/resources/lang/fr.json"));
        $frArray = (array) $fr;

        $englishKeys = array_keys($frArray);
        $englishArray = array_combine($englishKeys, $englishKeys);

        return [
            'en' => $englishArray,
            'fr' => $frArray
        ];
    }
}
