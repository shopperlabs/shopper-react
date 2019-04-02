@extends('shopper::layouts.dashboard')
@section('title', __('Dashboard'))

@section('content')

    <div class="wrapper-md bg-white">

        <div class="row">
            <div class="col-sm-12 col-md-6">
                <div class="card card-welcome">
                    <div>
                        <h5 class="card-title">{{ __('Dashboard') }}</h5>
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
            <div class="col-sm-12 col-md-6">
                <div class="card card-welcome">
                    <div class="card-body">
                        <div class="card-content">
                            <ul class="system-information">
                                <li>
                                    <img src="{{ asset('/shopper/img/brands/server.svg') }}">
                                    <span>{{ $os }}</span>
                                </li>
                                <li>
                                    <img src="{{ asset('/shopper/img/brands/php.svg') }}">
                                    <span>{{ $php }}</span>
                                </li>
                                <li>
                                    <img src="{{ asset('/shopper/img/brands/database.svg') }}">
                                    <span>{{ $database }}</span>
                                </li>
                                <li>
                                    <img src="{{ asset('/shopper/img/brands/laravel.svg') }}">
                                    <span>{{ $laravel }}</span>
                                </li>
                                <li>
                                    <img src="{{ asset('/shopper/img/logo.svg') }}">
                                    <span>{{ $shopper }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <div class="wrapper">
        <div class="row">
            <div class="col-sm-12 col-md-4">
                <div class="card">
                    <div class="card-body">
                        <div class="element-rs d-flex flex-row align-items-top">
                            <i class="fab fa-facebook-f text-facebook icon-md"></i>
                            <div class="m-l-md">
                                <h6 class="text-facebook">2.62k Likes</h6>
                                <p class="mt-2 text-muted card-text">{{ __('Numbers of Likes of your Facebook page account') }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-12 col-md-4">
                <div class="card">
                    <div class="card-body">
                        <div class="element-rs d-flex flex-row align-items-top">
                            <i class="fab fa-twitter text-twitter icon-md"></i>
                            <div class="m-l-md">
                                <h6 class="text-twitter">2.62k Followers</h6>
                                <p class="mt-2 text-muted card-text">{{ __('Numbers of followers of your twitter account') }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-12 col-md-4">
                <div class="card">
                    <div class="card-body">
                        <div class="element-rs d-flex flex-row align-items-top">
                            @if ($sslCertificate['status'] === 'success')
                                <i class="fas fa-lock text-success icon-md"></i>
                                <div class="m-l-md">
                                    <h6 class="text-success">{{ request()->getHost() }} - {{ __('Valid Certificate') }}</h6>
                                    <p class="mt-2 text-muted card-text">
                                        <strong>Expiration: </strong> {{ $sslCertificate['expiration_date'] }}
                                        (<strong class="italic">{{ $sslCertificate['expiration_date_in_days'] }} days</strong>)
                                    </p>
                                </div>
                            @else
                                <i class="fas fa-lock text-danger icon-md"></i>
                                <div class="m-l-md">
                                    <h6 class="text-danger">{{ request()->getHost() }} - {{ __('Invalid Certificate') }}</h6>
                                    <p class="mt-2 text-muted card-text">
                                        {{ $sslCertificate['message'] }}
                                    </p>
                                </div>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

@stop
