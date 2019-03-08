@extends('shopper::layouts.dashboard')
@section('title', __('Templates'))

@section('content')

    <div class="wrapper-md">
        <div class="links-group">
            <a href="{{ route('shopper.settings.mails.templates.selectNewTemplate') }}" class="btn btn-primary">
                <i class="fa fa-plus"></i> {{ __('Add Template') }}
            </a>
        </div>
    </div>


    <section>
        <div class="bg-white-only bg-auto">
            <div class="table-responsive">
                <table id="templates_list" class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">{{ __('Name') }}</th>
                            <th scope="col">{{ __('Description') }}</th>
                            <th scope="col">{{ __('Template') }}</th>
                            <th scope="col">{{ __('') }}</th>
                            <th scope="col" class="text-center">{{ __('Type') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                    @forelse($templates->all() as $template)
                        <tr
                            data-url="{{ route('shopper.settings.mails.templates.viewTemplate', ['templatename' => $template->template_slug]) }}"
                            class="record-link"
                            id="template_item_{{ $template->template_slug }}"
                        >
                            <td class="pr-0">{{ ucwords($template->template_name) }}</td>
                            <td class="text-muted" title="/tee">{{ $template->template_description }}</td>
                            <td class="table-fit"><span>{{ ucfirst($template->template_view_name) }}</span></td>
                            <td class="table-fit text-muted"><span>{{ ucfirst($template->template_skeleton) }}</span></td>
                            <td class="table-fit text-center"><span>{{ ucfirst($template->template_type) }}</span></td>
                        </tr>
                    @empty
                        <tr>
                            <td colspan="5">
                                @component('shopper::layouts.emptydata')
                                    <span class="mt-4">{{ __("We didn't find anything - just empty space.") }}</span>
                                    <a class="btn btn-primary mt-3" href="{{ route('shopper.settings.mails.templates.selectNewTemplate') }}">{{ __('Add New Template') }}</a>
                                @endcomponent
                            </td>
                        </tr>
                    @endforelse
                    </tbody>
                </table>
            </div>
        </div>
    </section>

@endsection
