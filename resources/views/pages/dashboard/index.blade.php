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
                                    <span>
                                        {{ $currentVersion }}
                                        @if($updateAvailable)
                                            <i class="fas fa-exclamation-circle text-warning"></i>
                                        @else
                                            <i class="fas fa-check-circle text-success"></i>
                                        @endif
                                    </span>
                                </li>
                                <li>
                                    @if($updateAvailable)
                                        <span class="text-warning">
                                            {{ _('A new version of Shopper is available') }} - v{{ $latestVersion }}
                                        </span>
                                        <i class="fas fa-exclamation-circle text-warning"></i>
                                    @else
                                        <span>{{ __('You are up to date with Shopper') }}</span>
                                        <i class="fas fa-check-circle text-success"></i>
                                    @endif
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="wrapper">

        {{--<div class="row">
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
        </div>--}}

        <div class="algolia-items bg-white">
            <div class="algolia-header mb-4">
                <h3 class="text-lg font-bold nova-algolia-card-title">
                    <svg class="nova-algolia-card-title-logo" data-icon="algolia" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path fill="#5468ff" d="M229.3 182.6c-49.3 0-89.2 39.9-89.2 89.2 0 49.3 39.9 89.2 89.2 89.2s89.2-39.9 89.2-89.2c0-49.3-40-89.2-89.2-89.2zm62.7 56.6l-58.9 30.6c-1.8.9-3.8-.4-3.8-2.3V201c0-1.5 1.3-2.7 2.7-2.6 26.2 1 48.9 15.7 61.1 37.1.7 1.3.2 3-1.1 3.7zM389.1 32H58.9C26.4 32 0 58.4 0 90.9V421c0 32.6 26.4 59 58.9 59H389c32.6 0 58.9-26.4 58.9-58.9V90.9C448 58.4 421.6 32 389.1 32zm-202.6 84.7c0-10.8 8.7-19.5 19.5-19.5h45.3c10.8 0 19.5 8.7 19.5 19.5v15.4c0 1.8-1.7 3-3.3 2.5-12.3-3.4-25.1-5.1-38.1-5.1-13.5 0-26.7 1.8-39.4 5.5-1.7.5-3.4-.8-3.4-2.5v-15.8zm-84.4 37l9.2-9.2c7.6-7.6 19.9-7.6 27.5 0l7.7 7.7c1.1 1.1 1 3-.3 4-6.2 4.5-12.1 9.4-17.6 14.9-5.4 5.4-10.4 11.3-14.8 17.4-1 1.3-2.9 1.5-4 .3l-7.7-7.7c-7.6-7.5-7.6-19.8 0-27.4zm127.2 244.8c-70 0-126.6-56.7-126.6-126.6s56.7-126.6 126.6-126.6c70 0 126.6 56.6 126.6 126.6 0 69.8-56.7 126.6-126.6 126.6z" class=""></path>
                    </svg>
                    Algolia
                </h3>
                <a href="https://www.algolia.com/dashboard" target="_blank">{{ __('Go to Algolia Dashboard') }} <i class="fas fa-angle-double-right"></i></a>
            </div>
            <div class="row">
                @if ($algolia['status'] === 'error')
                    <div class="col-sm-12 text-center">
                        <span class="text-danger"><i class="far fa-3x fa-frown"></i></span>
                        <h4 class="text-danger">{{ $algolia['message'] }}</h4>
                        <p class="text-helper">{{ __("Or you don't have an Algolia App. Please go to Algolia website and create an App.") }}</p>
                    </div>
                @else
                    @include('shopper::pages.dashboard._algolia-indices')
                @endif
            </div>
        </div>
    </div>

@stop
