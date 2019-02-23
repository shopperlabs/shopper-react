<?php

namespace Mckenziearts\Shopper\Plugins\Catalogue\Models;

use CyrildeWit\EloquentViewable\Viewable;
use CyrildeWit\EloquentViewable\Contracts\Viewable as ViewableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use Mckenziearts\Shopper\Traits\Mediatable;
use Mckenziearts\Shopper\Traits\Resize;

/**
 * @property boolean            active
 * @property mixed              parent_id
 *
 * @property \Mckenziearts\Shopper\Plugins\Catalogue\Models\Category              parent
 * @property \Mckenziearts\Shopper\Models\Media                                   previewImage
 */
class Category extends Model implements ViewableContract
{
    use Mediatable, Searchable, Resize, Viewable;

    /**
     * {@inheritDoc}
     */
    protected $table = 'shopper_catalogue_categories';

    /**
     * {@inheritDoc}
     */
    protected $fillable = [
        'active',
        'name',
        'slug',
        'code',
        'preview_text',
        'description',
        'parent_id',
        'sort_order'
    ];

    /**
     * {@inheritDoc}
     */
    protected $hidden = [
        'sort_order',
        'parent',
        'created_at',
        'updated_at'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function childs()
    {
        return $this->hasMany(self::class, 'parent_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function products()
    {
        return $this->hasMany(Product::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function otherProducts()
    {
        return $this->belongsToMany(Category::class, 'shopper_catalogue_additional_categories', 'category_id', 'product_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function parent()
    {
        return $this->belongsTo(self::class, 'parent_id');
    }

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
     * Return parent name
     *
     * @return null|string
     */
    public function getParent()
    {
        if (is_null($this->parent_id)) {
            return null;
        }

        return $this->parent->name;
    }
}
