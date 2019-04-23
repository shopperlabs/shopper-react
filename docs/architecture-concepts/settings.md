# Settings

The Settings is the simple «key-value» storage that uses the key to access a value. These storages are usually used to store settings.
The Settings section allows you to set site wide settings you would like. You can add the main headline on your homepage, the shop email address, the default website currency, your site description (important for your seo ranking).

![](../.gitbook/assets/settings.png)

So, if you updated a setting inside of the settings tab and it had the key of site_title you would then be able to reference that setting any where on your site by doing the following:

```php
<?php
//Using the helper
echo setting('site_title');
```
Or inside of any blade template like:

```text
{{ setting('site_title') }}
```

So, now you can update all settings in Shopper Global settings tab and reference them in your application.
