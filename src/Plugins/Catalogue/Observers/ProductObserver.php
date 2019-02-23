<?php

namespace Mckenziearts\Shopper\Plugins\Catalogue\Observers;

use Mckenziearts\Shopper\Plugins\Catalogue\Models\Product;

class ProductObserver
{
    /**
     * Trigger before delete a Product
     *
     * @param Product $product
     */
    public function deleting(Product $product)
    {
        $product->reviews()->delete();
        $product->previewImage()->delete();
        $product->images()->delete();
        $product->offers()->delete();
        $product->relatedProducts()->delete();

        $product->tags()->detach();
        $product->categories()->detach();
    }
}
