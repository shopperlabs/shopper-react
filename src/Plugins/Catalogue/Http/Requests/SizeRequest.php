<?php

namespace Mckenziearts\Shopper\Plugins\Catalogue\Http\Requests;

use Mckenziearts\Shopper\Http\Requests\BaseRequest;

class SizeRequest extends BaseRequest
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
        'name' => 'required|max:50|unique:shopper_media_sizes',
        'dimension' => 'required|max:10|unique:shopper_media_sizes',
    ];

    /**
     * Return update rules
     *
     * @return array
     */
    public function getUpdateRules()
    {
        return [
            'name'  => 'sometimes|required|max:50|unique:shopper_media_sizes,id,' . $this->get('id'),
            'dimension'  => 'sometimes|required|max:10|unique:shopper_media_sizes,id,' . $this->get('id'),
        ];
    }
}
