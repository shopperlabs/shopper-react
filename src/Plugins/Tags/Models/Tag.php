<?php

namespace Mckenziearts\Shopper\Plugins\Tags\Models;

use CyrildeWit\EloquentViewable\Viewable;
use CyrildeWit\EloquentViewable\Contracts\Viewable as ViewableContract;
use Illuminate\Database\Eloquent\Model;
use Mckenziearts\Shopper\Plugins\Catalogue\Models\Product;

/**
 * @property boolean         active
 */
class Tag extends Model implements ViewableContract
{
    use Viewable;

    /**
     * {@inheritDoc}
     */
    protected $table = 'shopper_tags';

    /**
     * {@inheritDoc}
     */
    protected $fillable = [
        'active',
        'name',
        'slug',
        'preview_text',
        'description',
        'sort_order'
    ];

    /**
     * {@inheritDoc}
     */
    protected $hidden = [
        'sort_order',
        'created_at',
        'updated_at'
    ];

    /**
     * Return record active status
     *
     * @return array|null|string
     */
    public function getActive()
    {
        return ($this->active === 1) ? __('Yes') : __('No');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphToMany
     */
    public function products()
    {
        return $this->morphedByMany(Product::class, 'taggable', 'shopper_tags_taggables');
    }
}
