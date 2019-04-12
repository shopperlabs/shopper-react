<?php

namespace Mckenziearts\Shopper\Plugins\Orders\Repositories;

use Mckenziearts\Shopper\Plugins\Orders\Models\Status;

class StatusRepository
{
    /**
     * @var \Illuminate\Database\Eloquent\Builder
     */
    protected $model;

    public function __construct()
    {
        $this->model = Status::query();
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
            'name'           => $data['name'],
            'code'           => $data['code'],
            'is_user_show'   => $data['is_user_show'],
            'description'    => $data['description']
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
            'name'           => $data['name'],
            'code'           => $data['code'],
            'is_user_show'   => $data['is_user_show'],
            'description'    => $data['description']
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
        return $this->model->orderByDesc('created_at')->paginate($count);
    }

    /**
     * Return all records
     *
     * @return \Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    public function all()
    {
        return $this->getByUserShow(1)->get();
    }

    /**
     * @param $status
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function getByUserShow($status)
    {
        return $this->model->where('is_user_show', $status);
    }
}
