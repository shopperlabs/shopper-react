<?php

namespace Mckenziearts\Shopper\Http\Controllers\Backend;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Cache;
use Mckenziearts\Shopper\Http\Controllers\Controller;
use Mckenziearts\Shopper\Models\Setting;
use Money\Currencies\ISOCurrencies;

class SettingController extends Controller
{
    /**
     * Base Model.
     *
     * @var
     */
    protected $model;

    /**
     * SettingController constructor.
     *
     * @param Setting $model
     */
    public function __construct(Setting $model)
    {
        $this->model = $model;
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $settings = collect(config('app'));
        $extendSettings = $this->model->get([
            'site_title',
            'site_keywords',
            'site_description',
            'site_address',
            'site_phone',
            'site_currency',
            'site_email',
        ], []);

        $settings = $settings->merge($extendSettings);
        $currencies = new ISOCurrencies();

        return view('shopper::pages.settings.base.index', compact('settings', 'currencies'));
    }

    /**
     * @param Request $request
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $action = $request->get('action', 'index');

        try {
            $this->$action();
            $request->session()->flash('success', __('Operation completed successfully.'));
        } catch (\Exception $exception) {
            $request->session()->flash('warning', $exception->getMessage());
        }

        return back();
    }

    /**
     * @param Request $request
     * @return $this|\Illuminate\Http\RedirectResponse
     */
    public function save(Request $request)
    {
        $settings = $request->except('_token');

        foreach ($settings as $key => $value) {
            $this->model->set($key, $value);
        }

        Cache::flush();

        return back()->with('success', __('Operation completed successfully.'));
    }

    /**
     * @param Request $request
     * @return $this|\Illuminate\Http\RedirectResponse
     */
    public function saveEnv(Request $request)
    {
        setEnvironmentValue($request->except('_token'));

        return back()->with('success', __('Operation completed successfully.'));
    }

    /**
     * Save algolia API
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function saveAlgolia(Request $request)
    {
        setEnvironmentValue($request->except('_token'));

        return back()->with('success', __('Algolai API save successfully'));
    }

    /**
     *  Flush the application cache.
     */
    protected function cache()
    {
        Artisan::call('cache:clear');
    }

    /**
     * Create a cache file for faster configuration loading.
     */
    protected function config()
    {
        if (app()->environment() !== 'local') {
            Artisan::call('config:clear');
            Artisan::call('config:cache');
        }
    }

    /**
     * Create a route cache file for faster route registration.
     */
    protected function route()
    {
        Artisan::call('route:cache');
    }

    /**
     * Clear all compiled view files.
     */
    protected function view()
    {
        Artisan::call('view:clear');
    }
}
