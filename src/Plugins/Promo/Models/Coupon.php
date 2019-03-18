<?php

namespace Mckenziearts\Shopper\Plugins\Promo\Models;

use Illuminate\Database\Eloquent\Model;
use Mckenziearts\Shopper\Models\Setting;
use Mckenziearts\Shopper\Plugins\Catalogue\Models\Category;
use Mckenziearts\Shopper\Plugins\Catalogue\Models\Product;
use Mckenziearts\Shopper\Plugins\Users\Models\User;

/**
 * @property boolean        active
 * @property integer        value
 * @property string         type
 */
class Coupon extends Model
{
    const COUPON_CART_FIXED = 'fixed_cart';
    const COUPON_PRODUCT_FIXED = 'fixed_product';
    const COUPON_CART_PERCENT = 'percent_cart';
    const COUPON_PRODUCT_PERCENT = 'percent_product';

    /**
     * {@inheritDoc}
     */
    protected $table = 'shopper_coupons';

    /**
     * {@inheritDoc}
     */
    protected $fillable = [
        'active',
        'name',
        'code',
        'value',
        'type',
        'usage_limit',
        'usage_limit_per_user',
        'date_begin',
        'date_end',
        'preview_text',
        'description',
    ];

    /**
     * {@inheritDoc}
     */
    protected $dates = ['date_begin', 'date_end'];

    /**
     * {@inheritDoc}
     */
    protected $hidden = [
        'created_at',
        'updated_at'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphToMany
     */
    public function products()
    {
        return $this->morphedByMany(Product::class, 'couponable', 'shopper_coupons_couponables');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphToMany
     */
    public function users()
    {
        return $this->morphedByMany(User::class, 'couponable', 'shopper_coupons_couponables');
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
     * Get Value of a discount
     *
     * @return string
     */
    public function getValue()
    {
        switch ($this->type) {
            case self::COUPON_CART_FIXED || self::COUPON_PRODUCT_FIXED:
                return '- ' . shopperMoney($this->value, (new Setting)->get('site_currency'));
                break;
            case self::COUPON_CART_PERCENT || self::COUPON_PRODUCT_PERCENT:
                return '-' . $this->value . '%';
                break;
        }
    }
}
