<div class="wrapper-md">
    <div class="bg-white padder-md">
        <form action="{{ route('shopper.settings.globals.save') }}" method="POST">
            @csrf
            <div class="form-group">
                <label class="control-label">{{ __('Name of the site') }}</label>
                <input type="text" class="form-control" name="site_title" value="{{ $settings->get('site_title') }}">
                <small class="form-text text-muted m-b-none">{{ __('Name of your shop') }}</small>
            </div>

            <div class="line line-dashed b-b line-lg"></div>

            <div class="form-group">
                <label class="control-label">{{ __('Website email address') }}</label>
                <input type="email" class="form-control" name="site_email" value="{{ $settings->get('site_email') }}">
                <small class="form-text text-muted m-b-none">{{ __('The contact email for your organization') }}</small>
            </div>

            <div class="line line-dashed b-b line-lg"></div>

            <div class="form-group">
                <label class="control-label">{{ __('Site keywords') }}</label>
                <input type="text" data-role="tagsinput" class="form-control" name="site_keywords" value="{{ $settings->get('site_keywords') }}">
                <small class="form-text text-muted m-b-none">{{ __('Website keywords for SEO') }}
                </small>
            </div>

            <div class="line line-dashed b-b line-lg"></div>

            <div class="form-group">
                <label class="control-label">{{ __('Currency') }}</label>
                <select data-placeholder="{{ __('Select a devise') }}" name="site_currency" class="select2 form-control">
                    @foreach($currencies as $currency)
                        <option value="{{ $currency }}" @if($currency === $settings->get('site_currency')) selected @endif>
                            {{ $currency }}
                        </option>
                    @endforeach
                </select>
                <small class="form-text text-muted m-b-none">{{ __('Currency symbol for price.') }}</small>
            </div>

            <div class="line line-dashed b-b line-lg"></div>

            <div class="form-group">
                <label class="control-label">{{ __('Description of your shop') }}</label>
                <textarea class="form-control no-resize" name="site_description" rows="4">{{ $settings->get('site_description') }}</textarea>
                <small class="form-text text-muted m-b-none">{{ __('Explain in a few words what this site is about.') }}
                </small>
            </div>

            <div class="line line-dashed b-b line-lg"></div>

            <div class="form-group">
                <label class="control-label">{{ __('Address') }}</label>
                <input type="text" class="form-control" name="site_address" value="{{ $settings->get('site_address') }}">
                <small class="form-text text-muted m-b-none">{{ __('The physical or legal address of the organization') }}</small>
            </div>

            <div class="line line-dashed b-b line-lg"></div>

            <div class="form-group">
                <label class="control-label">{{ __('Site phone') }}</label>
                <input type="text" class="form-control" name="site_phone" value="{{ $settings->get('site_phone') }}">
                <small class="form-text text-muted m-b-none">{{ __("The phone we can use to contact your site.") }}</small>
            </div>

            <div class="form-group m-t-md">
                <button class="btn btn-primary" type="submit">{{ __('Save') }}</button>
            </div>

        </form>
    </div>
</div>
