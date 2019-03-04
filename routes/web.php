<?php

use Illuminate\Routing\Router;
/*
|--------------------------------------------------------------------------
| Shopper Web Routes
|--------------------------------------------------------------------------
|
| Base route
|
*/

Route::group(['as' => 'fm', 'prefix' => 'file-manager'], function (Router $router) {
    $router->get('initialize', 'FileManagerController@initialize')->name('initialize');
    $router->get('content', 'FileManagerController@content')->name('content');
    $router->get('tree', 'FileManagerController@tree')->name('tree');
    $router->get('select-disk', 'FileManagerController@selectDisk')->name('media.select-disk');
    $router->post('upload', 'FileManagerController@upload')->name('upload');
    $router->post('delete', 'FileManagerController@delete')->name('delete');
    $router->post('paste', 'FileManagerController@paste')->name('paste');
    $router->post('rename', 'FileManagerController@rename')->name('rename');
    $router->get('download', 'FileManagerController@download')->name('download');
    $router->get('thumbnails', 'FileManagerController@thumbnails')->name('thumbnails');
    $router->get('preview', 'FileManagerController@preview')->name('preview');
    $router->get('url', 'FileManagerController@url')->name('url');
    $router->post('create-directory', 'FileManagerController@createDirectory')->name('create-directory');
    $router->post('create-file', 'FileManagerController@createFile')->name('create-file');
    $router->post('update-file', 'FileManagerController@updateFile')->name('update-file');
    $router->get('stream-file', 'FileManagerController@streamFile')->name('stream-file');
    $router->post('zip', 'FileManagerController@zip')->name('zip');
    $router->post('unzip', 'FileManagerController@unzip')->name('unzip');
});
