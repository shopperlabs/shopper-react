@extends('shopper::layouts.dashboard')
@section('title', __('Products list'))

@section('content')

    <div class="wrapper-md">
        <div class="links-group">
            <a class="btn btn-primary" href="{{ route('shopper.catalogue.products.create') }}">
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
                            <th>{{ __('Active') }}</th>
                            <th>{{ __('Category') }}</th>
                            <th>{{ __('Brand') }}</th>
                            <th>{{ __('Code') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($records as $record)
                            <tr
                                data-url="{{ route('shopper.catalogue.products.edit', $record) }}"
                                class="record-link"
                                id="record_{{ $record->id }}"
                            >
                                <td>{{ $record->id }}</td>
                                <td>{{ $record->name }}</td>
                                <td>{{ $record->getActive() }}</td>
                                <td>{{ $record->getCategory() }}</td>
                                <td>{{ $record->getBrand() }}</td>
                                <td>{{ $record->code }}</td>
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
