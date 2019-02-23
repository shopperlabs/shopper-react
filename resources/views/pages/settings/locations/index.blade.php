@extends('shopper::layouts.dashboard')
@section('title', __('Countries list'))

@section('content')

    <div class="wrapper-md">
        <div class="links-group">
            <a class="btn btn-primary" href="{{ route('shopper.settings.locations.countries.create') }}">
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
                            <th>{{ __('Name') }}</th>
                            <th>{{ __('Code') }}</th>
                            <th>{{ __('Iso 3') }}</th>
                            <th>{{ __('Enabled') }}</th>
                            <th>{{ __('Calling Code') }}</th>
                            <th>{{ __('Flag') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($records as $record)
                            <tr
                                data-url="{{ route('shopper.settings.locations.countries.edit', $record) }}"
                                class="record-link"
                                id="record_{{ $record->id }}"
                            >
                                <td>{{ $record->name }}</td>
                                <td>{{ $record->code }}</td>
                                <td>{{ $record->iso_3 }}</td>
                                <td>{{ $record->isEnabled() }}</td>
                                <td>{{ $record->calling_code }}</td>
                                <td><img src="{{ $record->flag }}" alt="Flag {{ $record->code }}"></td>
                            </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
            <footer class="card-footer col">
                <div class="row">
                    <div class="col-sm-5">
                        <small class="text-muted inline m-t-sm m-b-sm">
                            {{ __('Show') }} {{ ($records->currentPage() - 1) * $records->perPage() + 1 }} -
                            {{ ($records->currentPage() - 1) * $records->perPage() + count($records->items()) }} {{ __('of') }} {!! $records->total() !!} {{ __('elements') }}
                        </small>
                    </div>
                    <div class="col-sm-7 text-right text-center-xs">
                        {!! $records->links('shopper::partials.paginations') !!}
                    </div>
                </div>
            </footer>

        </div>
    </section>

@stop
