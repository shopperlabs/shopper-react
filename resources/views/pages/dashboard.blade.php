@extends('shopper::layouts.dashboard')
@section('title', __('Dashboard'))

@section('content')

    <div class="wrapper-md">

        <div class="row">
            <div class="col-md-7">
                <div class="card card-welcome">
                    <div class="card-body">
                        <h5 class="card-title">{{ __('Welcome') }}</h5>
                        <div class="cart-content">
                            <div class="card-logo">
                                <img src="{{ asset('/shopper/img/shopper.svg') }}" alt="Shopper logo">
                            </div>
                            <div class="card-message">
                                <p><strong>{{ $user->getFullName() }}</strong>, {{ __("Welcome back to Shopper E-commerce. Your last login was") }}</p>
                                <p><strong>{{ $user->last_login->format('D, d M Y, H:i') }}</strong></p>
                                <p><a href="{{ route('shopper.settings.logs.index') }}">{{ __('View acces logs') }}</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

@stop
