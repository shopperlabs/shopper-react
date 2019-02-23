<?php

namespace Mckenziearts\Shopper\Plugins\Orders\Repositories;

use Mckenziearts\Shopper\Plugins\Orders\Models\ShippingType;

class ShippingTypeRepository
{
    /**
     * @var \Illuminate\Database\Eloquent\Builder
     */
    protected $model;

    public function __construct()
    {
        $this->model = ShippingType::query();
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
            'name'          => $data['name'],
            'code'          => $data['code'],
            'active'        => $data['active'],
            'price'         => $data['price'],
            'description'   => $data['description']
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
            'name'          => $data['name'],
            'code'          => $data['code'],
            'active'        => $data['active'],
            'price'         => $data['price'],
            'description'   => $data['description']
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
     * @return \Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|static|static[]
     */
    public function find($id)
    {
        return $this->model->findOrFail($id);
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
     * Get all records
     *
     * @return \Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    public function all()
    {
        return $this->getByActive(1)->get();
    }

    /**
     * @param $state
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function getByActive($state)
    {
        return $this->model->where('active', $state);
    }
}
