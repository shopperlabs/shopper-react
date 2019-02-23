@extends('shopper::layouts.dashboard')
@section('title', __('Work in progress'))

@section('content')

    <section>
        <div class="bg-white-only bg-auto no-border-xs">
            <div class="jumbotron text-center not-found">
                <div>
                    <h3 class="font-thin"><i class="fa fa-wrench fa-2x"></i> <br/> {{ __('Work in progress') }}</h3>
                    <a href="{{ route('shopper.dashboard.home') }}" class="btn btn-dark">
                        {{ __('Go to dashboard') }}
                    </a>
                </div>
            </div>
        </div>
    </section>

@stop
