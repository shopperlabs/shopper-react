<?php

namespace Mckenziearts\Shopper\Http\Controllers\Backend;

use Mckenziearts\Shopper\Http\Controllers\Controller;
use Mckenziearts\Shopper\Http\Requests\StateRequest;
use Mckenziearts\Shopper\Repositories\StateRepository;

class StateController extends Controller
{
    /**
     * @var StateRepository
     */
    private $repository;

    /**
     * StateController constructor.
     *
     * @param StateRepository $repository
     */
    public function __construct(StateRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @param StateRequest $request
     * @param int $country_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StateRequest $request, int $country_id)
    {
        $this->repository->save($request->all(), $country_id);

        $response = [
            'status'    => 'success',
            'message'   => __('Record saved successfuly'),
            'title'     => __('Saved')
        ];

        return response()->json($response);
    }

    /**
     * @param StateRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(StateRequest $request, int $id)
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
