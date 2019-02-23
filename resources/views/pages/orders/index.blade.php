@extends('shopper::layouts.dashboard')
@section('title', __('Orders list'))

@section('content')

    <div class="wrapper-md">
        <div class="links-group">
            <a class="btn btn-primary" href="{{ route('shopper.shoporders.orders.create') }}">
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
                            <th>{{ __('Order Number') }}</th>
                            <th>{{ __('Status') }}</th>
                            <th>{{ __('Payment Method') }}</th>
                            <th>{{ __('Shipping Type') }}</th>
                            <th>{{ __('Email') }}</th>
                            <th>{{ __('Name') }}</th>
                            <th>{{ __('Phone') }}</th>
                            <th>{{ __('Total Price') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($records as $record)
                            <tr
                                data-url="{{ route('shopper.shoporders.orders.edit', $record) }}"
                                class="record-link"
                                id="record_order_{{ $record->id }}"
                            >
                                <td>{{ $record->order_number }}</td>
                                <td>{{ $record->getStatus() }}</td>
                                <td>{{ $record->getPaymentMethod() }}</td>
                                <td>{{ $record->getShippingType() }}</td>
                                <td>{{ $record->getUser('email') }}</td>
                                <td>{{ $record->getUser() }}</td>
                                <td>{{ $record->getUser('phone') }}</td>
                                <td>{{ $record->total_price }}</td>
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
