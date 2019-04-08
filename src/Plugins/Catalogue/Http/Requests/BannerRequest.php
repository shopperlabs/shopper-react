<?php

namespace Mckenziearts\Shopper\Plugins\Catalogue\Http\Requests;

use Mckenziearts\Shopper\Http\Requests\BaseRequest;

class BannerRequest extends BaseRequest
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
        'code'  => 'required|max:255|unique:shopper_media_banners',
        'title' => 'required|max:255',
    ];

    /**
     * Return update rules
     *
     * @return array
     */
    public function getUpdateRules()
    {
        return [
            'code'   => 'sometimes|required|max:255|unique:shopper_media_banners,id,' . $this->get('id'),
            'title'  => 'sometimes|required|max:255',
        ];
    }
}
