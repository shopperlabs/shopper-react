<?php

namespace Mckenziearts\Shopper\Plugins\Users\Http\Requests;

use Mckenziearts\Shopper\Http\Requests\BaseRequest;

class AddressRequest extends BaseRequest
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
        'country_id'   => 'required',
        'state_id'     => 'required',
        'city'         => 'required',
        'street'       => 'required',
        'phone_number' => 'required'
    ];

    /**
     * Rules for updating a resource
     *
     * @var array
     */
    public $updateRules = [
        'country_id'   => 'sometimes|required',
        'state_id'     => 'sometimes|required',
        'city'         => 'sometimes|required',
        'street'       => 'sometimes|required',
        'phone_number' => 'sometimes|required'
    ];
}
