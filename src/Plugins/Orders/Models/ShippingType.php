<?php

namespace Mckenziearts\Shopper\Plugins\Orders\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property boolean     active
 */
class ShippingType extends Model
{
    /**
     * {@inheritDoc}
     */
    protected $table = 'shopper_orders_shipping_types';

    /**
     * {@inheritDoc}
     */
    protected $fillable = ['name', 'code', 'active', 'price', 'description', 'sort_order'];

    /**
     * {@inheritDoc}
     */
    protected $hidden = ['sort_order', 'created_at', 'updated_at'];

    /**
     * @return string
     */
    public function isActive()
    {
        return ($this->active === 1) ? __('Yes') : __('No');
    }
}
