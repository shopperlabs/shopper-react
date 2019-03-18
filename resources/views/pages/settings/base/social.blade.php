<div class="wrapper-md">
    <div class="bg-white padder-md">

        <form action="{{ route('shopper.settings.globals.env') }}" method="POST">
            @csrf
            <div class="row">
                <div class="col-sm-6">
                    <h4><i class="fab fa-facebook"></i> {{ __('Facebook API Keys') }}</h4>

                    <div class="line line-dashed b-b line-lg"></div>

                    <div class="form-group">
                        <label class="control-label">{{ __('App ID') }}</label>
                        <input type="text" class="form-control" name="facebook_app_id" value="{{ env('FACEBOOK_APP_ID') }}">
                    </div>

                    <div class="form-group">
                        <label class="control-label">{{ __('App Secret') }}</label>
                        <input type="text" class="form-control" name="facebook_app_secret" value="{{ env('FACEBOOK_APP_SECRET') }}">
                    </div>

                    <div class="form-group">
                        <label class="control-label">{{ __('Default Graph Version') }}</label>
                        <input type="text" class="form-control" name="facebook_default_graph_version" value="{{ env('FACEBOOK_DEFAULT_GRAPH_VERSION') }}">
                    </div>

                    <div class="form-group">
                        <label class="control-label">{{ __('Page Access Token') }}</label>
                        <input type="text" class="form-control" name="facebook_page_access_token" value="{{ env('FACEBOOK_PAGE_ACCESS_TOKEN') }}">
                    </div>
                </div>
                <div class="col-sm-6">
                    <h4><i class="fab fa-twitter"></i> {{ __('Twitter API Keys') }}</h4>

                    <div class="line line-dashed b-b line-lg"></div>

                    <div class="form-group">
                        <label class="control-label">{{ __('Consurmer Key') }}</label>
                        <input type="text" class="form-control" name="twitter_consurmer_key" value="{{ env('TWITTER_CONSURMER_KEY') }}">
                    </div>

                    <div class="form-group">
                        <label class="control-label">{{ __('Consurmer Secret') }}</label>
                        <input type="text" class="form-control" name="twitter_consurmer_secret" value="{{ env('TWITTER_CONSURMER_SECRET') }}">
                    </div>

                    <div class="form-group">
                        <label class="control-label">{{ __('Access Token') }}</label>
                        <input type="text" class="form-control" name="twitter_access_token" value="{{  env('TWITTER_ACCESS_TOKEN')  }}">
                    </div>

                    <div class="form-group">
                        <label class="control-label">{{ __('Access Token Secret') }}</label>
                        <input type="text" class="form-control" name="twitter_access_token_secret" value="{{ env('TWITTER_ACCESS_TOKEN_SECRET') }}">
                    </div>
                </div>
            </div>

            <div class="form-group m-t-md">
                <button class="btn btn-primary" type="submit">{{ __('Save') }}</button>
            </div>

        </form>

    </div>
</div>
