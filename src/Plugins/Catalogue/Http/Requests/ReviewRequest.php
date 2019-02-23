<?php

namespace Mckenziearts\Shopper\Plugins\Catalogue\Http\Requests;

use Mckenziearts\Shopper\Http\Requests\BaseRequest;

class ReviewRequest extends BaseRequest
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
        'user_id'    => 'required|integer',
        'product_id' => 'required|integer',
        'rate'       => 'required|integer',
        'comment'    => 'required',
    ];

    /**
     * Rules for updating a resource
     *
     * @var array
     */
    public $updateRules = [
        'user_id'    => 'sometimes|required|integer',
        'product_id' => 'sometimes|required|integer',
        'rate'       => 'sometimes|required|integer',
        'comment'    => 'sometimes|required',
    ];
}
