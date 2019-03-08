# Installation

Shopper has a few requirements you should be aware of before installing

## Requirements

Make sure your server meets the following requirements.

-   Apache 2.2+ or nginx
-   MySQL Server 5.7.8+ , Mariadb 10.3.2+ or PostgreSQL
-   PHP Version 7.1.3+
-   Composer

## Install

Shopper is realy easy to install. After creating your new Laravel application you can include the Shopper package with the following command:

```bash
composer require mckenziearts/shopper  
```

Next make sure to create a new database and add your database credentials to your .env file, you will also want to add your application URL in the `APP_URL` variable:

```php
APP_URL=http://localhost
DB_HOST=localhost
DB_DATABASE=homestead
DB_USERNAME=homestead
DB_PASSWORD=secret
```

{% hint style="info" %}
**Using Laravel 5.4?**  
If you are installing with Laravel 5.4 you will need to [add the Service Provider manually](installation.md#adding-the-service-provider). Otherwise, if you are on 5.5 this happens automatically thanks to package auto-discovery.
{% endhint %}

To install run this command to install Shopper in your project

```bash
php artisan shopper:install
```

This will install shopper, publish vendor files, create shopper and storage symlinks if they don't exist in the public folder, run migrations and seeders classes.

{% hint style="danger" %}
**Specified key was too long error**  
If you see this error message you have an outdated version of MySQL, use the following solution: [https://laravel-news.com/laravel-5-4-key-too-long-error](https://laravel-news.com/laravel-5-4-key-too-long-error)
{% endhint %}

And we're all good to go!

Run the following command to create a user with supreme (at the moment of creation) rights:

```bash
php artisan shopper:admin
```

And you will be prompted for the users username, firstname, lastname and password.

## Adding the Service Provider

{% hint style="info" %}
**This is only required if you are using Laravel 5.4!**  
If you are on Laravel 5.5+ you can skip this step.
{% endhint %}

To add the Shopper Service Provider open up your application `config/app.php` file and add `Mckenziearts\Shopper\ShopperServiceProvider::class,` in the `providers` array like so:

```php
<?php

'providers' => [
    // Laravel Framework Service Providers...
    //...

    // Package Service Providers
    Mckenziearts\Shopper\ShopperServiceProvider::class,
    // ...

    // Application Service Providers
    // ...
],
```

If you want to publish again Shopper's vendor files run these commands:

```bash
php artisan vendor:publish --provider="Mckenziearts\Shopper\ShopperServiceProvider"
php artisan vendor:publish --all
```

Extend your current User Model (usually `app/User.php`) using the `Mckenziearts\Shopper\Plugins\Users\Models\User as ShopperUser` alias:

```php
<?php

use Mckenziearts\Shopper\Plugins\Users\Models\User as ShopperUser; 

class User extends ShopperUser
{
    // ...
}
```

To run the project you may use the built-in server:
`php artisan serve`

After that, run `composer dump-autoload` to finish your installation!

To view Shopper's dashboard go to:

```php
http://localhost:8000/console
```
