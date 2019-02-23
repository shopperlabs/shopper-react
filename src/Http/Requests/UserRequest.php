<?php

namespace Mckenziearts\Shopper\Http\Requests;

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
        'login' => 'required|max:30|unique:backend_users',
        'email' => 'required|max:255|email|unique:backend_users',
        'role'  => 'required'
    ];

    /**
     * Return update rules
     *
     * @return array
     */
    public function getUpdateRules()
    {
        return [
            'login'  => 'sometimes|required|max:30|unique:backend_users,id,' . $this->get('id'),
            'email'  => 'sometimes|required|email|max:255|unique:backend_users,id,' . $this->get('id'),
            'role'   => 'sometimes|required'
        ];
    }
}
