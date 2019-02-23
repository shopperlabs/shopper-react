<div class="wrapper-md">
    <div class="bg-white padder-md">

        <form action="{{ route('shopper.settings.globals.algolia') }}" method="POST">
            @csrf
            <div class="form-group">
                <label class="control-label">{{ __('Algolia App ID') }}</label>
                <input type="text" class="form-control" name="algolia_app_id" value="{{ env('ALGOLIA_APP_ID') }}">
                <small class="form-text text-muted m-b-none">{{ __('The Algolia App ID.') }}</small>
            </div>

            <div class="line line-dashed b-b line-lg"></div>

            <div class="form-group">
                <label class="control-label">{{ __('Algolia Admin Secret') }}</label>
                <input type="text" class="form-control" name="algolia_secret" value="{{ env('ALGOLIA_SECRET') }}">
                <small class="form-text text-muted m-b-none">{{ __('Algolia Admin secret ID for Server Side.') }}</small>
            </div>

            <div class="line line-dashed b-b line-lg"></div>

            <div class="form-group">
                <label class="control-label">{{ __('Algolia Client Secret') }}</label>
                <input type="text" class="form-control" name="algolia_client_secret" value="{{ env('ALGOLIA_CLIENT_SECRET') }}">
                <small class="form-text text-muted m-b-none">{{ __('Algolia API Secret for client side.') }}</small>
            </div>

            <div class="form-group m-t-md">
                <button class="btn btn-primary" type="submit">{{ __('Save') }}</button>
            </div>

        </form>

    </div>
</div>
