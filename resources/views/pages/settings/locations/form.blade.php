@extends('shopper::layouts.dashboard')
@section('title', (isset($record->id)) ? __('Edit country') : __('New country'))

@section('content')

    <div class="wrapper-md">
        <div class="pull-left">
            <div class="btn-group btn-breadcrumb breadcrumb-default">
                <a href="{{ route('shopper.dashboard.home') }}" class="btn btn-default"><i class="fa fa-home"></i></a>
                <a href="{{ route('shopper.settings.locations.countries.index') }}" class="btn btn-default visible-lg-block visible-md-block">{{ __('Countries list') }}</a>
                <div class="btn btn-info"><b>{{ (isset($record->id)) ? __('Edit country') : __('New country') }}</b></div>
            </div>
        </div>
        <div class="pull-right">
            @if ((isset($record->id)))
                <form action="{{ route('shopper.settings.locations.countries.destroy', $record) }}" id="delete_form" method="POST">
                    {{ method_field("DELETE") }}
                    {{ csrf_field() }}
                    <button type="submit" class="btn btn-danger"><i class="fa fa-trash"></i> {{ __('Delete') }}</button>
                </form>
            @endif
        </div>
    </div>

    <div id="location-form" data-id="@if(isset($record)) {{ $record->id }} @endif"></div>

@stop
