<?php

namespace Mckenziearts\Shopper\Http\Composers;

use Illuminate\View\View;
use Mckenziearts\Shopper\Shopper;

class MenuComposer
{
    public $shopper;

    /**
     * MenuComposer constructor.
     *
     * @param Shopper $shopper
     */
    public function __construct(Shopper $shopper)
    {
        $this->shopper = $shopper;
    }

    /**
     * Registering the main menu items.
     *
     * @param View $view
     */
    public function compose(View $view)
    {
        $this->registerDashboardMenu();
        $this->registerUserMenu();
        $this->registerCatalogueMenu();
        $this->registerOrderMenu();
        $this->registerPromoMenu();
        $this->registerTagMenu();
        $this->registerMediaMenu();
        $this->registerBackendMenu();

        $view->with('shopper', $this->shopper);
    }

    protected function registerDashboardMenu()
    {
        $this->shopper->menu->add('Main', [
            'slug'      => 'Dashboard',
            'icon'      => 'fas fa-palette',
            'route'      => '#',
            'label'      => __('Dashboard'),
            'childs'     => true,
            'main'       => true,
            'active'     => 'shopper.dashboard.*',
            //'permission' => 'dashboard.systems',
            'sort'       => 1,
        ]);

        $this->shopper->menu->add('Dashboard', [
            'slug'       => 'Home',
            'icon'       => 'fas fa-palette',
            'route'      => route('shopper.dashboard.home'),
            'label'      => __('Welcome'),
            'groupname'  => __('Dashboard'),
            'childs'     => false,
            'divider'    => false,
            'active'     => 'shopper.dashboard.home',
            //'permission' => 'dashboard.systems.settings',
            'sort'       => 1,
        ]);
    }

    /**
     * Register Users Plugin Menu
     */
    protected function registerUserMenu()
    {
        $this->shopper->menu->add('Main', [
            'slug'       => 'Users',
            'icon'       => 'fa fa-users',
            'route'      => '#',
            'label'      => __('Users'),
            'childs'     => true,
            'main'       => true,
            'active'     => 'shopper.users.*',
            //'permission' => 'dashboard.systems',
            'sort'       => 2,
        ]);

        $this->shopper->menu->add('Users', [
            'slug'       => 'User',
            'icon'       => 'fa fa-users',
            'route'      => route('shopper.users.index'),
            'label'      => __('Users'),
            'groupname'  => __('Customers'),
            'childs'     => false,
            'divider'    => false,
            'active'     => 'shopper.users.*',
            //'permission' => 'dashboard.systems.settings',
            'sort'       => 1,
        ]);
    }

    /**
     * Register Catalogue Plugin Menu
     */
    protected function registerCatalogueMenu()
    {
        $this->shopper->menu->add('Main', [
            'slug'       => 'Catalogue',
            'icon'       => 'fas fa-shopping-cart',
            'route'      => '#',
            'label'      => __('Catalogue'),
            'childs'     => true,
            'main'       => true,
            'active'     => 'shopper.catalogue.*',
            //'permission' => 'dashboard.systems',
            'sort'       => 3,
        ]);

        $this->shopper->menu->add('Catalogue', [
            'slug'       => 'Products',
            'icon'       => 'icon-notebook',
            'route'      => route('shopper.catalogue.products.index'),
            'label'      => __('Products'),
            'groupname'  => __('Catalogue'),
            'childs'     => false,
            'divider'    => false,
            'active'     => 'shopper.catalogue.products.*',
            //'permission' => 'dashboard.systems.settings',
            'sort'       => 1,
        ]);

        $this->shopper->menu->add('Catalogue', [
            'slug'       => 'Categories',
            'icon'       => 'icon-organization',
            'route'      => route('shopper.catalogue.categories.index'),
            'label'      => __('Categories'),
            'childs'     => false,
            'divider'    => false,
            'active'     => 'shopper.catalogue.categories.*',
            //'permission' => 'dashboard.systems.settings',
            'sort'       => 2,
        ]);

        $this->shopper->menu->add('Catalogue', [
            'slug'       => 'Brands',
            'icon'       => 'icon-star',
            'route'      => route('shopper.catalogue.brands.index'),
            'label'      => __('Brands'),
            'childs'     => false,
            'divider'    => false,
            'active'     => 'shopper.catalogue.brands.*',
            //'permission' => 'dashboard.systems.settings',
            'sort'       => 3,
        ]);

        $this->shopper->menu->add('Catalogue', [
            'slug'       => 'Reviews',
            'icon'       => 'far fa-comment',
            'route'      => route('shopper.catalogue.reviews.index'),
            'label'      => __('Reviews'),
            'childs'     => false,
            'divider'    => false,
            'active'     => 'shopper.catalogue.reviews.*',
            //'permission' => 'dashboard.systems.settings',
            'sort'       => 4,
        ]);

        $this->shopper->menu->add('Catalogue', [
            'slug'       => 'Properties',
            'icon'       => 'fa fa-list',
            'route'      => route('shopper.wip'),
            'label'      => __('Properties'),
            'childs'     => false,
            'divider'    => false,
            'active'     => 'shopper.catalogue.properties.*',
            //'permission' => 'dashboard.systems.settings',
            'sort'       => 5,
        ]);
    }

    /**
     * Register Catalogue Plugin Menu
     */
    protected function registerOrderMenu()
    {
        $this->shopper->menu->add('Main', [
            'slug'       => 'Orders',
            'icon'       => 'fas fa-money-check',
            'route'      => '#',
            'label'      => __('Orders'),
            'childs'     => true,
            'main'       => true,
            'active'     => 'shopper.shoporders.*',
            //'permission' => 'dashboard.systems',
            'sort'       => 4,
        ]);

        $this->shopper->menu->add('Orders', [
            'slug'       => 'Order',
            'icon'       => 'icon-basket-loaded',
            'route'      => route('shopper.shoporders.orders.index'),
            'label'      => __('Orders'),
            'groupname'  => __('Menu'),
            'childs'     => false,
            'divider'    => false,
            'active'     => 'shopper.shoporders.orders.*',
            //'permission' => 'dashboard.systems.settings',
            'sort'       => 1,
        ]);

        $this->shopper->menu->add('Orders', [
            'slug'       => 'Payment',
            'icon'       => 'far fa-credit-card',
            'route'      => route('shopper.shoporders.payments.index'),
            'label'      => __('Payment Methods'),
            'childs'     => false,
            'divider'    => false,
            'active'     => 'shopper.shoporders.payments.*',
            //'permission' => 'dashboard.systems.settings',
            'sort'       => 1,
        ]);

        $this->shopper->menu->add('Orders', [
            'slug'       => 'Shipping',
            'icon'       => 'icon-directions',
            'route'      => route('shopper.shoporders.shippingtypes.index'),
            'label'      => __('Shipping'),
            'childs'     => false,
            'divider'    => false,
            'active'     => 'shopper.shoporders.shippingtypes.*',
            //'permission' => 'dashboard.systems.settings',
            'sort'       => 3,
        ]);

        $this->shopper->menu->add('Orders', [
            'slug'       => 'Statuses',
            'icon'       => 'icon-notebook',
            'route'      => route('shopper.shoporders.statuses.index'),
            'label'      => __('Statuses'),
            'childs'     => false,
            'divider'    => false,
            'active'     => 'shopper.shoporders.statuses.*',
            //'permission' => 'dashboard.systems.settings',
            'sort'       => 4,
        ]);
    }

    /**
     * Register Promo Plugin Menu
     */
    protected function registerPromoMenu()
    {
        $this->shopper->menu->add('Main', [
            'slug'       => 'Promo',
            'icon'       => 'fa fa-bullhorn',
            'route'      => '#',
            'label'      => __('Promo'),
            'childs'     => true,
            'main'       => true,
            'active'     => 'shopper.promo.*',
            //'permission' => 'dashboard.systems',
            'sort'       => 5,
        ]);

        $this->shopper->menu->add('Promo', [
            'slug'       => 'Coupon',
            'icon'       => 'fas fa-gift',
            'route'      => route('shopper.wip'),
            'label'      => __('Coupons'),
            'groupname'  => __('Promotion'),
            'childs'     => false,
            'divider'    => false,
            'active'     => 'shopper.promo.coupons.*',
            //'permission' => 'dashboard.systems.settings',
            'sort'       => 1,
        ]);

        $this->shopper->menu->add('Promo', [
            'slug'       => 'Discount',
            'icon'       => 'fa fa-percent',
            'route'      => route('shopper.promo.discounts.index'),
            'label'      => __('Discount'),
            'childs'     => false,
            'divider'    => false,
            'active'     => 'shopper.promo.discounts.*',
            //'permission' => 'dashboard.systems.settings',
            'sort'       => 2,
        ]);
    }

    /**
     * Register Tag Menu
     */
    protected function registerTagMenu()
    {
        $this->shopper->menu->add('Main', [
            'slug'       => 'Tags',
            'icon'       => 'fa fa-tags',
            'route'      => '#',
            'label'      => __('Tags'),
            'childs'     => true,
            'main'       => true,
            'active'     => 'shopper.tags.*',
            //'permission' => 'dashboard.systems',
            'sort'       => 6,
        ]);

        $this->shopper->menu->add('Tags', [
            'slug'       => 'Tag',
            'icon'       => 'fa fa-tags',
            'route'      => route('shopper.tags.index'),
            'label'      => __('Tags'),
            'groupname'  => __('Manage Tags'),
            'childs'     => false,
            'divider'    => false,
            'active'     => 'shopper.tags.*',
            //'permission' => 'dashboard.systems.settings',
            'sort'       => 1,
        ]);
    }

    /**
     * Register Media Menu
     */
    protected function registerMediaMenu()
    {
        $this->shopper->menu->add('Main', [
            'slug'       => 'Media',
            'icon'       => 'icon-picture',
            'route'      => '#',
            'label'      => __('Media'),
            'childs'     => true,
            'main'       => true,
            'active'     => 'shopper.media.*',
            //'permission' => 'dashboard.systems',
            'sort'       => 19,
        ]);

        $this->shopper->menu->add('Media', [
            'slug'       => 'Filemanager',
            'icon'       => 'icon-picture',
            'route'      => route('shopper.media.index'),
            'label'      => __('Filemanager'),
            'groupname'  => __('Browse Media'),
            'childs'     => false,
            'divider'    => false,
            'active'     => 'shopper.media.*',
            //'permission' => 'dashboard.systems.settings',
            'sort'       => 1,
        ]);
    }

    /**
     * Register Backend Menu
     */
    protected function registerBackendMenu()
    {
        $this->shopper->menu->add('Main', [
            'slug'       => 'Settings',
            'icon'       => 'icon-settings',
            'route'      => '#',
            'label'      => __('Settings'),
            'childs'     => true,
            'main'       => true,
            'active'     => 'shopper.settings.*',
            //'permission' => 'dashboard.systems',
            'sort'       => 20,
        ]);

        $this->shopper->menu->add('Settings', [
            'slug'       => 'Setting',
            'icon'       => 'icon-settings',
            'route'      => route('shopper.settings.globals.index'),
            'groupname'  => __('General Settings'),
            'label'      => __('Global'),
            'childs'     => false,
            'divider'    => false,
            'active'     => 'shopper.settings.globals.*',
            //'permission' => 'dashboard.systems.settings',
            'sort'       => 5,
        ]);

        $this->shopper->menu->add('Settings', [
            'slug'       => 'Country',
            'icon'       => 'fa fa-globe',
            'route'      => route('shopper.settings.locations.countries.index'),
            'groupname'  => __('Location & Translate'),
            'label'      => __('Countries & States'),
            'childs'     => false,
            'divider'    => false,
            'active'     => 'shopper.settings.locations.countries.*',
            //'permission' => 'dashboard.systems.settings',
            'sort'       => 5,
        ]);

        $this->shopper->menu->add('Settings', [
            'slug'       => 'Language',
            'icon'       => 'fa fa-language',
            'route'      => route('shopper.settings.translate.index'),
            'label'      => __('Manage Language'),
            'childs'     => false,
            'divider'    => false,
            'active'     => 'shopper.settings.translate.*',
            //'permission' => 'dashboard.systems.settings',
            'sort'       => 6,
        ]);

        $this->shopper->menu->add('Settings', [
            'slug'       => 'Translate',
            'icon'       => 'icon-speech',
            'route'      =>  route('shopper.wip'),
            'label'      => __('Translate message'),
            'childs'     => false,
            'divider'    => false,
            //'permission' => 'dashboard.systems.settings',
            'sort'       => 7,
        ]);

        $this->shopper->menu->add('Settings', [
            'slug'       => 'Analytics',
            'icon'       => 'fas fa-chart-bar',
            'route'      => route('shopper.wip'),
            'groupname'  => __('Analytics'),
            'label'      => __('Google Analytics'),
            'childs'     => false,
            'divider'    => false,
            'active'     => 'shopper.settings.analytics.*',
            //'permission' => 'dashboard.systems.settings',
            'sort'       => 9,
        ]);

        $this->shopper->menu->add('Settings', [
            'slug'       => 'Mailable',
            'icon'       => 'fas fa-envelope',
            'route'      => route('shopper.settings.mails.mailables.mailableList'),
            'groupname'  => __('Mail'),
            'label'      => __('Mailables'),
            'childs'     => false,
            'divider'    => false,
            'active'     => 'shopper.settings.mails.mailables.*',
            //'permission' => 'dashboard.systems.settings',
            'sort'       => 20,
        ]);

        $this->shopper->menu->add('Settings', [
            'slug'       => 'Mail Templates',
            'icon'       => 'fas fa-columns',
            'route'      => route('shopper.settings.mails.templates.templateList'),
            'label'      => __('Mail Templates'),
            'childs'     => false,
            'divider'    => false,
            'active'     => 'shopper.settings.mails.templates.*',
            //'permission' => 'dashboard.systems.settings',
            'sort'       => 21,
        ]);

        $this->shopper->menu->add('Settings', [
            'slug'       => 'Mail Configuration',
            'icon'       => 'fas fa-cog',
            'route'      => route('shopper.settings.mails.config'),
            'label'      => __('Mail Configuration'),
            'childs'     => false,
            'divider'    => false,
            'active'     => 'shopper.settings.mails.config',
            //'permission' => 'dashboard.systems.settings',
            'sort'       => 22,
        ]);

        $this->shopper->menu->add('Settings', [
            'slug'       => 'System',
            'icon'       => 'fa fa-users',
            'route'      => route('shopper.settings.backend.users.index'),
            'groupname'  => __('System'),
            'label'      => __('Administrators'),
            'childs'     => false,
            'divider'    => false,
            'active'     => 'shopper.settings.backend.*',
            //'permission' => 'dashboard.systems.settings',
            'sort'       => 25,
        ]);

        $this->shopper->menu->add('Settings', [
            'slug'       => 'Access Log',
            'icon'       => 'fa fa-lock',
            'route'      => route('shopper.settings.logs.index'),
            'groupname'  => __('Logs'),
            'label'      => __('Access Log'),
            'childs'     => false,
            'divider'    => false,
            'active'     => 'shopper.settings.logs.*',
            //'permission' => 'dashboard.systems.settings',
            'sort'       => 50,
        ]);
    }
}
