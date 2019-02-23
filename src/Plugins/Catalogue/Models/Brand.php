<?php

namespace Mckenziearts\Shopper\Plugins\Catalogue\Models;

use CyrildeWit\EloquentViewable\Viewable;
use CyrildeWit\EloquentViewable\Contracts\Viewable as ViewableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Scout\Searchable;
use Mckenziearts\Shopper\Traits\Mediatable;
use Mckenziearts\Shopper\Traits\Resize;

/**
 * @property boolean                active
 * @property \Mckenziearts\Shopper\Models\Media          previewImage
 */
class Brand extends Model implements ViewableContract
{
    use Mediatable, Searchable, Resize, Viewable;

    /**
     * {@inheritDoc}
     */
    protected $table = 'shopper_catalogue_brands';

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
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function products()
    {
        return $this->hasMany(Product::class);
    }
}
