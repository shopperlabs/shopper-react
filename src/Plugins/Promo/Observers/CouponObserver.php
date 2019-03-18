<?php

namespace Mckenziearts\Shopper\Plugins\Promo\Observers;

use Mckenziearts\Shopper\Plugins\Promo\Models\Coupon;

class CouponObserver
{
    /**
     * Trigger before delete a Coupon
     *
     * @param Coupon $coupon
     */
    public function deleting(Coupon $coupon)
    {
        $coupon->products()->detach();
        $coupon->users()->detach();
    }
}
