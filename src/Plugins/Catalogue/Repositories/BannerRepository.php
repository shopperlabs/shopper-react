<?php

namespace Mckenziearts\Shopper\Plugins\Catalogue\Repositories;

use Mckenziearts\Shopper\Plugins\Catalogue\Models\Banner;

class BannerRepository
{
    /**
     * @var \Illuminate\Database\Eloquent\Builder
     */
    protected $model;

    public function __construct()
    {
        $this->model = Banner::query();
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
            'size_id'       => $data['size_id'],
            'code'          => $data['code'],
            'title'         => $data['title'],
            'subtitle'      => $data['subtitle'],
            'text_position' => $data['text_position'],
            'price'         => $data['price'],
            'button_text'   => $data['button_text'],
            'button_icon'   => $data['button_icon'],
            'link_type'     => $data['link_type'],
            'link_url'      => $data['link_url'],
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
            'size_id'       => $data['size_id'],
            'code'          => $data['code'],
            'title'         => $data['title'],
            'subtitle'      => $data['subtitle'],
            'text_position' => $data['text_position'],
            'price'         => $data['price'],
            'button_text'   => $data['button_text'],
            'button_icon'   => $data['button_icon'],
            'link_type'     => $data['link_type'],
            'link_url'      => $data['link_url'],
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
}
