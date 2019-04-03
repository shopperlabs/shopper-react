<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Twitter API key
    |--------------------------------------------------------------------------
    |
    |
    */
    'twitter' => [
        'consurmer_key' => env('TWITTER_CONSUMER_KEY', ''),
        'consurmer_secret' => env('TWITTER_CONSUMER_SECRET', ''),
        'access_token' => env('TWITTER_ACCESS_TOKEN', ''),
        'access_token_secret' => env('TWITTER_ACCESS_TOKEN_SECRET', '')
    ],

    /*
    |--------------------------------------------------------------------------
    | Facebook API key
    |--------------------------------------------------------------------------
    |
    |
    */
    'facebook' => [
        'app_id' => env('FACEBOOK_APP_ID', ''),
        'app_secret' => env('FACEBOOK_APP_SECRET', ''),
        'default_graph_version' => env('FACEBOOK_DEFAULT_GRAPH_VERSION', ''),
        'page_access_token' => env('FACEBOOK_PAGE_ACCESS_TOKEN', '')
    ],

];
