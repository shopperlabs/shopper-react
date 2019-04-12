<?php

namespace Mckenziearts\Shopper\Plugins\Orders\Repositories;

use Illuminate\Support\Facades\DB;
use Mckenziearts\Shopper\Plugins\Orders\Models\Order;
use Mckenziearts\Shopper\Plugins\Orders\Models\Status;

class OrderRepository
{
    /**
     * @var \Illuminate\Database\Eloquent\Builder
     */
    protected $model;

    public function __construct()
    {
        $this->model = Order::query();
    }

    /**
     * Return New Model instance
     *
     * @return \Illuminate\Database\Eloquent\Model|static
     */
    public function getModel()
    {
        return $this->model->newModelInstance();
    }

    /**
     * Save a new model and return the instance. Allow mass-assignment.
     *
     * @param array $data
     * @return $this|\Illuminate\Database\Eloquent\Model
     */
    public function save(array $data)
    {
        return $this->model->create([
            'user_id'           => $data['user_id'],
            'status_id'         => $data['status_id'],
            'shipping_type_id'  => $data['shipping_type_id'],
            'payment_method_id' => $data['payment_method_id'],
            'shipping_price'    => $data['shipping_price'],
        ]);
    }

    /**
     * Update a model and return the instance. Allow mass-assignment.
     *
     * @param array $data
     * @param $id
     * @return bool|int
     */
    public function update(array $data, $id)
    {
        return $this->model->findOrFail($id)->update([
            'user_id'           => $data['user_id'],
            'status_id'         => $data['status_id'],
            'shipping_type_id'  => $data['shipping_type_id'],
            'payment_method_id' => $data['payment_method_id'],
            'shipping_price'    => $data['shipping_price'],
        ]);
    }

    /**
     * Delete a record
     *
     * @param $id
     * @return bool|mixed|null
     */
    public function delete($id)
    {
        return $this->model->findOrFail($id)->delete();
    }

    /**
     * Return single record
     *
     * @param int $id
     * @param array $relations
     * @return \Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|static|static[]
     */
    public function find($id, array $relations = [])
    {
        if (count($relations) < 1) {
            return $this->model->findOrFail($id);
        }

        return $this->model->with($relations)->findOrFail($id);
    }

    /**
     * Return paginate record list
     *
     * @param int $count
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function paginateList(int $count = 10)
    {
        return $this->model
            ->with(['user', 'status', 'shippingType', 'paymentMethod'])
            ->orderByDesc('created_at')
            ->paginate($count);
    }

    /**
     * Get recents orders if an user_id is defined return the user recents orders
     *
     * @param array $relations
     * @param int $result
     * @param int|null $user_id
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function recentOrders(array $relations = [], int $result = 5, int $user_id = null)
    {
        if ($user_id) {
            return $this->model
                ->with($relations)
                ->where('user_id', '=', $user_id)
                ->limit($result)
                ->get();
        }

        return $this->model
            ->with($relations)
            ->orderBy('created_at', 'desc')
            ->limit($result)
            ->get();
    }

    /**
     * @param $number
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function getByNumber($number)
    {
        return $this->model->where('order_number', $number);
    }

    /**
     * @param int    $id
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function getByStatus($id)
    {
        return $this->model->where('status_id', $id);
    }

    /**
     * @param int   $id
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function getByShippingType($id)
    {
        return $this->model->where('shipping_type_id', $id);
    }

    /**
     * @param int   $id
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function getByPaymentMethod($id)
    {
        return $this->model->where('payment_method_id', $id);
    }

    /**
     * @param string    $key
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function getBySecretKey($key)
    {
       return $this->model->where('secret_key', $key);
    }

    /**
     * Return total order price
     *
     * @return mixed
     */
    public function getTotalRevenue()
    {
        return $this->model->get()->sum('total_price');
    }

    /**
     * Return a list of Orders with the status set in parameter
     *
     * @param string $code
     * @param int $limit
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function ordersStatusList(string $code, int $limit = null)
    {
        if (! $limit) {
            return $this->model->join((new Status())->getTable(), 'status_id', '=', (new Status())->getTable(). '.id')
                ->where((new Status())->getTable(). '.code', '=', $code)
                ->select( DB::raw($this->getModel()->getTable() .'.*'))
                ->get();
        }

        return $this->model->join((new Status())->getTable(), 'status_id', '=', (new Status())->getTable(). '.id')
            ->where((new Status())->getTable(). '.code', '=', $code)
            ->select( DB::raw($this->getModel()->getTable() .'.*'))
            ->limit($limit)
            ->get();
    }
}
