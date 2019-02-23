<?php

namespace Mckenziearts\Shopper\Http\Controllers\Backend;

use Cartalyst\Sentinel\Laravel\Facades\Sentinel;
use Mckenziearts\Shopper\Http\Controllers\Controller;

class DashboardController extends Controller
{
    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function dashboard()
    {
        $user = Sentinel::check();

        return view('shopper::pages.dashboard', compact('user'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function workInProgress()
    {
        return view('shopper::pages.working');
    }
}
