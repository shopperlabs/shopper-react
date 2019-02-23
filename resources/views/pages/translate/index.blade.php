@extends('shopper::layouts.dashboard')
@section('title', __('Backend Translate'))

@section('content')

    <div class="nav-tabs-alt bg-white-only">
        <ul class="nav nav-tabs padder bg-light" role="tablist">
            <li class="nav-item">
                <a class="nav-link active" data-target="#tab-language" role="tab" data-toggle="tab">{{ __('Language') }}</a>
            </li>
        </ul>
    </div>

    <section>
        <div class="bg-white-only bg-auto no-border-xs">
            <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="tab-language">
                    <form action="{{ route('shopper.settings.translate.changeLocale') }}" method="POST">
                        @csrf
                        <div class="wrapper-md">
                            <div class="bg-white padder-md">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <label class="control-label">{{ __('Locale') }}</label>
                                            <select data-placeholder="Select Locale" name="locale" class="select2 form-control">
                                                @foreach($locales as $localeCode => $properties)
                                                    <option value="{{ $localeCode }}" @if($localeCode === LaravelLocalization::getCurrentLocale()) selected @endif>
                                                        {{ $properties['native'] }}
                                                    </option>
                                                @endforeach
                                            </select>
                                            <small class="form-text text-muted m-b-none">{{ __('Select your desired locale for language use.') }}</small>
                                        </div>

                                        <div class="form-group m-t-md">
                                            <button class="btn btn-primary" type="submit">{{ __('Save') }}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>

@stop
