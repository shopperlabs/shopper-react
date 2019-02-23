<?php

namespace Mckenziearts\Shopper\Http\Requests;

class CountryRequest extends BaseRequest
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
        'name' => 'required|max:255',
        'code' => 'required|max:255',
    ];

    /**
     * Rules for updating a resource
     *
     * @var array
     */
    public $updateRules = [
        'name' => 'sometimes|required|max:255',
        'code' => 'sometimes|required|max:255',
    ];
}
