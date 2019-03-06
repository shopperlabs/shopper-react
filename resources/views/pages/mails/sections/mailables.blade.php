@extends('shopper::layouts.dashboard')
@section('title', __('Mailables'))

@section('content')

    <div class="wrapper-md">
        <div class="links-group">
            <a class="btn btn-primary" href="{{ route('shopper.users.create') }}">
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
                        <th>{{ __('Namespace') }}</th>
                        <th>{{ __('Last edited') }}</th>
                    </tr>
                    </thead>
                    <tbody>
                    @forelse($mailables as $mailable)
                        <tr>
                            <td>Lol 1</td>
                            <td>Lol 2</td>
                            <td>Lol 3</td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="3">
                                @component('shopper::layouts.emptydata')
                                    <span class="mt-4">{{ __("We didn't find anything - just empty space.") }}</span><button class="btn btn-primary mt-3" data-toggle="modal" data-target="#newMailableModal">{{ __('Add New Mailable') }}</button>
                                @endcomponent
                            </td>
                        </tr>
                    @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </section>

@stop
