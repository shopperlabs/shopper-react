<?php

use Illuminate\Routing\Router;
/*
|--------------------------------------------------------------------------
| Backend Web Routes
|--------------------------------------------------------------------------
|
| Base route
|
*/

Route::get('/', function () { return redirect()->route('shopper.dashboard.home'); });
Route::get('work-in-progress', 'DashboardController@workInProgress')->name('wip');

Route::group(['prefix' => 'dashboard', 'as' => 'dashboard.'], function () {
    Route::get('/', 'DashboardController@dashboard')->name('home');
});

Route::group(['prefix' => 'media'], function (Router $router) {
    $router->post('uploader', 'MediaController@uploader')->name('media.uploader');
    // Integration with editors
    $router->get('/', 'FileManagerController@index')->name('media.index');
});

Route::group(['prefix' => 'settings', 'as' => 'settings.'], function (Router $router) {
    /** Locations route list */
    $router->group(['as' => 'locations.', 'prefix' => 'locations'], function (Router $router) {
        $router->resource('countries', 'CountryController');
        $router->get('countries-list', 'CountryController@lists')->name('countries.list');
        $router->get('countries-states/{id}', 'CountryController@statesList')->name('countries.states');
        $router->resource('states', 'StateController')->except(['create', 'store', 'show', 'update']);
        $router->post('states/{country_id}','StateController@store')->name('states.store')->where('country_id', '[0-9]+');
        $router->put('states/{id}','StateController@update')->name('states.update')->where('id', '[0-9]+');
    });

    /** Mail route */
    $router->group(['prefix' => 'mails', 'as' => 'mails.'], function (Router $router) {
        $router->get('settings', 'Mails\Configuration@config')->name('config');
        $router->get('mailables', 'Mails\MailablesController@index')->name('mailables.mailableList');
    });

    /** Base config route list */
    $router->resource('globals', 'SettingController');
    $router->post('save-settings', 'SettingController@save')->name('globals.save');
    $router->post('save-env', 'SettingController@saveEnv')->name('globals.env');
    $router->post('save-algolia', 'SettingController@saveAlgolia')->name('globals.algolia');

    /** Translate route list */
    $router->get('translate', 'TranslateController@index')->name('translate.index');
    $router->post('change-locale', 'TranslateController@changeLocale')->name('translate.changeLocale');

    /** Access Log route */
    $router->get('logs', 'LogController@index')->name('logs.index');

    /** Locations route list */
    $router->group(['prefix' => 'backend', 'as' => 'backend.'], function (Router $router) {
        $router->resource('users', 'UserController');
        $router->get('user/my-account', 'UserController@profile')->name('users.profile');
        $router->put('user/my-account', 'UserController@saveProfile')->name('users.saveProfile');
        $router->resource('roles', 'RoleController');
        $router->get('roles-list', 'RoleController@lists')->name('roles.list');
    });
});
