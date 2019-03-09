@extends('shopper::layouts.dashboard')
@section('title', __('Categories list'))

@section('content')

    <div class="wrapper-md">
        <div class="links-group">
            <a class="btn btn-primary" href="{{ route('shopper.catalogue.categories.create') }}">
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
                            <th>ID</th>
                            <th>{{ __('Name') }}</th>
                            <th>{{ __('Active') }}</th>
                            <th>{{ __('Parent') }}</th>
                            <th>{{ __('Code') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        @forelse($records as $record)
                            <tr
                                data-url="{{ route('shopper.catalogue.categories.edit', $record) }}"
                                class="record-link"
                                id="record_{{ $record->id }}"
                            >
                                <td>{{ $record->id }}</td>
                                <td>{{ $record->name }}</td>
                                <td>{{ $record->getActive() }}</td>
                                <td>{{ $record->getParent() }}</td>
                                <td>{{ $record->code }}</td>
                            </tr>
                        @empty
                            <tr>
                                <td colspan="5">
                                    @component('shopper::layouts.emptydata')
                                        <span class="mt-4">{{ __("We didn't find anything - just empty space.") }}</span>
                                        <a class="btn btn-primary mt-3" href="{{ route('shopper.catalogue.categories.create') }}">{{ __('Add New Category') }}</a>
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
