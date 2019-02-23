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
    'prefix'     => Mckenziearts\Shopper\Shopper::prefix(). '/shoporders',
    'as'         => 'shopper.shoporders.',
    'namespace'  => 'Mckenziearts\Shopper\Plugins\Orders\Http\Controllers'
], function (Router $router) {
    /** Users route list */
    $router->resource('statuses', 'StatusController');
    $router->get('statuses-lists', 'StatusController@lists')->name('statuses.list');

    /** Shipping types route list */
    $router->resource('shippingtypes', 'ShippingTypeController');
    $router->get('shippingtypes-lists', 'ShippingTypeController@lists')->name('shippingtypes.list');

    /** Orders route list */
    $router->resource('orders', 'OrderController');
    $router->post('order-offers/{id}', 'OrderController@storeOrderOffers')->name('order.offers');
    $router->get('order-offers/{id}', 'OrderController@getOrderOffers')->name('order.getOffers');
    $router->delete('order-offers/{id}/{order_id}', 'OrderController@destroyOrderOffers')->name('order.destroyOffer');

    /** Payment methods route list */
    $router->resource('payments', 'PaymentMethodController');
    $router->get('payments-lists', 'PaymentMethodController@lists')->name('payments.list');

});
