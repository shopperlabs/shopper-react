<?php

namespace Mckenziearts\Shopper\Plugins\Users\Repositories;

use Mckenziearts\Shopper\Plugins\Users\Models\Transaction;
use Mckenziearts\Shopper\Plugins\Users\Models\User;
use Mckenziearts\Shopper\Plugins\Users\Models\Wallet;

class BalanceRepository
{
    /**
     * @var \Illuminate\Database\Eloquent\Builder
     */
    private $model;

    public function __construct()
    {
        $this->model = Wallet::query();
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
     * @param int $user_id
     * @return bool
     */
    public function save(array $data, int $user_id)
    {
        $user = User::findOrFail($user_id);
        if($data['type'] === 'deposit'){
            $user->deposit($data['amount'],
                $data['type'],$data['meta'],
                $data['accepted']);
            return true;
        }

        if($user->canWithdraw($data['amount'])){
            $user->withdraw($data['amount'],
                $data['type'],$data['meta'],
                $data['accepted']);
            return true;
        }

        return false;
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
        return Transaction::findOrFail($id)->update([
            'amount'   => $data['amount'],
            'meta'     => $data['meta'],
            'accepted' => $data['accepted'],
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
        return Transaction::whereIn('id', explode(',', $ids))->delete();
    }
}
