<?php

namespace Mckenziearts\Shopper\Plugins\Catalogue\Observers;

use Mckenziearts\Shopper\Plugins\Catalogue\Models\Brand;

class BrandObserver
{
    /**
     * Trigger before delete a Brand
     *
     * @param Brand $brand
     */
    public function deleting(Brand $brand)
    {
        $brand->previewImage()->delete();
        $brand->images()->delete();

        if ($brand->products->isNotEmpty()) {
            foreach ($brand->products as $product) {
                $product->update(['brand_id' => null]);
            }
        }
    }
}
