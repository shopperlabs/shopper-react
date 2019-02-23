@extends('shopper::layouts.dashboard')
@section('title', __('My Account'))

@section('content')

    <div class="wrapper-md">
        <div class="pull-left">
            <div class="btn-group btn-breadcrumb breadcrumb-default">
                <a href="{{ route('shopper.settings.backend.users.index') }}" class="btn btn-default visible-lg-block visible-md-block">{{ __('Administrators list') }}</a>
                <div class="btn btn-info"><b>{{  __('My Account') }}</b></div>
            </div>
        </div>
    </div>

    <div id="administrator-profile-form" data-id="{{ $profile->id }}"></div>

@endsection
