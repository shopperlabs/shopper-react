<?php

namespace Mckenziearts\Shopper\Plugins\Tags\Http\Requests;

use Mckenziearts\Shopper\Http\Requests\BaseRequest;

class TagRequest extends BaseRequest
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
        'name' => 'required|max:255|unique:shopper_tags',
        'slug' => 'max:255|unique:shopper_tags',
    ];

    /**
     * Return update rules
     *
     * @return array
     */
    public function getUpdateRules()
    {
        return [
            'name'  => 'sometimes|required|max:255|unique:shopper_tags,id,' . $this->get('id'),
            'slug'  => 'sometimes|max:255|unique:shopper_tags,id,' . $this->get('id'),
        ];
    }
}
