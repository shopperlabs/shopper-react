# Helper methods

Shopper has several helper functions that are ready to use. Here you can find the list of available function that may speed up your development.

## Thumbnails URL

After registering your product, Shopper will generate thumbnails for your products. You may want to view the thumbnails displayed in your view or get the thumbnail URL. Product Model uses `Resize` trait to display thumbnails.

```php
namespace Mckenziearts\Shopper\Plugins\Catalogue\Models;

use Mckenziearts\Shopper\Traits\Resize;

class Product extends Model
{
    use Resize;
}
```

To set custom thumbnails size you can make it on the shopper config file, for crop image, add sizes on the model name array.

```php
/*
    |--------------------------------------------------------------------------
    | Image resize
    |--------------------------------------------------------------------------
    |
    | Resize and create thumbnails for previewImage on Brand, Category and Product
    | Model.
    |
    */
    'quality' => 70,
    'upsize'  => true,
    'thumbnails' => [
        [
            'name'  => 'medium',
            'scale' => '50'
        ],
        [
            'name'  => 'small',
            'scale' => '25'
        ],
        [
            'name' => 'cropped',
            'crop' => [
                'brand' => [
                    '145x50'  => ['width'  => '145', 'height' => '50']
                ],
                'product' => [
                    '1000x1000' => ['width'  => '1000', 'height' => '1000']
                ],
                'category' => [
                    '220x197' => ['width'  => '220', 'height' => '197']
                ]
            ]
        ]
    ],
```

#### Display a single image

```php
@foreach($products as $product)
    <img src="{{ $product->getImageUrl() }}" />
@endforeach
```

Or you can specify the preview image relation field name \(attribute\)

```php
@foreach($products as $product)
    <img src="{{ shopperAsset($product->previewImage->disk_name) }}" />
@endforeach
```

Or to display a cropped image

```php
@foreach($products as $product)
    <img src="{{ $product->thumbnail('cropped', '1000x1000') }}" alt="" />
@endforeach
```

#### Display multiple images

```php
@foreach($product->images as $image)
    <img src="{{ shopperAsset($image->disk_name) }}" alt="" />
@endforeach
```

## Website Currency

If you want to display correct money format, Shopper provide a simple helper to help you, not based on default `money_format` php function :

```php
shopperMoney($product->offers->last()->price, setting('site_currency'))
```

Or inside of any blade template like:

```text
{{ shopperMoney($product->offers->last()->price, setting('site_currency')) }}
```
