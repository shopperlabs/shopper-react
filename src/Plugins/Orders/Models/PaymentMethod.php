<?php

namespace Mckenziearts\Shopper\Plugins\Orders\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property boolean     active
 */
class PaymentMethod extends Model
{
    /**
     * {@inheritDoc}
     */
    protected $table = 'shopper_orders_payment_methods';

    /**
     * {@inheritDoc}
     */
    protected $fillable = ['name', 'code', 'active', 'description', 'sort_order'];

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
