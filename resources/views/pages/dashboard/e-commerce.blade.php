@extends('shopper::layouts.dashboard')
@section('title', __('E-commerce Dashboard'))

@section('content')

    <div class="wrapper-md">

        <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                <a class="dcard dcard-default" href="{{ route('shopper.shoporders.orders.index') }}">
                    <div class="dcard-content">
                        <span class="dcard-icon"><i class="far fa-money-bill-alt"></i></span>
                        <h3 class="dcard-title">
                            {{ shopperMoney($count['revenue'], setting('site_currency')) }}
                        </h3>
                        <p>{{ __('Revenues') }}</p>
                    </div>
                    <div class="dcard-footer">
                        <span class="text">{{ __('See revenues') }}</span>
                        <span class="icon"><i class="fas fa-arrow-alt-circle-right"></i></span>
                    </div>
                </a>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                <a class="dcard dcard-success" href="{{ route('shopper.shoporders.orders.index') }}">
                    <div class="dcard-content">
                        <span class="dcard-icon"><i class="fas fa-shopping-cart"></i></span>
                        <h3 class="dcard-title">{{ $count['newOrders'] }}</h3>
                        <p>{{ __('New Orders') }}</p>
                    </div>
                    <div class="dcard-footer">
                        <span class="text">{{ __('See new orders') }}</span>
                        <span class="icon"><i class="fas fa-arrow-alt-circle-right"></i></span>
                    </div>
                </a>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                <a class="dcard dcard-danger" href="{{ route('shopper.catalogue.products.index') }}">
                    <div class="dcard-content">
                        <span class="dcard-icon"><i class="fas fa-bookmark"></i></span>
                        <h3 class="dcard-title">{{ $count['products'] }}</h3>
                        <p>{{ __('Products') }}</p>
                    </div>
                    <div class="dcard-footer">
                        <span class="text">{{ __('See all products') }}</span>
                        <span class="icon"><i class="fas fa-arrow-alt-circle-right"></i></span>
                    </div>
                </a>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                <a class="dcard dcard-pink" href="{{ route('shopper.users.index') }}">
                    <div class="dcard-content">
                        <span class="dcard-icon"><i class="fas fa-user-friends"></i></span>
                        <h3 class="dcard-title">{{ $count['users'] }}</h3>
                        <p>{{ __('Users') }}</p>
                    </div>
                    <div class="dcard-footer">
                        <span class="text">{{ __('See all users') }}</span>
                        <span class="icon"><i class="fas fa-arrow-alt-circle-right"></i></span>
                    </div>
                </a>
            </div>
        </div>

        <section class="tables">
            <div class="row">
                <div class="col-sm-12 col-md-7">
                    <div class="card mb-3">
                        <div class="card-header">{{ __('Lastest Orders') }}</div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>{{ __('Order Number') }}</th>
                                        <th>{{ __('Status') }}</th>
                                        <th>{{ __('Payment Method') }}</th>
                                        <th>{{ __('Name') }}</th>
                                        <th>{{ __('Order Price') }}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    @forelse($orders as $order)
                                        <tr
                                            data-url="{{ route('shopper.shoporders.orders.edit', $order) }}"
                                            class="record-link"
                                            id="record_order_{{ $order->id }}"
                                        >
                                            <td>{{ $order->order_number }}</td>
                                            <td>{{ $order->getStatus() }}</td>
                                            <td>{{ $order->getPaymentMethod() }}</td>
                                            <td>{{ $order->getUser() }}</td>
                                            <td>{{ shopperMoney($order->total_price, setting('site_currency')) }}</td>
                                        </tr>
                                    @empty
                                        <tr>
                                            <td colspan="5">
                                                @component('shopper::layouts.emptydata')
                                                    <span class="mt-4">{{ __("We didn't find anything - just empty space.") }}</span>
                                                    <a class="btn btn-primary mt-3" href="{{ route('shopper.shoporders.orders.index') }}">{{ __('View Order Management') }}</a>
                                                @endcomponent
                                            </td>
                                        </tr>
                                    @endforelse
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-sm-12 col-md-5">
                    <div class="card mb-3">
                        <div class="card-header">{{ __('Recently Added Products') }}</div>
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-striped table-product">
                                    <thead>
                                        <tr>
                                            <th>{{ __('Active') }}</th>
                                            <th>{{ __('Name') }}</th>
                                            <th>{{ __('Image') }}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    @forelse($products as $product)
                                        <tr
                                            data-url="{{ route('shopper.catalogue.products.edit', $product) }}"
                                            class="record-link"
                                            id="record_{{ $product->id }}"
                                        >
                                            <td>{!! $product->getActiveLabel() !!}</td>
                                            <td>{{ $product->name }}</td>
                                            <td><img src="{{ $product->getImageUrl() }}" width="50" alt="product image"></td>
                                        </tr>
                                    @empty
                                        <tr>
                                            <td colspan="3">
                                                @component('shopper::layouts.emptydata')
                                                    <span class="mt-4">{{ __("We didn't find anything - just empty space.") }}</span>
                                                    <a class="btn btn-primary mt-3" href="{{ route('shopper.catalogue.products.create') }}">{{ __('Add New Product') }}</a>
                                                @endcomponent
                                            </td>
                                        </tr>
                                    @endforelse
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </div>

@stop
