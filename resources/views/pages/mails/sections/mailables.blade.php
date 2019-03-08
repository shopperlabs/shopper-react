@extends('shopper::layouts.dashboard')
@section('title', __('Mailables'))

@section('content')

    <div class="wrapper-md">
        <div class="links-group">
            <a class="btn btn-primary" href="javascript:;" data-toggle="modal" data-target="#newMailableModal">
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
                    @forelse($mailables->all() as $mailable)
                        <tr
                            data-url="{{ route('shopper.settings.mails.mailables.viewMailable', ['name' => $mailable['name']]) }}"
                            class="record-link"
                            id="mailable_item_{{ $mailable['name'] }}"
                        >
                            <td class="pr-0">{{ $mailable['name'] }}</td>
                            <td title="/tee">{{ $mailable['namespace'] }}</td>
                            <td class="table-fit"><span>{{ (\Carbon\Carbon::createFromTimeStamp($mailable['modified']))->diffForHumans() }}</span></td>
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

        <div class="modal fade" id="newMailableModal" tabindex="-1" role="dialog" aria-labelledby="newMailableModal" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <form id="create_mailable" action="{{ route('shopper.settings.mails.mailables.generateMailable') }}" method="POST">
                    @csrf
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">{{ __('New Mailable') }}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body" style="padding-top: 20px;">
                            <div class="alert alert-warning new-mailable-alerts d-none" role="alert"></div>
                            <div class="form-group">
                                <label for="mailableName">{{ __('Name') }}</label>
                                <input type="text" class="form-control" id="mailableName" name="name" placeholder="Mailable name" required>
                                <small class="form-text text-muted">{{ __('Enter mailable name e.g') }} <b>Welcome User</b>, <b>WelcomeUser</b></small>
                            </div>
                            <div class="form-group">
                                <label class="checkbox-inline">
                                    <input type="checkbox" id="markdown--truth" value="option1"> {{ __('Markdown Template') }}
                                    <small class="form-text text-muted">{{ __('Use markdown template') }}</small>
                                </label>
                            </div>
                            <div class="form-group markdown-input" style="display: none;">
                                <label for="markdownView">Markdown</label>
                                <input type="text" class="form-control" name="markdown" id="markdownView" placeholder="e.g markdown.view">
                            </div>

                            <div class="form-group">
                                <label class="checkbox-inline">
                                    <input type="checkbox" id="forceCreation" name="force"> Force
                                    <small class="form-text text-muted">{{ __('Force mailable creation even if already exists') }}</small>
                                </label>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">{{ __('Close') }}</button>
                            <button type="submit" class="btn btn-primary">{{ __('Create Mailable') }}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </section>

@stop
