<header id="header" class="app-header navbar" role="menu">
    <!-- navbar header  -->
    <div class="navbar-header bg-black dk v-center">
        <button class="pull-left click" data-toggle="open" title="Menu" data-target="#aside">
            <i class="icon-menu"></i>
        </button>
        <!-- brand  -->
        <a href="{{ route('shopper.dashboard.home')}}" class="navbar-brand text-lt center">
            <i class="icon-orchid"></i>
        <!-- <img src="{{ asset('/shopper/img/logo.svg') }}" width="50px">-->
        </a>
        <!-- / brand  -->
        <button class="pull-right" onclick="event.preventDefault();document.getElementById('logout-form').submit();">
            <i class="icon-logout"></i>
        </button>
    </div>
    <!-- / navbar header  -->
    <!-- navbar collapse  -->
    <div class="app-header wrapper navbar-collapse box-shadow bg-white-only v-center" id='nav-header'>
        <div class="col-md-1">
            <a href="javascript:;" class='submenu-bar' id="menu-burger"><i class='icon ion-navicon-round'></i></a>
        </div>
        <div class="col-xs-12 col-md-3">
            <input type="search" id="search-input" placeholder="{{ __('Search here...') }}" name="search" class="form-control" />
            <span id="algolia" data-appID="{{ env('ALGOLIA_APP_ID', '') }}" data-client-secret="{{ env('ALGOLIA_CLIENT_SECRET', '') }}" data-logo="{{ asset('shopper/img/search-by-algolia.svg') }}"></span>
        </div>
        <div class="col-xs-12 col-md-8">
            <div class='pull-right'>
                <ul class="aside-nav navbar-nav">
                    <li class="dropdown">
                        <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                            <img src="{{ $profile->getAvatar() }}" alt="User avatar">
                        </a>
                        <ul class="dropdown-menu">
                            <li>
                                <a href="{{ route('shopper.settings.backend.users.profile') }}">
                                    <span class='menu_item-body'>
                                        <span class='menu_item-img'>
                                            <img src="{{ $profile->getAvatar(40) }}" alt='user avatar'>
                                        </span>
                                        <span class='menu_item-text'>
                                            {{ $profile->getFullName() }}
                                            <small>{{ __('Display profile') }}</small>
                                        </span>
                                    </span>
                                </a>
                            </li>
                            <li class="divider"></li>
                            <li><a href="{{ url('/') }}" target="_blank">{{ __('Preview website') }}</a></li>
                            @if ($profile->isSuperUser())
                                <li><a href="{{ route('shopper.users.impersonate') }}" target="_blank">{{ __('Impersonate user') }}</a></li>
                            @endif
                            <li><a href="{{ route('shopper.settings.translate.index') }}">{{ __('Backend Preferences') }}</a></li>
                            <li class="divider"></li>
                            <li>
                                <a href="javascript:;" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                                    {{ __('Logout') }}
                                </a>
                                <form id="logout-form" class="hidden" action="{{ route('shopper.logout') }}" method="POST">
                                    @csrf
                                </form>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <!-- / navbar collapse  -->
</header>
