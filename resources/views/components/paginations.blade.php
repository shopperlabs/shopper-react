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
