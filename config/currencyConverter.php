<?php

return [
    /*
    |--------------------------------------------------------------------------
    | API source.
    |--------------------------------------------------------------------------
    |
    | Possible api source values available :
    | - eurocentralbank
    | - openexchange
    | - yahoo
    | - currencylayer
    | - fixer
    |
    */
    'api-source' => env('CC_API_SOURCE', 'eurocentralbank'),

    //Your app id from openexchangerates.org
    'openex-app-id' =>  env('CC_OPENEXCHANGE_APP_ID', ''),

    //your API access key for currencylayer.com
    'currencylayer-access-key' => env('CC_CURRENCYLAYER_ACCESS_KEY', ''),

    //your API access key for fixer.io
    'fixer-access-key' => env('CC_FIXERIO_ACCESS_KEY', ''),

    //use https? the free version of openexchange and jsonrates does not support https :(
    'use-ssl' => env('CC_USE_SSL', true),

    //When using the free account we can still calculate other currencies based on USD as a base thanks to some basic math.
    //enable this if you want real base values instead of calculated ones. Requires enterprise account from openexchangerates.org
    'openex-use-real-base' => env('CC_USE_REAL_BASE', false),

    //When using the free account we can still calculate other currencies based on EUR as a base thanks to some basic math.
    //enable this if you want real base values instead of calculated ones. Requires payed account on fixer.io
    'fixer-use-real-base' => env('CC_USE_REAL_BASE_FIXER', false),

    //use Laravel cache engine to cache the results.
    'enable-cache' => env('CC_ENABLE_CACHE', true),

    //minutes cache should expire.
    'cache-min' => env('CC_ENABLE_CACHE', 60),

    //use Laravel detailed logging
    'enable-log' => env('CC_ENABLE_LOG', false),
];
