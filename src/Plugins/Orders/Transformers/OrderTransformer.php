<?php

namespace Mckenziearts\Shopper\Plugins\Orders\Transformers;

use League\Fractal\TransformerAbstract;
use Mckenziearts\Shopper\Plugins\Orders\Models\Order;

class OrderTransformer extends TransformerAbstract
{
    /**
     * List of resources possible to include
     *
     * @var array
     */
    protected $availableIncludes = [];

    /**
     * Turn this item object into a generic array
     *
     * @param Order $order
     * @return array
     */
    public function transform(Order $order)
    {
        return [
            'id'           => (int) $order->id,
            'order_number' => $order->order_number,
            'total_price'  => $order->total_price,
            'status_id'    => $order->getStatus(),
            'payment_method_id'  => $order->getPaymentMethod(),
            'shipping_type_id'   => $order->getShippingType(),
        ];
    }
}
