<?php

namespace Mckenziearts\Shopper\Plugins\Users\Repositories;

use Mckenziearts\Shopper\Plugins\Users\Models\Address;

class AddressRepository
{
    /**
     * @var \Illuminate\Database\Eloquent\Builder
     */
    protected $model;

    public function __construct()
    {
        $this->model = Address::query();
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
     * @param int   $user_id
     * @return $this|\Illuminate\Database\Eloquent\Model
     */
    public function save(array $data, int $user_id)
    {
        return $this->model->create([
            'active'        => $data['active'],
            'name'          => $data['name'],
            'country_id'    => $data['country_id'],
            'state_id'      => $data['state_id'],
            'city'          => $data['city'],
            'street'        => $data['street'],
            'phone_number'  => $data['phone_number'],
            'post_code'     => $data['post_code'],
            'address'       => $data['address'],
            'user_id'       => $user_id
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
            'active'        => $data['active'],
            'country_id'    => $data['country_id'],
            'state_id'      => $data['state_id'],
            'city'          => $data['city'],
            'street'        => $data['street'],
            'phone_number'  => $data['phone_number'],
            'post_code'     => $data['post_code'],
            'address'       => $data['address'],
            'user_id'       => $data['user_id']
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
     * Return records paginate list
     *
     * @param int $results
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function paginateList(int $results = 10)
    {
        return $this->model->orderBy('created_at', 'desc')->paginate($results);
    }

    /**
     * Return all records
     *
     * @return \Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    public function all()
    {
        return $this->model->get();
    }
}
