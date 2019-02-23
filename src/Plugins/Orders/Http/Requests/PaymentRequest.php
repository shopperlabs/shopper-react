<?php

namespace Mckenziearts\Shopper\Plugins\Orders\Http\Requests;

use Mckenziearts\Shopper\Http\Requests\BaseRequest;

class PaymentRequest extends BaseRequest
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
        'name' => 'required|max:255|unique:shopper_orders_payment_methods',
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
            'name'  => 'sometimes|required|max:255|unique:shopper_orders_payment_methods,id,' . $this->get('id'),
            'code'  => 'sometimes|required|max:255',
        ];
    }
}
