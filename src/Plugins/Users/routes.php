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
    'namespace'  => 'Mckenziearts\Shopper\Plugins\Users\Http\Controllers'
], function (Router $router) {
    /** Users route list */
    $router->resource('users', 'UserController');
    $router->get('users-list', 'UserController@lists')->name('users.list');
    $router->get('users-orders/{id}', 'UserController@orders')->name('users.orders');
    $router->get('users-addresses/{id}', 'UserController@addresses')->name('users.addresses');
    $router->get('impersonate-user', 'UserController@impersonate')->name('users.impersonate');

    /** Addresses route list */
    $router->resource('addresses', 'AddressController')->except(['create', 'store', 'show', 'update']);
    $router->post('addresses/{user_id}','AddressController@store')->name('addresses.store')->where('user_id', '[0-9]+');
    $router->put('addresses/{id}','AddressController@update')->name('addresses.update')->where('id', '[0-9]+');

    /** Balance route list */
    $router->resource('transactions', 'BalanceController')->except(['create', 'store', 'show', 'update']);
    $router->post('transactions/{user_id}','BalanceController@store')->name('transactions.store')->where('user_id', '[0-9]+');
    $router->put('transactions/{id}','BalanceController@update')->name('transactions.update')->where('id', '[0-9]+');
    $router->get('users-transactions/{id}', 'UserController@transactions')->name('users.transactions');

});
