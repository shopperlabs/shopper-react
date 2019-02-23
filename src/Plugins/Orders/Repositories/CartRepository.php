<?php

namespace Mckenziearts\Shopper\Plugins\Orders\Repositories;

use Mckenziearts\Shopper\Plugins\Orders\Models\Cart;

class CartRepository
{
    /**
     * @var \Illuminate\Database\Eloquent\Builder
     */
    protected $model;

    public function __construct()
    {
        $this->model = Cart::query();
    }
}
