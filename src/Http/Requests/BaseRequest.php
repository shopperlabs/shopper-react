<?php

namespace Mckenziearts\Shopper\Http\Requests;

use Cartalyst\Sentinel\Laravel\Facades\Sentinel;
use Illuminate\Foundation\Http\FormRequest;

class BaseRequest extends FormRequest
{
    /**
     * Rules for creating a new resource
     *
     * @var array
     */
    public $storeRules = [];

    /**
     * Rules for updating a resource
     *
     * @var array
     */
    public $updateRules = [];

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        if (Sentinel::check()) {
            return true;
        }

        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        switch ($this->method()) {
            case self::METHOD_POST: {
                return $this->getStoreRules();
            }
            case self::METHOD_PUT:
            case self::METHOD_PATCH: {
                return $this->getUpdateRules();
            }
            default: {
                return [];
            }
        }
    }

    /**
     * Return store rules
     *
     * @return mixed
     */
    public function getStoreRules()
    {
        return $this->storeRules;
    }

    /**
     * Return update rules
     *
     * @return array
     */
    public function getUpdateRules()
    {
        return $this->updateRules;
    }
}
