@extends('shopper::layouts.dashboard')
@section('title', 'View Mailable')

@section('content')

    <div class="wrapper-md">
        <div class="pull-left">
            <div class="btn-group btn-breadcrumb breadcrumb-default">
                <a href="{{ route('shopper.dashboard.home') }}" class="btn btn-default"><i class="fa fa-home"></i></a>
                <a href="{{ route('shopper.settings.mails.mailables.mailableList') }}" class="btn btn-default visible-lg-block visible-md-block">{{ __('Mailables') }}</a>
                <div class="btn btn-info"><b>{{ $resource['name'] }}</b></div>
            </div>
        </div>
        <div class="pull-right">
            <button type="submit" class="btn btn-danger remove-item" data-mailable-name="{{ $resource['name'] }}"><i class="fa fa-trash"></i> {{ __('Delete') }}</button>
        </div>
    </div>

    <section class="wrapper-md">
        <div class="bg-auto mt-4">
            <div class="card my-4">
                <div class="card-header d-flex align-items-center justify-content-between"><h5>{{ __('Details') }}</h5></div>
                <div class="card-body card-bg-secondary">
                    <table class="table mb-0 table-borderless">
                        <tbody>
                            <tr>
                                <td class="table-fit font-weight-sixhundred">{{ __('Name') }}</td>
                                <td>{{ $resource['name'] }}</td>
                            </tr>
                            <tr>
                                <td class="table-fit font-weight-sixhundred">{{ __('Namespace') }}</td>
                                <td>{{ $resource['namespace'] }}</td>
                            </tr>

                            @if ( !empty($resource['data']->subject) )
                                <tr>
                                    <td class="table-fit font-weight-sixhundred">{{ __('Subject') }}</td>
                                    <td>{{ $resource['data']->subject }}</td>
                                </tr>
                            @endif

                            @if ( !empty($resource['data']->locale) )
                                <tr>
                                    <td class="table-fit font-weight-sixhundred">{{ __('Locale') }}</td>
                                    <td>{{ $resource['data']->locale }}</td>
                                </tr>
                            @endif

                            <tr>
                                <td class="table-fit font-weight-sixhundred">{{ __('From') }}</td>
                                <td>
                                    <a href="mailto:{{ collect($resource['data']->from)->first()['address'] }}{{ !collect($resource['data']->from)->isEmpty() ? collect($resource['data']->from)->first()['address'] : config('mail.from.address') }}" class="badge badge-info mr-1 font-weight-light">
                                        @if (!collect($resource['data']->from)->isEmpty())
                                            {{ collect($resource['data']->from)->first()['address'] }}
                                        @else
                                            {{ config('mail.from.address') }} (default)
                                        @endif
                                    </a>
                                </td>
                            </tr>

                            <tr>
                                <td class="table-fit font-weight-sixhundred">{{ __('Reply To') }}</td>
                                <td>
                                    <a href="mailto:{{ collect($resource['data']->replyTo)->first()['address'] }}{{ !collect($resource['data']->replyTo)->isEmpty() ? collect($resource['data']->replyTo)->first()['address'] : config('mail.reply_to.address') }}" class="badge badge-info mr-1 font-weight-light">
                                        @if (!collect($resource['data']->replyTo)->isEmpty())
                                            {{ collect($resource['data']->replyTo)->first()['address'] }}
                                        @else
                                            {{ config('mail.reply_to.address') }} (default)
                                        @endif
                                    </a>
                                </td>
                            </tr>

                            @if ( !empty($resource['data']->cc) )
                                <tr>
                                    <td class="table-fit font-weight-sixhundred">cc</td>
                                    <td>
                                        @foreach( $resource['data']->cc as $cc )
                                            <a href="mailto:{{ $cc['address'] }}" class="badge badge-info mr-1 font-weight-light">{{ $cc['address'] }}</a>
                                        @endforeach
                                    </td>
                                </tr>
                            @endif
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="card my-4">
                <div class="card-header d-flex align-items-center justify-content-between"><h5>{{ __('Preview') }}</h5>
                    @if ( !is_null($resource['view_path']) )
                        <a class="btn btn-primary" href="{{ route('shopper.settings.mails.mailables.editMailable', ['name' => $resource['name']]) }}">{{ __('Edit Template') }}</a>
                    @endif

                </div>
                <div class="embed-responsive embed-responsive-16by9">
                    <iframe class="embed-responsive-item" src="{{ route('shopper.settings.mails.mailables.previewMailable', [ 'name' => $resource['name'] ]) }}" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    </section>

@endsection
