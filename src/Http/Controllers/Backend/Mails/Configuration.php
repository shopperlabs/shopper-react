<?php

namespace Mckenziearts\Shopper\Http\Controllers\Backend\Mails;

use Mckenziearts\Shopper\Http\Controllers\Controller;

class Configuration extends Controller
{
    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function config()
    {
        return view('shopper::pages.mails.config');
    }
}
