@extends('shopper::layouts.dashboard')
@section('title', __('Access Log'))

@section('content')

    <div class="wrapper-md">
        <div class="links-group">
            <a class="btn btn-primary" href="{{ route('shopper.settings.logs.index') }}">
                <i class="fa fa-refresh"></i> {{ __('Refresh') }}
            </a>
        </div>
    </div>

    <section>
        <div class="bg-white-only bg-auto">

            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th>{{ __('Period') }}</th>
                        <th>{{ __('Username') }}</th>
                        <th>{{ __('IP Address') }}</th>
                        <th>{{ __('Firstname') }}</th>
                        <th>{{ __('Lastname') }}</th>
                        <th>{{ __('Email') }}</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($records as $record)
                        <tr>
                            <td>{{ $record->created_at->format('Y-m-d h:m') }}</td>
                            <td>{{ $record->getUser('login') }}</td>
                            <td>{{ $record->ip_address }}</td>
                            <td>{{ $record->getUser() }}</td>
                            <td>{{ $record->getUser('last_name') }}</td>
                            <td>{{ $record->getUser('email') }}</td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
            <footer class="card-footer col">
                @include('shopper::components.paginations')
            </footer>

        </div>
    </section>

@stop
