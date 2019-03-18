<?php

namespace Mckenziearts\Shopper\Plugins\Promo\Models;

use Illuminate\Database\Eloquent\Model;

class CouponRelation extends Model
{
    /**
     * {@inheritDoc}
     */
    protected $table = 'shopper_coupons_couponables';

    /**
     * {@inheritDoc}
     */
    protected $fillable = ['coupon_id', 'couponable_type', 'couponable_id'];

    /**
     * Get all of the owning couponable models.
     */
    public function couponable()
    {
        return $this->morphTo();
    }
}
