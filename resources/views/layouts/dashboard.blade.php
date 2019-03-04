<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="X-DNS-Prefetch-Control" content="on">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title') | Shopper E-commerce</title>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css">
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('/shopper/img/favicons/apple-touch-icon.png') }}">
    <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('/shopper/img/favicons/favicon-32x32.png') }}">
    <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('/shopper/img/favicons/favicon-16x16.png') }}">
    <link rel="manifest" href="{{ asset('/shopper/img/favicons/site.webmanifest') }}">
    <link rel="mask-icon" href="{{ asset('/shopper/img/favicons/safari-pinned-tab.svg') }}" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="apple-mobile-web-app-title" content="Shopper">
    <meta name="application-name" content="Shopper">
    <meta name="theme-color" content="#ffffff">
    <link rel="dns-prefetch" href="{{ config('app.url') }}">
    <link rel="dns-prefetch" href="https://fonts.googleapis.com">
    @yield('stylesheets')
    @routes
    <link rel="stylesheet" type="text/css" href="{{ mix('/css/shopper.css', 'shopper') }}">
</head>
<body>

    <div id="app" class="app app-aside-fixed">
        <!-- header  -->
        @include('shopper::partials.layouts.header')
        <!-- ./header  -->
        <!-- aside  -->
        @include('shopper::partials.layouts.sidebar')
        <!-- / aside  -->
        <!-- content  -->
        <div id="content" class="app-content" role="main">
            <div class="app-content-body" id="app-content-body">
                @include('shopper::components.flash')

                @yield('content')
            </div>
        </div>
        <!-- /content  -->
    </div>

    <script>
        window.default_locale = "{{ config('app.locale') }}"
        window.fallback_locale = "{{ config('app.fallback_locale') }}"
        window.messages = @json($messages)
    </script>
    <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    <script src="https://cdn.jsdelivr.net/algoliasearch/3/algoliasearch.min.js"></script>
    <script src="{{ mix('/js/shopper.js','shopper')}}" type="text/javascript"></script>

</body>
</html>
