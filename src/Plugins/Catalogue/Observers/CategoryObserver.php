<?php

namespace Mckenziearts\Shopper\Plugins\Catalogue\Observers;

use Mckenziearts\Shopper\Plugins\Catalogue\Models\Category;

class CategoryObserver
{
    /**
     * Trigger before delete a Category
     *
     * @param Category $category
     */
    public function deleting(Category $category)
    {
        $category->otherProducts()->detach();
        $category->previewImage()->delete();
        $category->images()->delete();

        if ($category->products->isNotEmpty()) {
            foreach ($category->products as $product) {
                $product->update(['category_id' => null]);
            }
        }

        if ($category->childs->isNotEmpty()) {
            foreach ($category->childs as $child) {
                $child->update(['parent_id' => null]);
            }
        }
    }
}
