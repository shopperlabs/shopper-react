<?php

namespace Mckenziearts\Shopper\Repositories;

use Mckenziearts\Shopper\Models\State;

class StateRepository
{
    /**
     * @var \Illuminate\Database\Eloquent\Builder
     */
    private $model;

    public function __construct()
    {
        $this->model = State::query();
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
     * @param int   $country_id
     * @return $this|\Illuminate\Database\Eloquent\Model
     */
    public function save(array $data, int $country_id)
    {
        return $this->model->create([
            'name'         => $data['name'],
            'code'         => $data['code'],
            'country_id'   => $country_id
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
            'name'         => $data['name'],
            'code'         => $data['code'],
            'country_id'   => $data['country_id']
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
