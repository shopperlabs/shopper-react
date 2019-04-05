<?php

namespace Mckenziearts\Shopper\Plugins\Catalogue\Models;

use CyrildeWit\EloquentViewable\Viewable;
use CyrildeWit\EloquentViewable\Contracts\Viewable as ViewableContract;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Searchable;
use Mckenziearts\Shopper\Plugins\Promo\Models\Coupon;
use Mckenziearts\Shopper\Plugins\Tags\Models\Tag;
use Mckenziearts\Shopper\Traits\Mediatable;
use Mckenziearts\Shopper\Traits\Resize;

/**
 * @property boolean        active
 * @property integer        brand_id
 * @property integer        category_id
 *
 * @property \Mckenziearts\Shopper\Plugins\Catalogue\Models\Category        category
 * @property \Mckenziearts\Shopper\Plugins\Catalogue\Models\Brand           brand
 * @property \Mckenziearts\Shopper\Models\Media                             previewImage
 */
class Product extends Model implements ViewableContract
{
    use SoftDeletes, Mediatable, Searchable, Resize, Viewable;

    /**
     * {@inheritDoc}
     */
    protected $table = 'shopper_catalogue_products';

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
        'category_id',
        'brand_id',
        'sort_order'
    ];

    /**
     * {@inheritDoc}
     */
    protected $hidden = [
        'sort_order',
        'brand',
        'category',
        'created_at',
        'updated_at'
    ];

    /**
     * Get category of a record
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category()
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function categories()
    {
        return $this->belongsToMany(Category::class, 'shopper_catalogue_additional_categories', 'product_id', 'category_id');
    }

    /**
     * Get brand of a record
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function brand()
    {
        return $this->belongsTo(Brand::class, 'brand_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function offers()
    {
        return $this->hasMany(Offer::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function relatedProducts()
    {
        return $this->hasMany(ProductRelation::class)->where('item_type', self::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function reviews()
    {
        return $this->hasMany(Review::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphToMany
     */
    public function tags()
    {
        return $this->morphToMany(Tag::class, 'taggable', 'shopper_tags_taggables');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphToMany
     */
    public function coupons()
    {
        return $this->morphToMany(Coupon::class, 'couponable', 'shopper_coupons_couponables');
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
     * @return string
     */
    public function getActiveLabel()
    {
        return ($this->active === 1) ? '<span class="badge badge-success">'. __('Yes') .'</span>' : '<span class="badge badge-warning">'. __('No') .'</span>';
    }

    /**
     * Return parent name
     *
     * @return null|string
     */
    public function getBrand()
    {
        if (is_null($this->brand_id)) {
            return null;
        }

        return $this->brand->name;
    }

    /**
     * Return parent name
     *
     * @return null|string
     */
    public function getCategory()
    {
        if (is_null($this->category_id)) {
            return null;
        }

        return $this->category->name;
    }
}
