<?php

namespace Mckenziearts\Shopper\Plugins\Catalogue\Repositories;

use Mckenziearts\Shopper\Plugins\Catalogue\Models\Review;

class ReviewRepository
{
    /**
     * @var \Illuminate\Database\Eloquent\Builder
     */
    protected $model;

    public function __construct()
    {
        $this->model = Review::query();
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
            'active'       => $data['active'],
            'user_id'      => $data['user_id'],
            'product_id'   => $data['product_id'],
            'rate'         => (int) $data['rate'],
            'comment'      => $data['comment']
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
            'active'       => $data['active'],
            'user_id'      => $data['user_id'],
            'product_id'   => $data['product_id'],
            'rate'         => (int) $data['rate'],
            'comment'      => $data['comment']
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
        return $this->model->orderByDesc('created_at')->paginate($count);
    }

    /**
     * Get active record
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function active()
    {
        return $this->model->where('active', 1);
    }
}
