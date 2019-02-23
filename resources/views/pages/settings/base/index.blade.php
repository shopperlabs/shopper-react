@extends('shopper::layouts.dashboard')
@section('title', __('Global system settings'))

@section('content')

    <div class="nav-tabs-alt bg-white-only">
        <ul class="nav nav-tabs padder bg-light" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" data-target="#tab-settings" role="tab" data-toggle="tab">{{ __('Settings') }}</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-target="#tab-socials" role="tab" data-toggle="tab">{{ __('Socials API') }}</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-target="#tab-algolia" role="tab" data-toggle="tab">{{ __('Algolia API') }}</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" data-target="#tab-informations" role="tab" data-toggle="tab">{{ __('Site Environnement') }}</a>
            </li>
        </ul>
    </div>

    <section>
        <div class="bg-white-only bg-auto no-border-xs">
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="tab-settings">
                    @include('shopper::pages.settings.base.base')
                </div>
                <div role="tabpanel" class="tab-pane" id="tab-socials">
                    @include('shopper::pages.settings.base.social')
                </div>
                <div role="tabpanel" class="tab-pane" id="tab-algolia">
                    @include('shopper::pages.settings.base.algolia')
                </div>
                <div role="tabpanel" class="tab-pane" id="tab-informations">
                    @include('shopper::pages.settings.base.info', ['settings' => $settings])
                </div>
            </div>
        </div>
    </section>

@stop
