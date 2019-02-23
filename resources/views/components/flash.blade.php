@if (count($errors) > 0)
    <div class="alert alert-danger m-b-none alert-dismissible fade show" role="alert">
        <strong>Oh snap!</strong>
        {{ __('Change a few things up and try submitting again.') }}
        <ul class="m-t-xs">
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
@endif

@if (Session::has('success'))
    <div class="alert alert-success m-b-none alert-dismissible fade show" role="alert">
        <strong>Success!</strong> {{ Session::get('success') }}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
@endif

@if (Session::has('error'))
    <div class="alert alert-danger m-b-none alert-dismissible fade show" role="alert">
        <strong>Error!</strong> {{ Session::get('error') }}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
@endif

@if (Session::has('warning'))
    <div class="alert alert-warning m-b-none alert-dismissible fade show" role="alert">
        <strong>Warning!</strong> {{ Session::get('warning') }}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
@endif
