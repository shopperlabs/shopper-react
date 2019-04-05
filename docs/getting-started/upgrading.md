# Upgrading

## Upgrading 1.0 to 1.1

### Laravel and PHP versions
Since Laravel 5.8 support has been added to Shopper 1.1, the minimum PHP version is 7.1. 
Please update your versions accordingly!

### Update your Composer.json
To update to the latest version inside of your composer.json file make sure to update the version of Shopper inside the require declaration inside of your composer.json to:

```json
"tcg/voyager": "1.1.*"
```

And then run composer update

### Update Configuration
The `shopper.php` configuration file has had a few changes.

the settings

```php
/*
|--------------------------------------------------------------------------
| Twitter API key
|--------------------------------------------------------------------------
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
*/
'facebook' => [
    'app_id' => env('FACEBOOK_APP_ID', ''),
    'app_secret' => env('FACEBOOK_APP_SECRET', ''),
    'default_graph_version' => env('FACEBOOK_DEFAULT_GRAPH_VERSION', ''),
    'page_access_token' => env('FACEBOOK_PAGE_ACCESS_TOKEN', '')
],
...
```

was added. This allows you to post to your Twitter account and Facebook page using Shopper core code.

## Troubleshooting

Make sure to send us an email on monneylobe@gmail.com if you have any problems and we will try to help you. Thank you.
