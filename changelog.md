# Changelog

All notable changes to `Shopper` will be documented in this file.

## version 1.1.3
- Security release

## Changed
- Load custom css and js to admin dashboard
- Update jQuery version 

## Version 1.1.2
### Changed
- Return index Lists of Model by last created 

### Removed
- Category name unique validation  

## Version 1.1.1
### Added
- Sizes slides management
- Banners management

## Version 1.1
### Added
- Laravel 5.8 support
- Facebook and Twitter API in the core

### Changed
- ProductController method to post to Twitter and Facebook Account
- Config file `shopper.php` add facebook and twitter .env key config
- Status model add `paid` status const for paid command

### Removed
- `toolkito/larasap` dependency to composer.json

## Version 1.0.2
### Added
- Twitter and Facebook card on home dashboard
- `thujohn/twitter` to manage twitter 
- Shopper version status 

### Changed
- ShopperServiceProvider (register new config file `ttwitter.php`)

## Version 1.0.1
### Added
- Algolia indexes informations to dashboard
- Laravel Viewable model migration

## Version 1.0
### Added
- Laravel-mail-editor
- Documentation
- Coupon Management
- Discount Management

### Updated
- Shopper installation command

### Fixed
- Error migration on order management

## Version 1.0.2-beta
### Added
- Filemanager

## Version 1.0.1-beta 
### Remove
-  Creation of admin user during shopper installation

## Version 1.0.0-beta 
### Added
- Everything
