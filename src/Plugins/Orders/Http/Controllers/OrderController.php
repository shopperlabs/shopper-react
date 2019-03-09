<?php

namespace Mckenziearts\Shopper\Plugins\Orders\Http\Controllers;

use Illuminate\Http\Request;
use Mckenziearts\Shopper\Http\Controllers\Controller;
use Mckenziearts\Shopper\Plugins\Catalogue\Repositories\OfferRepository;
use Mckenziearts\Shopper\Plugins\Orders\Http\Requests\OrderRequest;
use Mckenziearts\Shopper\Plugins\Orders\Models\OrderContent;
use Mckenziearts\Shopper\Plugins\Orders\Repositories\OrderRepository;

class OrderController extends Controller
{
    /**
     * @var OrderRepository
     */
    private $repository;
    /**
     * @var OfferRepository
     */
    private $offerRepository;

    /**
     * OrderController constructor.
     *
     * @param OrderRepository $repository
     * @param OfferRepository $offerRepository
     */
    public function __construct(OrderRepository $repository, OfferRepository $offerRepository)
    {
        $this->repository = $repository;
        $this->offerRepository = $offerRepository;
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $records = $this->repository->paginateList();

        return view('shopper::pages.orders.index', compact('records'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        $record = $this->repository->getModel();

        return view('shopper::pages.orders.form', compact('record'));
    }

    /**
     * @param OrderRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(OrderRequest $request)
    {
        $this->repository->save($request->all());

        $response = [
            'status'    => 'success',
            'message'   => __('Record saved successfuly'),
            'title'     => __('Saved')
        ];

        return response()->json($response);
    }

    /**
     * @param OrderRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(OrderRequest $request, int $id)
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
     * @param int $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit(int $id)
    {
        $record = $this->repository->find($id, ['user']);

        return view('shopper::pages.orders.form', compact('record'));
    }

    /**
     * @param int $id
     * @return \Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|static|static[]
     */
    public function show(int $id)
    {
        $record = $this->repository->find($id, ['user']);

        return $record;
    }

    /**
     * Delete a record
     *
     * @param int $id
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(int $id, Request $request)
    {
        $this->repository->delete($id);

        if ($request->ajax()) {
            return response()->json([
                'status'  => 'ok',
                'redirect_url'  => route('shopper.shoporders.orders.index')
            ]);
        }

        return redirect()
            ->route('shopper.shoporders.orders.index')
            ->with('success', __('Record deleted successfully'));
    }

    /**
     * Store a new offer in an order
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeOrderOffers(Request $request, int $id)
    {
        $offer = $this->offerRepository->find($request->input('offer_id'));

        if ((int) $request->input('quantity') > $offer->quantity) {
            $response = [
                'status'    => 'error',
                'message'   => __('This quantity is not available please update your cart'),
                'qteCount'  => $offer->quantity
            ];

            return response()->json($response);
        }

        OrderContent::create([
           'order_id'   => $id,
           'offer_id'   => $offer->id,
           'price'      => $offer->price,
           'old_price'  => $offer->old_price,
           'code'       => $offer->code,
           'quantity'   => $request->input('quantity')
        ]);

        $order = $this->repository->find($id);

        $response = [
            'status'    => 'success',
            'message'   => __('Offer saved successfuly for this order'),
            'title'     => __('Saved Offer'),
            'orderPrice'   => $order->total_price,
            'totalPrice'   => $order->total_price + $order->shipping_price
        ];

        return response()->json($response);
    }

    /**
     * Return a list of offer in one order
     *
     * @param int $id
     * @return \Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection|OrderContent[]
     */
    public function getOrderOffers(int $id)
    {
        $offers = OrderContent::with(['offer'])->where('order_id', $id)->get();
        $offers->map(function ($item) {
           $item['name'] = $item->offer->name;
        });

        return $offers;
    }

    /**
     * Delete Offer in a order
     *
     * @param $ids
     * @param int $order_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroyOrderOffers($ids, int $order_id)
    {
        OrderContent::whereIn('id', explode(',', $ids))->delete();
        $order = $this->repository->find($order_id);

        $response = [
            'status'    => 'success',
            'message'   => __('Offers deleted successfuly'),
            'title'     => __('Deleted'),
            'orderPrice'    => $order->total_price,
            'totalPrice'    => $order->total_price + $order->shipping_price
        ];

        return response()->json($response);
    }
}
