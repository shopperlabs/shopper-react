<?php

namespace Mckenziearts\Shopper\Http\Controllers\Backend;

use Illuminate\Http\Request;
use Mcamara\LaravelLocalization\Facades\LaravelLocalization;
use Mckenziearts\Shopper\Http\Controllers\Controller;

class TranslateController extends Controller
{
    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $locales = LaravelLocalization::getSupportedLocales();

        return view('shopper::pages.translate.index', compact('locales'));
    }

    /**
     * Change website Locale
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function changeLocale(Request $request)
    {
        app()->setLocale($request->input('locale'));
        LaravelLocalization::setLocale($request->input('locale'));

        return redirect(LaravelLocalization::getLocalizedURL(
            $request->input('locale'),
            route('shopper.settings.translate.index')
        ))->with('success', __('Website Locale updated successfully'));
    }
}
