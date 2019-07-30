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
        'name'      => 'required|max:255|unique:shopper_coupons',
        'code'      => 'required|max:30|unique:shopper_coupons',
        'value'     => 'required',
        'min_value' => 'nullable',
        'type'      => 'required',
        'date'      => 'required'
    ];

    /**
     * Return update rules
     *
     * @return array
     */
    public function getUpdateRules()
    {
        return [
            'name'      => 'sometimes|required|max:255|unique:shopper_coupons,id,' . $this->get('id'),
            'code'      => 'sometimes|required|max:30|unique:shopper_coupons,id,' . $this->get('id'),
            'value'     => 'sometimes|required',
            'min_value' => 'sometimes|nullable',
            'type'      => 'sometimes|required',
            'date'      => 'sometimes|required'
        ];
    }
}
