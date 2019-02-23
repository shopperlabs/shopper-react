<?php

use Illuminate\Routing\Router;
/*
|--------------------------------------------------------------------------
| Catalogue Plugin Web Routes
|--------------------------------------------------------------------------
|
| Base route
|
*/

Route::group([
    'middleware' => config('shopper.middleware.private'),
    'prefix'     => Mckenziearts\Shopper\Shopper::prefix(),
    'as'         => 'shopper.',
    'namespace'  => 'Mckenziearts\Shopper\Plugins\Tags\Http\Controllers'
], function (Router $router) {
    /** Tags route list */
    $router->resource('tags', 'TagController');
    $router->get('set-products/{id}/{tag_id}', 'TagController@setProducts')->name('tags.set-products');
    $router->get('get-products/{id}', 'TagController@getProducts')->name('tags.get-products');
    $router->delete('remove-products/{id}/{tag_id}', 'TagController@removeProducts')->name('tags.remove-products');
});
