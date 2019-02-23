<?php

namespace Mckenziearts\Shopper\Repositories;

use Cartalyst\Sentinel\Laravel\Facades\Sentinel;
use Mckenziearts\Shopper\Models\Sentinel\EloquentUser;

class UserRepository
{
    /**
     * @var \Illuminate\Database\Eloquent\Builder
     */
    private $model;

    public function __construct()
    {
        $this->model = EloquentUser::query();
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
        return Sentinel::registerAndActivate([
            'first_name'    => $data['first_name'],
            'last_name'     => $data['last_name'],
            'email'         => $data['email'],
            'login'         => $data['login'],
            'password'      => bcrypt($data['password']),
            'is_superuser'  => $data['is_superuser']
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
            'first_name'        => $data['first_name'],
            'last_name'         => $data['last_name'],
            'email'             => $data['email'],
            'login'             => $data['login'],
            'password'          => bcrypt($data['password']),
            'is_superuser'      => $data['is_superuser']
        ]);
    }

    /**
     * Update user profile
     *
     * @param array $data
     * @param int $id
     * @return \Illuminate\Database\Eloquent\Model|UserRepository
     */
    public function updateProfile(array $data, int $id)
    {
        $model = $this->model->findOrFail($id);
        $model->first_name   = $data['first_name'];
        $model->last_name    = $data['last_name'];
        $model->email        = $data['email'];
        $model->login        = $data['login'];

        if (! is_null($data['password'])) {
            $model->password  = bcrypt($data['password']);
        }

        $model->save();

        return $model;
    }

    /**
     * Delete a record
     *
     * @param int   $id
     * @return bool|mixed|null
     */
    public function delete(int $id)
    {
        $record = Sentinel::findById($id);

        return $record->delete();
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
        return $this->model->with('roles')->orderBy('created_at', 'desc')->paginate($results);
    }
}
