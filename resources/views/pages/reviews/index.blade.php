@extends('shopper::layouts.dashboard')
@section('title', __('Reviews list'))

@section('content')

    <div class="wrapper-md">
        <div class="links-group">
            <a class="btn btn-primary" href="{{ route('shopper.catalogue.reviews.create') }}">
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
                            <th>{{ __('Active') }}</th>
                            <th>{{ __('Name') }}</th>
                            <th>{{ __('Email') }}</th>
                            <th>{{ __('Phone') }}</th>
                            <th>{{ __('Product') }}</th>
                            <th>{{ __('Rating') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($records as $record)
                            <tr
                                data-url="{{ route('shopper.catalogue.reviews.edit', $record) }}"
                                class="record-link"
                                id="record_{{ $record->id }}"
                            >
                                <td>{{ $record->id }}</td>
                                <td>{{ $record->getActive() }}</td>
                                <td>{{ $record->getUser() }}</td>
                                <td>{{ $record->getUser('email') }}</td>
                                <td>{{ $record->getUser('phone') }}</td>
                                <td>{{ $record->getProduct() }}</td>
                                <td>{{ $record->rate }}</td>
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
