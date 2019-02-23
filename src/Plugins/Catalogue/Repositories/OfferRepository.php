<?php

namespace Mckenziearts\Shopper\Plugins\Catalogue\Repositories;

use Mckenziearts\Shopper\Plugins\Catalogue\Models\Offer;

class OfferRepository
{
    /**
     * @var \Illuminate\Database\Eloquent\Builder
     */
    protected $model;

    public function __construct()
    {
        $this->model = Offer::query();
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
     * @param int   $product_id Product ID
     * @return $this|\Illuminate\Database\Eloquent\Model
     */
    public function save(array $data, int $product_id)
    {
        return $this->model->create([
            'active'        => $data['active'],
            'name'          => $data['name'],
            'product_id'    => $product_id,
            'code'          => $data['code'],
            'price'         => $data['price'],
            'old_price'     => $data['old_price'],
            'quantity'      => $data['quantity']
        ]);
    }

    /**
     * Update a model and return the instance. Allow mass-assignment.
     *
     * @param array $data
     * @param int $id
     * @return bool|int
     */
    public function update(array $data, int $id)
    {
        return $this->model->findOrFail($id)->update([
            'active'        => $data['active'],
            'name'          => $data['name'],
            'product_id'    => $data['product_id'],
            'code'          => $data['code'],
            'price'         => $data['price'],
            'old_price'     => $data['old_price'],
            'quantity'      => $data['quantity']
        ]);
    }

    /**
     * Delete a record
     *
     * @param $ids
     * @return bool|mixed|null
     */
    public function delete($ids)
    {
        return $this->model->whereIn('id', explode(',', $ids))->delete();
    }

    /**
     * Return single record
     *
     * @param int $id
     * @return \Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|static|static[]
     */
    public function find($id)
    {
        return $this->model->findOrFail($id);
    }

    /**
     * Return all records for a product id
     *
     * @param int $id
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function all(int $id)
    {
        return $this->model->where('product_id', $id)->get();
    }

    /**
     * Return paginate record list
     *
     * @param int $count
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function paginateList(int $count = 10)
    {
        return $this->model->paginate($count);
    }

    /**
     * Get active record
     *
     * @return $this
     */
    protected function active()
    {
        $this->model->where('active', 1);

        return $this;
    }
}
