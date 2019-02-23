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
    'as'         => 'shopper.promo.',
    'namespace'  => 'Mckenziearts\Shopper\Plugins\Promo\Http\Controllers'
], function (Router $router) {
    /** Discount route list */
    $router->resource('discounts', 'DiscountController');
    $router->get('discount-offers/{id}', 'DiscountController@getDiscountOffers')->name('discounts.getOffers');
    $router->post('discount-offers/{id}', 'DiscountController@storeDiscountOffers')->name('discounts.offers');
    $router->delete('discount-offers/{id}', 'DiscountController@destroyDiscountOffers')->name('discounts.destroyOffer');

});
