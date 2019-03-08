# Installation

Shopper has a few requirements you should be aware of before installing

## Requirements

Make sure your server meets the following requirements.

-   Apache 2.2+ or nginx
-   MySQL Server 5.7.8+ , Mariadb 10.3.2+ or PostgreSQL
-   PHP Version 7.1.3+
-   Composer

## Install

Shopper is realy easy to install. After creating your new Laravel application (5.6+) you can include the Shopper package with the following command:

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
