<div class="wrapper-md">

    <div class="container-fluid">
        <div class="row">

            <div class="col-md-6">
                <table class="table">
                    <tr>
                        <td>{{ __('Name of your application') }}</td>
                        <td>{{ $settings->get('name') }}</td>
                    </tr>
                    <tr>
                        <td>{{ __('Environment') }}</td>
                        <td>{{ $settings->get('env') }}</td>
                    </tr>
                    <tr>
                        <td>{{ __('Debugging') }}</td>
                        <td>{{ $settings->get('debug') ? 'true' : 'false' }}</td>
                    </tr>
                    <tr>
                        <td>{{ __('Website URL') }}</td>
                        <td>{{ $settings->get('url') }}</td>
                    </tr>
                    <tr>
                        <td>{{ __('Timezone') }}</td>
                        <td>{{ $settings->get('timezone') }}</td>
                    </tr>
                    <tr>
                        <td>{{ __('Default Language') }}</td>
                        <td>{{ $settings->get('locale') }}</td>
                    </tr>
                    <tr>
                        <td>{{ __('Replacement language') }}</td>
                        <td>{{ $settings->get('fallback_locale') }}</td>
                    </tr>
                </table>
            </div>
            <div class="col-md-6">
                <!-- main content -->
                <section class="wrapper-md cache">
                    <div class="no-border-xs">
                        <div>
                            <div class="row">
                                <form action="{{ route('shopper.settings.globals.store') }}" method="POST">
                                    <div class="pull-right">
                                        <button class="btn btn-info" type="submit">{{ __('Clear cache') }}</button>
                                    </div>
                                    <p class="text-muted text-xs">{{ __('Clear application cache') }}</p>
                                    <input name="action" type="hidden" value="cache">
                                    @csrf
                                </form>
                            </div>
                            <div class="row">
                                <form action="{{ route('shopper.settings.globals.store') }}" method="POST">
                                    <div class="pull-right">
                                        <button class="btn btn-info" type="submit">{{ __('Save config') }}</button>
                                    </div>
                                    <p class="text-muted text-xs">{{ __('Create a cache file for faster configuration downloads') }}</p>
                                    <input name="action" type="hidden" value="config">
                                    @csrf
                                </form>
                            </div>
                            <div class="row">
                                <form action="{{ route('shopper.settings.globals.store') }}" method="POST">
                                    <div class="pull-right">
                                        <button class="btn btn-info" type="submit">{{ __('Save routes') }}</button>
                                    </div>
                                    <p class="text-muted text-xs">{{ __('Create a route cache file for faster route registration') }}</p>
                                    <input name="action" type="hidden" value="route">
                                    @csrf
                                </form>
                            </div>
                            <div class="row">
                                <form action="{{ route('shopper.settings.globals.store') }}" method="POST">
                                    <div class="pull-right">
                                        <button class="btn btn-info" type="submit">{{ __('Clear views') }}</button>
                                    </div>
                                    <p class="text-muted text-xs">{{ __('Clear all compiled view files') }}</p>
                                    <input name="action" type="hidden" value="view">
                                    @csrf
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                <!-- / main content -->
            </div>
        </div>
    </div>
</div>
