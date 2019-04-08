<?php

namespace Mckenziearts\Shopper\Plugins\Catalogue\Observers;

use Mckenziearts\Shopper\Plugins\Catalogue\Models\Size;

class SizeObserver
{
    /**
     * Trigger before delete a Size
     *
     * @param Size $size
     */
    public function deleting(Size $size)
    {
        $size->banner()->delete();
    }
}
