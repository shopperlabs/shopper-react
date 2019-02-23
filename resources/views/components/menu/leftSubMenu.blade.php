@if(isset($childs) && $childs)
    <div class="tab-pane fade in nav @if(isset($active)) show {{ active($active) }} @endif" role="tabpanel" id="{{$slug}}"
         aria-labelledby="{{$slug}}-tab">
        {!! $shopper->menu()->render($slug, 'shopper::components.menu.leftMenu') !!}
    </div>
@endif
