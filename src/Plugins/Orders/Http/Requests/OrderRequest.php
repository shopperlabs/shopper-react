<?php

namespace Mckenziearts\Shopper\Plugins\Orders\Http\Requests;

use Mckenziearts\Shopper\Http\Requests\BaseRequest;

class OrderRequest extends BaseRequest
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
        'user_id' => 'required|integer',
    ];

    /**
     * Return update rules
     *
     * @return array
     */
    public function getUpdateRules()
    {
        return [
            'user_id'  => 'sometimes|required|integer',
        ];
    }
}
