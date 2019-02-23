<?php

namespace Mckenziearts\Shopper\Plugins\Tags\Observers;

use Mckenziearts\Shopper\Plugins\Tags\Models\Tag;

class TagObserver
{
    /**
     * Trigger before delete a Tag
     *
     * @param Tag $tag
     */
    public function deleting(Tag $tag)
    {
        $tag->products()->detach();
    }
}
