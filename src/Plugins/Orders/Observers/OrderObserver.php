<?php

namespace Mckenziearts\Shopper\Plugins\Orders\Observers;

use Carbon\Carbon;
use Mckenziearts\Shopper\Plugins\Orders\Models\Order;

class OrderObserver
{
    /**
     * @var \Illuminate\Database\Eloquent\Builder
     */
    private $model;

    public function __construct()
    {
        $this->model = Order::query();
    }

    /**
     * Trigger Before Create a Order
     *
     * @param Order $order
     */
    public function creating(Order $order)
    {
        $date = Carbon::today()->startOfDay();
        $availableNumber = false;
        $todayOrderCount = $this->model->where('created_at', '>=', $date->toDateString())->count() + 1;

        do {
            while (strlen($todayOrderCount) < 4) {
                $todayOrderCount = '0'.$todayOrderCount;
            }

            $order->order_number = Carbon::today()->format('ymd').'-'.$todayOrderCount;
            if (empty($this->model->where('order_number', $order->order_number)->first())) {
                $availableNumber = true;
            } else {
                $todayOrderCount++;
            }

        } while (!$availableNumber);

        $order->secret_key = $order->generateSecretKey();
    }

    /**
     * Trigger before delete a Order
     *
     * @param Order $order
     */
    public function deleting(Order $order)
    {
        $order->offers()->detach();
    }
}
