<?php

namespace Mckenziearts\Shopper\Plugins\Tags\Repositories;

use Mckenziearts\Shopper\Plugins\Tags\Models\Tag;

class TagRepository
{
    /**
     * @var \Illuminate\Database\Eloquent\Builder
     */
    protected $model;

    public function __construct()
    {
        $this->model = Tag::query();
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
            'active'         => $data['active'],
            'name'           => $data['name'],
            'slug'           => str_slug($data['name']),
            'preview_text'   => $data['preview_text'],
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
            'active'         => $data['active'],
            'name'           => $data['name'],
            'slug'           => $data['slug'],
            'preview_text'   => $data['preview_text'],
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
     * Return active record list
     *
     * @param null $id
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function tagsList($id = null)
    {
        if ($id) {
            return $this->active()
                ->where('id', '<>', $id)
                ->get();
        }

        return $this->active()->get();
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
    protected function active()
    {
        return $this->model->where('active', 1);
    }
}
