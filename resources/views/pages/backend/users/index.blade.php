@extends('shopper::layouts.dashboard')
@section('title', __('Manage Administrators'))

@section('content')

    <div class="wrapper-md">
        <div class="links-group">
            @if (Sentinel::check()->isSuperUser())
                <a class="btn btn-primary" href="{{ route('shopper.settings.backend.users.create') }}">
                    <i class="fa fa-plus"></i> {{ __('New Administrator') }}
                </a>
            @endif
            <a class="btn btn-info" href="{{ route('shopper.settings.backend.roles.index') }}">
                <i class="fa fa-address-card-o"></i> {{ __('Manage Roles') }}
            </a>
        </div>
    </div>

    <section>
        <div class="bg-white-only bg-auto">

            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>{{ __('Username') }}</th>
                            <th>{{ __('Email') }}</th>
                            <th>{{ __('First Name') }}</th>
                            <th>{{ __('Role') }}</th>
                            <th>{{ __('Super User') }}</th>
                            <th>{{ __('Last Login') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($records as $record)
                            @if (Sentinel::check()->isSuperUser())
                                @if (Sentinel::check()->id !== $record->id)
                                    <tr
                                        data-url="{{ route('shopper.settings.backend.users.edit', $record) }}"
                                        class="record-link"
                                        id="record_{{ $record->id }}"
                                    >
                                @else
                                    <tr data-url="{{ route('shopper.settings.backend.users.profile') }}" class="record-link">
                                @endif
                            @else
                                @if (Sentinel::check()->id !== $record->id)
                                    <tr>
                                @else
                                    <tr data-url="{{ route('shopper.settings.backend.users.profile') }}" class="record-link">
                                @endif
                            @endif
                                <td>{{ $record->login }}</td>
                                <td>{{ $record->email }}</td>
                                <td>{{ $record->first_name }}</td>
                                <td>{{ $record->roles()->first()->name }}</td>
                                <td>{{ $record->isSuperUser() ? __('Yes') : __('No') }}</td>
                                <td>{{ $record->getLastLogin() }}</td>
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
