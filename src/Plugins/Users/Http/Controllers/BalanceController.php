<?php
/**
 * Created by IntelliJ IDEA.
 * User: Mac
 * Date: 2019-03-27
 * Time: 15:15
 */

namespace Mckenziearts\Shopper\Plugins\Users\Http\Controllers;


use Mckenziearts\Shopper\Http\Controllers\Controller;
use Mckenziearts\Shopper\Plugins\Users\Http\Requests\BalanceRequest;
use Mckenziearts\Shopper\Plugins\Users\Repositories\BalanceRepository;

class BalanceController extends Controller
{

    /**
     * @var BalanceRepository
     */
    private $repository;

    /**
     * BalanceController constructor.
     * @param BalanceRepository $repository
     */
    public function __construct(BalanceRepository $repository)
    {
        $this->repository = $repository;
    }


    /**
     * @param BalanceRequest $request
     * @param int $user_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(BalanceRequest $request, int $user_id)
    {
        $result = $this->repository->save($request->all(), $user_id);
        if($result){
            $response = [
                'status'    => 'success',
                'message'   => __('Record saved successfuly'),
                'title'     => __('Saved')
            ];
        }else{
            $response = [
                'status'    => 'error',
                'message'   => __('The current amount cannot be remove from your wallet'),
                'title'     => __('Saved')
            ];
        }

        return response()->json($response);
    }

    /**
     * @param BalanceRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(BalanceRequest $request, int $id)
    {
         $this->repository->update($request->all(), $request->get('id'));

        $response = [
            'status'    => 'success',
            'message'   => __('Record updated successfuly'),
            'title'     => __('Updated')
        ];

        return response()->json($response);
    }

    /**
     * Delete a record
     *
     * @param mixed $ids
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($ids)
    {
        $this->repository->delete($ids);

        $response = [
            'status'    => 'success',
            'message'   => __('Record deleted successfuly'),
            'title'     => __('Deleted')
        ];

        return response()->json($response);
    }

}
