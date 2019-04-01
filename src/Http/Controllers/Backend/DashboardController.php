<?php

namespace Mckenziearts\Shopper\Http\Controllers\Backend;

use Cartalyst\Sentinel\Laravel\Facades\Sentinel;
use Mckenziearts\Shopper\Http\Controllers\Controller;
use Mckenziearts\Shopper\Plugins\Catalogue\Repositories\ProductRepository;
use Mckenziearts\Shopper\Plugins\Orders\Repositories\OrderRepository;
use Mckenziearts\Shopper\Plugins\Users\Repositories\UserRepository;

class DashboardController extends Controller
{
    /**
     * @var OrderRepository
     */
    private $orderRepository;

    /**
     * @var ProductRepository
     */
    private $productRepository;

    /**
     * @var UserRepository
     */
    private $userRepository;

    public function __construct(
        OrderRepository $orderRepository,
        ProductRepository $productRepository,
        UserRepository $userRepository
    )
    {
        $this->orderRepository = $orderRepository;
        $this->productRepository = $productRepository;
        $this->userRepository = $userRepository;
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function dashboard()
    {
        $user = Sentinel::check();

        return view('shopper::pages.dashboard.index', compact('user'));
    }

    public function ecommerce()
    {
        $products = $this->productRepository->lastestProducts(['previewImage'], 5);
        $orders   = $this->orderRepository->recentOrders(['user', 'paymentMethod'], 10);
        $count['revenue'] = $this->orderRepository->getTotalRevenue();
        $count['users'] = $this->userRepository->all()->count();
        $count['newOrders'] = $this->orderRepository->ordersStatusList('new')->count();
        $count['products'] = $this->productRepository->all()->count();

        return view('shopper::pages.dashboard.e-commerce',
            compact('products', 'orders', 'count')
        );
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function workInProgress()
    {
        return view('shopper::pages.working');
    }
}
