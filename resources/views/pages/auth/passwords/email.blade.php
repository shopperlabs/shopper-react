@extends('shopper::layouts.auth')
@section('page-title', __('Forgot Password'))

@section('content')

    <div class="row justify-content-md-center align-items-center h-100">
        <div class="card-wrapper">
            <div class="brand">
                @include('shopper::partials.auth.logo')
            </div>
            @include('shopper::components.flash')
            <div class="card fat">
                <div class="card-body">
                    <h4 class="card-title">{{ __('Forgot Password') }}</h4>
                    <form method="POST" class="my-login-validation" novalidate action="{{ route('shopper.password.email') }}">
                        @csrf
                        <div class="form-group">
                            <label for="email">{{ __('E-Mail Address') }}</label>
                            <input id="email" type="email" class="form-control" name="email" required autofocus>
                            <div class="invalid-feedback">{{ __('Email is invalid') }}</div>
                            <div class="form-text text-muted">
                                {{ __('By clicking "Reset Password" we will send a password reset link') }}
                            </div>
                        </div>

                        <div class="form-group m-0">
                            <button type="submit" class="btn btn-primary btn-block">{{ __('Reset Password') }}</button>
                        </div>
                        <div class="mt-4 text-center">
                            {{ __('Go back to') }} <a href="{{ route('shopper.login') }}">{{ __('Login page') }}</a>
                        </div>
                    </form>
                </div>
            </div>
            @include('shopper::partials.auth.footer')
        </div>
    </div>

@stop
