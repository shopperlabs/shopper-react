<?php

namespace Mckenziearts\Shopper\Plugins\Catalogue\Repositories;

use Mckenziearts\Shopper\Plugins\Catalogue\Models\Product;

class ProductRepository
{
    /**
     * @var \Illuminate\Database\Eloquent\Builder
     */
    protected $model;

    public function __construct()
    {
        $this->model = Product::query();
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
            'slug'           => $data['slug'],
            'code'           => $data['code'],
            'preview_text'   => $data['preview_text'],
            'description'    => $data['description'],
            'category_id'    => $data['category_id'],
            'brand_id'       => $data['brand_id']
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
            'code'           => $data['code'],
            'preview_text'   => $data['preview_text'],
            'description'    => $data['description'],
            'category_id'    => $data['category_id'],
            'brand_id'       => $data['brand_id'],
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
        return $this->model->with(['brand', 'category'])->paginate($count);
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

    /**
     * Return lastest products
     *
     * @param array $relations
     * @param int $results
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function lastestProducts(array $relations = [], int $results = 4)
    {
        return $this->model
            ->with($relations)
            ->orderBy('created_at', 'desc')
            ->limit($results)
            ->get();
    }

    /**
     * Return bestViewable products
     *
     * @param array $relations
     * @param int $results
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function bestViewable(array $relations = [], int $results = 20)
    {
        return  $this->getModel()
            ->orderByUniqueViews()
            ->with($relations)
            ->limit($results)
            ->get();
    }
}
