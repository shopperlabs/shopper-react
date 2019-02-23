<?php

/*
|--------------------------------------------------------------------------
| Auth Web Routes
|--------------------------------------------------------------------------
|
| Base route
|
*/

Route::group([
    'prefix'  => 'auth',
], function (\Illuminate\Routing\Router $router) {
    // Authentication Routes...
    $router->get('login', 'LoginController@showLoginForm')->name('login');
    $router->post('login', 'LoginController@login')->name('login.auth');

    // Password Reset Routes...
    $router->get('password/reset', 'ForgotPasswordController@showLinkRequestForm')->name('password.request');
    $router->post('password/email', 'ForgotPasswordController@sendResetLinkEmail')->name('password.email');
    $router->get('password/reset/{id}/{token}', 'ForgotPasswordController@showResetForm')->name('password.reset');
    $router->post('password/reset', 'ForgotPasswordController@reset')->name('password.update');


    // logout
    $router->post('logout', 'LoginController@logout')->name('logout');
});
