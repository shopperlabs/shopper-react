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
    $router->get('initialize', 'FileManagerController@initialize')->name('media.initialize');
    $router->get('content', 'FileManagerController@content')->name('media.content');
    $router->get('tree', 'FileManagerController@tree')->name('media.tree');
    $router->get('select-disk', 'FileManagerController@selectDisk')->name('media.select-disk');
    $router->post('upload', 'FileManagerController@upload')->name('media.upload');
    $router->post('delete', 'FileManagerController@delete')->name('media.delete');
    $router->post('paste', 'FileManagerController@paste')->name('media.paste');
    $router->post('rename', 'FileManagerController@rename')->name('media.rename');
    $router->get('download', 'FileManagerController@download')->name('media.download');
    $router->get('thumbnails', 'FileManagerController@thumbnails')->name('media.thumbnails');
    $router->get('preview', 'FileManagerController@preview')->name('media.preview');
    $router->get('url', 'FileManagerController@url')->name('media.url');
    $router->post('create-directory', 'FileManagerController@createDirectory')->name('media.create-directory');
    $router->post('create-file', 'FileManagerController@createFile')->name('media.create-file');
    $router->post('update-file', 'FileManagerController@updateFile')->name('media.update-file');
    $router->get('stream-file', 'FileManagerController@streamFile')->name('media.stream-file');
    $router->post('zip', 'FileManagerController@zip')->name('media.zip');
    $router->post('unzip', 'FileManagerController@unzip')->name('media.unzip');
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
