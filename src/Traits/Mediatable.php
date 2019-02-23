<?php

namespace Mckenziearts\Shopper\Traits;

use Mckenziearts\Shopper\Models\Media;

trait Mediatable
{
    /**
     * Get Image preview for a record
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphOne
     */
    public function previewImage()
    {
        return $this->morphOne(Media::class, 'attachmentable')->where('field', 'preview_image');
    }

    /**
     * Get all images of a record
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function images()
    {
        return $this->morphMany(Media::class, 'attachmentable')->where('field', 'images');
    }
}
