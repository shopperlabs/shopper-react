<?php

namespace Mckenziearts\Shopper\Plugins\Promo\Http\Requests;

use Mckenziearts\Shopper\Http\Requests\BaseRequest;

class CouponRequest extends BaseRequest
{
    /**
     * @return bool
     */
    public function wantsJson()
    {
        return true;
    }

    /**
     * Rules for creating a new resource
     *
     * @var array
     */
    public $storeRules = [
        'name'  => 'required|max:255|unique:shopper_coupons',
        'code'  => 'required|max:8|unique:shopper_coupons',
        'value' => 'required',
        'type'  => 'required',
        'date'  => 'required'
    ];

    /**
     * Return update rules
     *
     * @return array
     */
    public function getUpdateRules()
    {
        return [
            'name'  => 'sometimes|required|max:255|unique:shopper_coupons,id,' . $this->get('id'),
            'code'  => 'sometimes|required|max:8|unique:shopper_coupons,id,' . $this->get('id'),
            'value' => 'sometimes|required',
            'type'  => 'sometimes|required',
            'date'  => 'sometimes|required'
        ];
    }
}
