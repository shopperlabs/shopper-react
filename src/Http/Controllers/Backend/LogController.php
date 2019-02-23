<?php

namespace Mckenziearts\Shopper\Http\Controllers\Backend;

use Mckenziearts\Shopper\Http\Controllers\Controller;
use Mckenziearts\Shopper\Models\AccessLog;

class LogController extends Controller
{
    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $records = AccessLog::with('user')->paginate(10);

        return view('shopper::pages.logs.index', compact('records'));
    }
}
