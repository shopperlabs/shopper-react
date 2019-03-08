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

    /** Mail & Templates route */
    $router->group(['prefix' => 'mails', 'as' => 'mails.'], function (Router $router) {
        $router->get('settings', 'Mails\Configuration@config')->name('config');

        $router->group(['prefix' => 'mailables', 'as' => 'mailables.'], function (Router $router) {
            $router->get('/', 'Mails\MailablesController@index')->name('mailableList');
            $router->get('view/{name}', 'Mails\MailablesController@viewMailable')->name('viewMailable');
            $router->get('edit/template/{name}', 'Mails\MailablesController@editMailable')->name('editMailable');
            $router->post('parse/template', 'Mails\MailablesController@parseTemplate')->name('parseTemplate');
            $router->post('preview/template', 'Mails\MailablesController@previewMarkdownView')->name('previewMarkdownView');

            $router->get('preview/template/previewerror', 'Mails\MailablesController@templatePreviewError')->name('templatePreviewError');
            $router->post('delete', 'Mails\MailablesController@delete')->name('deleteMailable');
            $router->post('new', 'Mails\MailablesController@generateMailable')->name('generateMailable');
            $router->get('preview/{name}', 'Mails\MailablesController@previewMailable')->name('previewMailable');
        });

        $router->group(['prefix' => 'templates', 'as' => 'templates.'], function (Router $router) {
            $router->get('/', 'Mails\TemplatesController@index')->name('templateList');
            $router->get('new', 'Mails\TemplatesController@select')->name('selectNewTemplate');
            $router->get('new/{type}/{name}/{skeleton}', 'Mails\TemplatesController@new')->name('newTemplate');
            $router->get('edit/{templatename}', 'Mails\TemplatesController@view')->name('viewTemplate');
            $router->post('new', 'Mails\TemplatesController@create')->name('createNewTemplate');
            $router->post('delete', 'Mails\TemplatesController@delete')->name('deleteTemplate');
            $router->post('update', 'Mails\TemplatesController@update')->name('updateTemplate');
            $router->post('preview', 'Mails\TemplatesController@previewTemplateMarkdownView')->name('previewTemplateMarkdownView');
        });
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
