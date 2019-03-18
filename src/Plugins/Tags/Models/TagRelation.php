<?php

namespace Mckenziearts\Shopper\Plugins\Tags\Models;

use Illuminate\Database\Eloquent\Model;

class TagRelation extends Model
{
    /**
     * {@inheritDoc}
     */
    protected $table = 'shopper_tags_taggables';

    /**
     * {@inheritDoc}
     */
    protected $fillable = ['tag_id', 'taggable_type', 'taggable_id'];

    /**
     * Get all of the owning taggable models.
     */
    public function taggable()
    {
        return $this->morphTo();
    }
}
