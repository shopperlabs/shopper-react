<?php

namespace Mckenziearts\Shopper\Plugins\Catalogue\Http\Controllers;

use Illuminate\Http\Request;
use Mckenziearts\Shopper\Http\Controllers\Controller;
use Mckenziearts\Shopper\Plugins\Catalogue\Repositories\OfferRepository;

class OfferController extends Controller
{
    /**
     * @var OfferRepository
     */
    private $repository;

    /**
     * OfferController constructor.
     *
     * @param OfferRepository $repository
     */
    public function __construct(OfferRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @param Request $request
     * @param int $product_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request, int $product_id)
    {
        $this->repository->save($request->all(), $product_id);

        $response = [
            'status'    => 'success',
            'message'   => __('Record saved successfuly'),
            'title'     => __('Saved')
        ];

        return response()->json($response);
    }

    /**
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, int $id)
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

    /**
     * @param int $product_id
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function offersList(int $product_id)
    {
        $offers = $this->repository->all($product_id);

        return $offers;
    }
}
