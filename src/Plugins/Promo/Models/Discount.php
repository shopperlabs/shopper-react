<?php

namespace Mckenziearts\Shopper\Plugins\Promo\Models;

use Illuminate\Database\Eloquent\Model;
use Mckenziearts\Shopper\Models\Setting;
use Mckenziearts\Shopper\Plugins\Catalogue\Models\Offer;

/**
 * @property boolean        active
 * @property integer        value
 * @property string         type
 */
class Discount extends Model
{
    const DISCOUNT_FIXED = 'fixed';
    const DISCOUNT_PERCENT = 'percent';

    /**
     * {@inheritDoc}
     */
    protected $table = 'shopper_promo_discounts';

    /**
     * {@inheritDoc}
     */
    protected $fillable = [
        'active',
        'name',
        'code',
        'value',
        'type',
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
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function offers()
    {
        return $this->hasMany(Offer::class);
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
            case self::DISCOUNT_FIXED:
                return '- ' . moneyFormat($this->value, (new Setting)->get('site_currency'));
                break;
            case self::DISCOUNT_PERCENT:
                return '-' . $this->value . '%';
                break;
        }
    }
}
