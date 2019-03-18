@extends('shopper::layouts.dashboard')
@section('title', __('Coupons list'))

@section('content')

    <div class="wrapper-md">
        <div class="links-group">
            <a class="btn btn-primary" href="{{ route('shopper.promo.coupons.create') }}">
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
                        <th>{{ __('Active') }}</th>
                        <th>{{ __('Name') }}</th>
                        <th>{{ __('Code') }}</th>
                        <th>{{ __('Coupon Value') }}</th>
                        <th>{{ __('Date of beginning') }}</th>
                        <th>{{ __('Date of end') }}</th>
                    </tr>
                    </thead>
                    <tbody>
                    @forelse($records as $record)
                        <tr
                            data-url="{{ route('shopper.promo.coupons.edit', $record) }}"
                            class="record-link"
                            id="record_{{ $record->id }}"
                        >
                            <td>{{ $record->id }}</td>
                            <td>{{ $record->getActive() }}</td>
                            <td>{{ $record->name }}</td>
                            <td>{{ $record->code }}</td>
                            <td>{{ $record->getValue() }}</td>
                            <td>{{ $record->date_begin->format('l, M d, Y H:i') }}</td>
                            <td>{{ $record->date_end->format('l, M d, Y H:i') }}</td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="6">
                                @component('shopper::layouts.emptydata')
                                    <span class="mt-4">{{ __("We didn't find anything - just empty space.") }}</span>
                                    <a class="btn btn-primary mt-3" href="{{ route('shopper.promo.coupons.create') }}">{{ __('Add New Coupon') }}</a>
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
