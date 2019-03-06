@extends('shopper::layouts.dashboard')
@section('title', __('Mail Configuration'))

@section('content')

    <div class="nav-tabs-alt bg-white-only">
        <ul class="nav nav-tabs padder bg-light" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" data-target="#tab-general" role="tab" data-toggle="tab">{{ __('General') }}</a>
            </li>
        </ul>
    </div>

    <section>
        <div class="bg-white-only bg-auto no-border-xs">
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="tab-general">
                    <div class="wrapper-md">
                        <div class="bg-white padder-md">

                            <form action="{{ route('shopper.settings.globals.env') }}" method="POST">
                                @csrf
                                <div class="row">
                                    <div class="col-sm-6">

                                        <div class="form-group">
                                            <label class="control-label">{{ __('Sender Name') }} <span class="text-danger">*</span></label>
                                            <input type="text" class="form-control" name="MAIL_FROM_NAME" value="{{ env('MAIL_FROM_NAME') }}" required>
                                        </div>

                                        <div class="form-group">
                                            <label class="control-label">{{ __('Mail method') }}</label>
                                            <select data-placeholder="Select a driver" name="MAIL_DRIVER" class="select2 form-control">
                                                <option value="smtp">SMTP</option>
                                                <option value="sendmail">Sendmail</option>
                                                <option value="mailgun">Mailgun</option>
                                                <option value="mandrill">Mandrill</option>
                                                <option value="ses">SES</option>
                                                <option value="log">Log file</option>
                                            </select>
                                        </div>

                                        <div class="form-group">
                                            <label class="control-label">{{ __('SMTP port') }}</label>
                                            <input type="text" class="form-control" name="MAIL_PORT" value="{{ env('MAIL_PORT') }}">
                                        </div>

                                        <div class="form-group">
                                            <label class="control-label">{{ __('Username') }}</label>
                                            <input type="text" class="form-control" name="MAIL_USERNAME" value="{{ env('MAIL_USERNAME') }}">
                                        </div>
                                    </div>
                                    <div class="col-sm-6">

                                        <div class="form-group">
                                            <label class="control-label">{{ __('Sender email') }} <span class="text-danger">*</span></label>
                                            <input type="text" class="form-control" name="MAIL_FROM_ADDRESS" value="{{ env('MAIL_FROM_ADDRESS') }}" required>
                                        </div>

                                        <div class="form-group">
                                            <label class="control-label">{{ __('SMTP address') }}</label>
                                            <input type="text" class="form-control" name="MAIL_HOST" value="{{ env('MAIL_HOST') }}">
                                        </div>

                                        <div class="form-group">
                                            <label class="control-label">{{ __('SMTP encryption protocol') }}</label>
                                            <select data-placeholder="Select a driver" name="MAIL_ENCRYPTION" class="select2 form-control">
                                                <option value="tls">TLS</option>
                                                <option value="ssl">SSL</option>
                                                <option value="null">No encryption</option>
                                            </select>
                                        </div>

                                        <div class="form-group">
                                            <label class="control-label">{{ __('Password') }}</label>
                                            <input type="text" class="form-control" name="MAIL_PASSWORD" value="{{ env('MAIL_PASSWORD') }}">
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group m-t-md">
                                    <button class="btn btn-primary" type="submit">{{ __('Save') }}</button>
                                </div>

                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    </section>

@stop
