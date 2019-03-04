@extends('shopper::layouts.dashboard')
@section('title', __('Filemanager'))
@section('stylesheets')
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css">
@endsection

@section('content')

    <section>
        <div class="bg-white-only bg-auto">

            <div class="row">
                <div class="col-md-12" style="height: 800px;">
                    <div id="fm"></div>
                </div>
            </div>

        </div>
    </section>

@stop
