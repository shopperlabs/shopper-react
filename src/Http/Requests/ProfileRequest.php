<?php

namespace Mckenziearts\Shopper\Http\Requests;

use Cartalyst\Sentinel\Laravel\Facades\Sentinel;
use Illuminate\Validation\Rule;

class ProfileRequest extends BaseRequest
{
    /**
     * @return bool
     */
    public function wantsJson()
    {
        return true;
    }

    /**
     * Return update rules
     *
     * @return array
     */
    public function getUpdateRules()
    {
        return [
            'login'  => ['required', 'max:255',
                Rule::unique('backend_users')->where(function ($query) {
                    $query->where('login', '<>', Sentinel::check()->login);
                }),
            ],
            'email'  => ['required', 'max:255', 'email',
                Rule::unique('backend_users')->where(function ($query) {
                    $query->where('email', '<>', Sentinel::check()->email);
                }),
            ]
        ];
    }
}
