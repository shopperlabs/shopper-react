@extends('shopper::layouts.dashboard')
@section('title', __('Manage Roles'))

@section('content')

    <div class="wrapper-md">
        <div class="links-group">
            <a class="btn btn-info" href="{{ route('shopper.settings.backend.users.index') }}">
                <i class="fa fa-arrow-left"></i> {{ __('Return to Manage Administrators') }}
            </a>
        </div>
    </div>

    <section>
        <div class="bg-white-only bg-auto">

            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>{{ __('Name') }}</th>
                            <th>{{ __('Description') }}</th>
                            <th>{{ __('Administrators') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($records as $record)
                            <tr>
                                <td>{{ $record->name }}</td>
                                <td>{{ $record->description }}</td>
                                <td>{{ $record->users()->count() }}</td>
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
