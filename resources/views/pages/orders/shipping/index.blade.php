@extends('shopper::layouts.dashboard')
@section('title', __('Shipping type list'))

@section('content')

    <div class="wrapper-md">
        <div class="links-group">
            <a class="btn btn-primary" href="{{ route('shopper.shoporders.shippingtypes.create') }}">
                <i class="fa fa-plus"></i> {{ __('Create') }}
            </a>
        </div>
    </div>

    <section>
        <div class="bg-white-only bg-auto">

            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>{{ __('Name') }}</th>
                            <th>{{ __('Code') }}</th>
                            <th>{{ __('Price') }}</th>
                            <th>{{ __('Active') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($records as $record)
                            <tr
                                data-url="{{ route('shopper.shoporders.shippingtypes.edit', $record) }}"
                                class="record-link"
                                id="record_{{ $record->id }}"
                            >
                                <td>{{ $record->id }}</td>
                                <td>{{ $record->name }}</td>
                                <td>{{ $record->code }}</td>
                                <td>{{ $record->price }}</td>
                                <td>{{ $record->isActive() }}</td>
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
