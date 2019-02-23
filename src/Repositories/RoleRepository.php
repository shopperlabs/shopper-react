<?php

namespace Mckenziearts\Shopper\Repositories;

use Mckenziearts\Shopper\Models\Sentinel\EloquentRole;

class RoleRepository
{
    /**
     * @var \Illuminate\Database\Eloquent\Builder
     */
    private $model;

    public function __construct()
    {
        $this->model = EloquentRole::query();
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
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function all()
    {
        return $this->model->get();
    }
}
