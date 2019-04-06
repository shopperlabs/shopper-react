# Configurations

With the installation of Shopper you will find new configurations files located at `config/shopper.php`, `config/larasap.php`, `config/scout.php`, `config/currencyConverter.php`, `config/laravellocalization.php` and `config/cartalyst.sentinel.php`.  
And the `shopper.php` file is main for platform, you can find various options to change the configuration of your Shopper installation.

{% hint style="info" %}
If you cache your configuration files please make sure to run `php artisan config:clear` after you changed something.
{% endhint %}

Below we will dive into the configuration file and give a detailed description of each configuration set.

{% hint style="info" %}
**Laravel Scout** It is important to mention that Shopper works with Laravel Scout, by default Algolia is used. Full documentation of Laravel scout [here](https://laravel.com/docs/5.8/scout)
{% endhint %}

## Dashboard prefix

```php
<?php

'prefix' => env('DASHBOARD_PREFIX', 'console'),
```

The system installed on the website can be easily defined by the dashboard prefix, for example it is `wp-admin` for WordPress, and it gives an opportunity to automatically search for old vulnerable versions of software and gain control over it.

There are other reasons but we won't speak of them in this section. The point is that Shopper allows to change dashboard prefix to every other name, `admin` or `administrator` for example.

## Currency

```php
<?php

'currency'  => env('CURRENCY_SYMBOL', 'XAF'),
```

This value of the default currency for your store. It is the default value set in the database `shopper_settings` table.

## Additional resources

```php
<?php

'resources' => [
    'stylesheets' => [
        //'css/custom.css',
    ],
    'scripts'     => [
        //'js/custom.css',
    ],
],
```

During your work you may need to add your own style tables or javascript scenarios globally for all the pages, so you need to add them to relevant arrays.

## Middlewares

```php
<?php

'middleware' => [
    'public'  => ['public', 'web', 'localizationRedirect'],
    'private' => ['web', 'dashboard', 'localizationRedirect'],
],
```

You may add or delete middlewares of graphical interface. At the moment there is two types of middlewares: `public`, that unauthorized user may access to, for example, it may be Login page or Password recovery, and `private` that may be accessed only by authorized users.

You may add as much new middlewares as you want, as example the middleware for IP whitelist filtration.

## Storage

```php
<?php

'storage' => [

    'disk' => ['local'],

    'uploads' => [
        'folder' => 'uploads',
        'path'   => storage_path('app/uploads'),
    ],

    'media' => [
        'folder' => 'media',
        'path'   => storage_path('app/media'),
    ],

],
```

Shopper provide 2 folders for storage. The `uploads` folder contain all public and protected files that uploaded by administration forms \(products, categories, brands and users images\). The second folder `media` is for the `filemanager`. You nedd to create this folder in the Media Menu on Shopper admin dashboard.

## Others config

Shopper has many other configurations files as we said. Shopper come with

* [Scout Extended](https://github.com/algolia/scout-extended): To provide admin product, category, brand and user research
* [Laravel Localization](https://github.com/mcamara/laravel-localization): To make dashboard localization
* [Sentinel](https://github.com/cartalyst/sentinel): the auth provider of Laravel Shopper admin
* [Laravel Cconverter](https://github.com/danielme85/laravel-cconverter): to provide money format and money convertion
* [Larasap](https://github.com/alihesari/laravel-social-auto-posting): to publish product to your Facebook Page and Twitter account

