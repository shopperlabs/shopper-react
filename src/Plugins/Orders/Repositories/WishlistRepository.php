<?php

namespace Mckenziearts\Shopper\Plugins\Orders\Repositories;

use Mckenziearts\Shopper\Plugins\Orders\Models\Wishlist;

class WishlistRepository
{
    /**
     * @var \Illuminate\Database\Eloquent\Builder
     */
    protected $model;

    public function __construct()
    {
        $this->model = Wishlist::query();
    }
}
