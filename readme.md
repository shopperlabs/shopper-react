<p align="center"><img height="100px" src="https://pix.watch/k_qldx/tNOUs0.png"></p>

<p align="center">
<a href="https://travis-ci.org/mckenziearts/shopper"><img src="https://travis-ci.org/mckenziearts/shopper.png?branch=master"></a>
<a href="https://packagist.org/packages/mckenziearts/shopper"><img src="https://img.shields.io/packagist/v/mckenziearts/shopper.svg?style=flat-square"></a>
<a href="https://packagist.org/packages/mckenziearts/shopper"><img src="https://img.shields.io/packagist/dt/mckenziearts/shopper.svg?style=flat-square"></a>
</p>

## Introduction

Shopper is an Admin Management build for Laravel 5.6+ which includes all the necessary for your online market application. This project is inspired by [Orchid/Platform](https://github.com/orchidsoftware/platform).
Please note that this package is still under active development.

![Shopper Screenshot](https://pix.watch/kvtzzS/NK1CPv.png)

# Table of Contents

1. [Requirements](#requirements)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Documentation](#documentation)
6. [Change log](#change-log)
7. [Testing](#testing)
8. [Contributing](#contributing)
9. [Security](#security)
10. [Credits](#credits) 
11. [License](#license)

## Requirements
Make sure your server meets the following requirements.

-   Apache 2.2+ or nginx
-   MySQL Server 5.7.8+ , Mariadb 10.3.2+ or PostgreSQL
-   PHP Version 7.1.3+

## Features
It packs in lots of demanding features that allows your shop to scale in no time:

- [x] Responsive Layout
- [x] Pace Loader
- [x] Admin Authentication (With Sentinel)
- [ ] Custom Admin Dashboard (E-commerce, Google Analytics)
- [x] Automatic Validation Errors
- [x] Element React
- [x] React Component
- [x] Multiple Locale, Currencies
- [x] Image Cropper
- [x] Orders Management System
- [x] Tag Management System
- [x] Discount Management System
- [x] Coupon Management System
- [x] Products, Related Products, Offers Management System
- [x] Customers Management System
- [x] Customer Cart, Wishlist, Product Reviews.
- [x] Impersonate User
- [ ] Custom attributes
- [x] Social Media Post integration (Twitter & Facebook)
- [x] Algolia Search
- [ ] Translate Message
- [ ] Custom configuration (Database download, Google Analytics)
- [x] Open Source
- [x] More to come..

## Installation

Firstly, download the Laravel installer using Composer:
``` bash  
$ composer require mckenziearts/shopper  
```
Run this command to install Shopper in your project
```php
php artisan shopper:install
```
This command will install shopper, publish vendor files, create shopper and storage symlinks if they don't exist in the public folder, run migrations and seeders classes.

Extend your user model using the `Mckenziearts\Shopper\Plugins\Users\Models\User as Authenticatable` alias:

```php
namespace App;

use Mckenziearts\Shopper\Plugins\Users\Models\User as Authenticatable;  
  
class User extends Authenticatable  
{  
  
}

```

Republish Shopper's vendor files
```php
php artisan vendor:publish --provider="Mckenziearts\Shopper\ShopperServiceProvider"
php artisan vendor:publish --all
```

During publishing of shopper vendors files, shopper will add some others package's configurations files to your config folder : `larasap.php`, `scout.php`, `currencyConverter.php`, `laravellocalization.php` and `cartalyst.sentinel.php`

If you want to create an admin user use this command:
```php
php artisan shopper:admin
```

## Usage

Run laravel server
```php
php artisan serve
```

To view Shopper's dashboard go to:
```php
http://localhost:8000/console
```

## Documentation
Official documentation is available [Here](https://docs.laravelshopper.com).


## Change log  
  
Please see the [changelog](changelog.md) for more information on what has changed recently.  
  
## Testing  
  
``` bash  
$ composer test  
```  
  
## Contributing  
  
Please see [contributing.md](contributing.md) for details and a todolist.  
  
## Security  
  
If you discover any security related issues, please email monneylobe@gmail.com instead of using the issue tracker.  
  
## Credits  
  
- [Arthur Monney](https://twitter.com/monneyarthur)
- [Orchid Platform](https://github.com/orchidsoftware/platform)
  
## License  
  
MIT. Please see the [license file](license.md) for more information.  
  
[link-packagist]: https://packagist.org/packages/mckenziearts/shopper
[link-downloads]: https://packagist.org/packages/mckenziearts/shopper
