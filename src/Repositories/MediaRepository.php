<?php

namespace Mckenziearts\Shopper\Repositories;

use Mckenziearts\Shopper\Models\Media;

class MediaRepository
{
    /**
     * @var \Illuminate\Database\Eloquent\Builder
     */
    private $model;

    public function __construct()
    {
        $this->model = Media::query();
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Model
     */
    public function getModel()
    {
        return $this->model->newModelInstance();
    }

    /**
     * @param array $data
     * @return \Illuminate\Database\Eloquent\Builder|\Illuminate\Database\Eloquent\Model
     */
    public function store(array $data)
    {
        return $this->model->create($data);
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
}
