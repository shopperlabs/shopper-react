<?php

namespace Mckenziearts\Shopper\Plugins\Users\Http\Requests;

use Mckenziearts\Shopper\Http\Requests\BaseRequest;

class UserRequest extends BaseRequest
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
        'email' => 'required|email|max:255|unique:shopper_users'
    ];

    /**
     * Return update rules
     *
     * @return array
     */
    public function getUpdateRules()
    {
        return [
            'email'  => 'sometimes|required|email|max:255|unique:shopper_users,id,' . $this->get('id')
        ];
    }
}
