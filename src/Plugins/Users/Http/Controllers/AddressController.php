<?php

namespace Mckenziearts\Shopper\Plugins\Users\Http\Controllers;

use Mckenziearts\Shopper\Http\Controllers\Controller;
use Mckenziearts\Shopper\Plugins\Users\Http\Requests\AddressRequest;
use Mckenziearts\Shopper\Plugins\Users\Repositories\AddressRepository;

class AddressController extends Controller
{
    /**
     * @var AddressRepository
     */
    private $repository;

    /**
     * AddressController constructor.
     *
     * @param AddressRepository $repository
     */
    public function __construct(AddressRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @param AddressRequest $request
     * @param int $user_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(AddressRequest $request, int $user_id)
    {
        $this->repository->save($request->all(), $user_id);

        $response = [
            'status'    => 'success',
            'message'   => __('Record saved successfuly'),
            'title'     => __('Saved')
        ];

        return response()->json($response);
    }

    /**
     * @param AddressRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(AddressRequest $request, int $id)
    {
        $this->repository->update($request->all(), $id);

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
