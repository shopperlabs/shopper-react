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
    'prefix'     => Mckenziearts\Shopper\Shopper::prefix(). '/catalogue',
    'as'         => 'shopper.catalogue.',
    'namespace'  => 'Mckenziearts\Shopper\Plugins\Catalogue\Http\Controllers'
], function (Router $router) {
    /** Categories route list */
    $router->resource('categories', 'CategoryController');
    $router->get('categories-list/{id?}', 'CategoryController@categoriesList')->where('id', '[0-9]+')->name('categories.list');
    $router->get('category-products/{id}', 'CategoryController@productsCategory')->where('id', '[0-9]+')->name('categories.products');

    /** Brands route list */
    $router->resource('brands', 'BrandController');
    $router->get('brands-list', 'BrandController@brandsList')->where('id', '[0-9]+')->name('brands.list');

    /** Products route list */
    $router->resource('products', 'ProductController');
    $router->get('products-list/{id?}', 'ProductController@lists')->name('products.list');
    $router->get('set-relateds-products/{id}/{product_id}', 'ProductController@setRelatedProduct')->name('products.setRelatedProducts');
    $router->get('relateds-products/{id}', 'ProductController@relatedProducts')->name('products.relatedProducts');
    $router->delete('remove-relateds-products/{id}/{product_id}', 'ProductController@removeRelatedProducts')->name('products.removeRelatedProducts');
    $router->get('product-offers/{id}', 'ProductController@productOffers')->where('id', '[0-9]+')->name('products.offers');
    $router->get('product-facebook/{id}', 'ProductController@facebook')->name('product.facebook');
    $router->get('product-twitter/{id}', 'ProductController@twitter')->name('product.twitter');

    /** Offers route list */
    $router->resource('offers', 'OfferController')->except(['create', 'store', 'show', 'update']);
    $router->post('offers/{product_id}','OfferController@store')->where('product_id', '[0-9]+')->name('offers.store');
    $router->put('offers/{id}','OfferController@update')->where('id', '[0-9]+')->name('offers.update');
    $router->get('offers/{product_id}', 'OfferController@offersList')->where('product_id', '[0-9]+')->name('offers.list');

    /** Promotions route list */
    $router->resource('promotions', 'PromotionController');

    /** Review route list */
    $router->resource('reviews', 'ReviewController');

});
