@extends('shopper::layouts.dashboard')
@section('title', __('Banners list'))

@section('content')

    <div class="wrapper-md">
        <div class="links-group">
            <a class="btn btn-primary" href="{{ route('shopper.catalogue.banners.create') }}">
                <i class="fa fa-plus"></i> {{ __('Create') }}
            </a>
        </div>
    </div>

    <section>
        <div class="bg-white-only bg-auto">

            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>{{ __('Code') }}</th>
                            <th>{{ __('Title') }}</th>
                            <th>{{ __('Subtitle') }}</th>
                            <th>{{ __('Size') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse($records as $record)
                        <tr
                            data-url="{{ route('shopper.catalogue.banners.edit', $record) }}"
                            class="record-link"
                            id="record_{{ $record->id }}"
                        >
                            <td>{{ $record->code }}</td>
                            <td>{{ $record->title }}</td>
                            <td>{{ $record->subtitle }}</td>
                            <td>{{ $record->getSize() }}</td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="5">
                                @component('shopper::layouts.emptydata')
                                    <span class="mt-4">{{ __("We didn't find anything - just empty space.") }}</span>
                                    <a class="btn btn-primary mt-3" href="{{ route('shopper.catalogue.banners.create') }}">{{ __('Add New Banner') }}</a>
                                @endcomponent
                            </td>
                        </tr>
                    @endforelse
                    </tbody>
                </table>
            </div>
            <footer class="card-footer col">
                @include('shopper::components.paginations')
            </footer>

        </div>
    </section>

@stop
