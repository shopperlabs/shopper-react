<?php

namespace Mckenziearts\Shopper\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Storage;

class RequestValidator extends FormRequest
{
    use CustomErrorMessage;

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'disk' => [
                'sometimes',
                'string',
                function ($attribute, $value, $fail) {
                    if (! in_array($value, config('shopper.storage.disk')) ||
                        ! array_key_exists($value, config('filesystems.disks'))
                    ) {
                        return $fail(__('Disk not found!'));
                    }
                },
            ],
            'path' => [
                'sometimes',
                'string',
                'nullable',
                function ($attribute, $value, $fail) {
                    if ($value && ! Storage::disk($this->input('disk'))->exists($value)
                    ) {
                        return $fail(trans('Path not found!'));
                    }
                },
            ],
        ];
    }

    /**
     * Not found message
     *
     * @return array|\Illuminate\Contracts\Translation\Translator|string|null
     */
    public function message()
    {
        return __('Not found!');
    }
}
