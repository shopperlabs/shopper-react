@extends('shopper::layouts.auth')
@section('page-title', __('Reset Password'))

@section('content')

    <div class="row justify-content-md-center align-items-center h-100">
        <div class="card-wrapper">
            <div class="brand">
                @include('shopper::partials.auth.logo')
            </div>
            @include('shopper::components.flash')
            <div class="card fat">
                <div class="card-body">
                    <h4 class="card-title">{{ __('Reset Password') }}</h4>
                    <form method="POST" class="my-login-validation" novalidate action="{{ route('shopper.password.update') }}">
                        @csrf
                        <input type="hidden" name="token" value="{{ $token }}">
                        <input type="hidden" name="_id" value="{{ $id }}">
                        <div class="form-group">
                            <label for="email">{{ __('E-Mail Address') }}</label>
                            <input id="email" type="email" class="form-control" name="email" required autofocus>
                            <div class="invalid-feedback">{{ __('Email is invalid') }}</div>
                        </div>

                        <div class="form-group">
                            <label for="password">{{ __('Password') }}</label>
                            <input id="password" type="password" class="form-control" name="password" required data-eye>
                            <div class="invalid-feedback">{{ __('Password is required') }}</div>
                        </div>

                        <div class="form-group">
                            <label for="password">{{ __('Confirm Password') }}</label>
                            <input id="confirm_password" type="password" class="form-control" name="password_confirmation" required data-eye>
                            <div class="invalid-feedback">{{ __('Confirmation Password is required') }}</div>
                        </div>

                        <div class="form-group m-0">
                            <button type="submit" class="btn btn-primary btn-block" id="btn-reset">
                                {{ __('Reset Password') }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            @include('shopper::partials.auth.footer')
        </div>
    </div>

@stop
