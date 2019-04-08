<?php

namespace Mckenziearts\Shopper\Plugins\Catalogue\Observers;

use Mckenziearts\Shopper\Plugins\Catalogue\Models\Banner;

class BannerObserver
{
    /**
     * Trigger before delete a Brand
     *
     * @param Banner $banner
     */
    public function deleting(Banner $banner)
    {
        $banner->image()->delete();
        $banner->backgroundImage()->delete();
    }
}
