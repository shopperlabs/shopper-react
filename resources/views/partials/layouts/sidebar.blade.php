<aside id="aside" class="app-aside d-none d-md-block">
    <div class="aside-wrap-main">
        <div class="navi-wrap">
            <!-- nav  -->
            <nav class="navi clearfix">
                <ul class="nav flex-column" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link-brand" href="{{ route('shopper.dashboard.home') }}">
                            <img src="{{ asset('/shopper/img/logo-white.svg') }}" alt='logo shopper' width="30px"/>
                        </a>
                    </li>
                    {!! $shopper->menu()->render('Main') !!}
                </ul>
            </nav>
        </div>
    </div>

    <div class="aside-wrap" id="aside-wrap">
        <div class="navi-wrap">
            <!-- nav  -->
            <nav class="navi clearfix">
                <div class="nav tab-content flex-column" id="aside-wrap-list">
                    {!! $shopper->menu()->render('Main','shopper::components.menu.leftSubMenu') !!}
                </div>
            </nav>
            <!-- nav  -->
        </div>
    </div>
</aside>
