<?php

namespace Mckenziearts\Shopper\Http\Requests;

class RoleRequest extends BaseRequest
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
        'name' => 'required|max:20|unique:backend_roles',
        'slug' => 'required|max:255|unique:backend_roles'
    ];

    /**
     * Return update rules
     *
     * @return array
     */
    public function getUpdateRules()
    {
        return [
            'name'  => 'sometimes|required|max:255|unique:backend_roles,id,' . $this->get('id'),
            'slug'  => 'sometimes|required|email|max:255|unique:backend_roles,id,' . $this->get('id')
        ];
    }
}
