<?php

namespace Mckenziearts\Shopper\Plugins\Catalogue\Models;

use Illuminate\Database\Eloquent\Model;

class ProductRelation extends Model
{
    /**
     * {@inheritDoc}
     */
    protected $table = 'shopper_block_products_relations';

    /**
     * {@inheritDoc}
     */
    protected $fillable = ['product_id', 'item_id', 'item_type'];

    /**
     * Get all of the owning attachmentable models.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function item()
    {
        return $this->morphTo();
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }
}
