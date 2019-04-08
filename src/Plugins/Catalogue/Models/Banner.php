<?php

namespace Mckenziearts\Shopper\Plugins\Catalogue\Models;

use Illuminate\Database\Eloquent\Model;
use Mckenziearts\Shopper\Models\Media;

class Banner extends Model
{
    /**
     * {@inheritDoc}
     */
    protected $table = 'shopper_media_banners';

    /**
     * {@inheritDoc}
     */
    protected $fillable = [
        'size_id',
        'code',
        'title',
        'subtitle',
        'text_position',
        'price',
        'button_text',
        'button_icon',
        'link_type',
        'link_url',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function size()
    {
        return $this->belongsTo(Size::class, 'size_id');
    }

    /**
     * Get Image preview for a record
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphOne
     */
    public function image()
    {
        return $this->morphOne(Media::class, 'attachmentable')->where('field', 'image');
    }

    /**
     * Get Image preview for a record
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphOne
     */
    public function backgroundImage()
    {
        return $this->morphOne(Media::class, 'attachmentable')->where('field', 'backgroundImage');
    }

    /**
     * Return parent name
     *
     * @return null|string
     */
    public function getSize()
    {
        if (is_null($this->size_id)) {
            return null;
        }

        return $this->size->name;
    }
}
