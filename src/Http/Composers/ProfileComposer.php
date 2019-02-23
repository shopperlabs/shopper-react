<?php

namespace Mckenziearts\Shopper\Http\Composers;

use Cartalyst\Sentinel\Laravel\Facades\Sentinel;
use Illuminate\View\View;

class ProfileComposer
{
    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */
    public function compose(View $view)
    {
        $view->with('profile', Sentinel::check());
    }
}
