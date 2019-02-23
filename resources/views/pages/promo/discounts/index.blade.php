@extends('shopper::layouts.dashboard')
@section('title', __('Discounts list'))

@section('content')

    <div class="wrapper-md">
        <div class="links-group">
            <a class="btn btn-primary" href="{{ route('shopper.promo.discounts.create') }}">
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
                            <th>{{ __('Discount Value') }}</th>
                            <th>{{ __('Date of beginning') }}</th>
                            <th>{{ __('Date of end') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($records as $record)
                            <tr
                                data-url="{{ route('shopper.promo.discounts.edit', $record) }}"
                                class="record-link"
                                id="record_{{ $record->id }}"
                            >
                                <td>{{ $record->id }}</td>
                                <td>{{ $record->getActive() }}</td>
                                <td>{{ $record->name }}</td>
                                <td>{{ $record->getValue() }}</td>
                                <td>{{ $record->date_begin->format('l, M d, Y H:i') }}</td>
                                <td>{{ $record->date_end->format('l, M d, Y H:i') }}</td>
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
