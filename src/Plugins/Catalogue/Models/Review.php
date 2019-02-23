<?php

namespace Mckenziearts\Shopper\Plugins\Catalogue\Models;

use Illuminate\Database\Eloquent\Model;
use Mckenziearts\Shopper\Plugins\Users\Models\User;

/**
 * @property boolean        active
 */
class Review extends Model
{
    /**
     * {@inheritDoc}
     */
    protected $table = 'shopper_catalogue_reviews';

    /**
     * {@inheritDoc}
     */
    protected $fillable = [
        'active',
        'user_id',
        'product_id',
        'rate',
        'comment'
    ];

    /**
     * {@inheritDoc}
     */
    protected $hidden = [
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
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    /**
     * @param string $column
     * @return mixed|null
     */
    public function getUser(string $column = null)
    {
        if (!$this->getAttribute('user_id')) {
            return null;
        }

        if (is_null($column)) {
            return $this->getAttribute('user')->name;
        }

        return $this->getAttribute('user')->{$column};
    }

    /**
     * @param string $column
     * @return mixed|null
     */
    public function getProduct(string $column = null)
    {
        if (!$this->getAttribute('product_id')) {
            return null;
        }

        if (is_null($column)) {
            return $this->getAttribute('product')->name;
        }

        return $this->getAttribute('product')->{$column};
    }
}
