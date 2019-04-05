<?php
/**
 * Created by IntelliJ IDEA.
 * User: Mac
 * Date: 2019-03-27
 * Time: 15:14
 */

namespace Mckenziearts\Shopper\Plugins\Users\Http\Requests;


use Mckenziearts\Shopper\Http\Requests\BaseRequest;

class BalanceRequest extends BaseRequest
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
        'amount'   => 'required',
        'type'     => 'required'

    ];

    /**
     * Rules for updating a resource
     *
     * @var array
     */
    public $updateRules = [
        'amount'   => 'sometimes|required',
        'type'     => 'sometimes|required'
    ];
}
