<?php

namespace Mckenziearts\Shopper\Plugins\Orders\Http\Requests;

use Mckenziearts\Shopper\Http\Requests\BaseRequest;

class ShippingTypeRequest extends BaseRequest
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
        'name' => 'required|max:255|unique:shopper_orders_shipping_types',
        'code' => 'required|max:255',
    ];

    /**
     * Return update rules
     *
     * @return array
     */
    public function getUpdateRules()
    {
        return [
            'name'  => 'sometimes|required|max:255|unique:shopper_orders_shipping_types,id,' . $this->get('id'),
            'code'  => 'sometimes|required|max:255',
        ];
    }
}
