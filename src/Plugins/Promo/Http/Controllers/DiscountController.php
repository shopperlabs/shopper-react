<?php

namespace Mckenziearts\Shopper\Plugins\Promo\Http\Controllers;

use Illuminate\Http\Request;
use Mckenziearts\Shopper\Http\Controllers\Controller;
use Mckenziearts\Shopper\Plugins\Catalogue\Models\Offer;
use Mckenziearts\Shopper\Plugins\Catalogue\Repositories\OfferRepository;
use Mckenziearts\Shopper\Plugins\Promo\Http\Requests\DiscountRequest;
use Mckenziearts\Shopper\Plugins\Promo\Models\Discount;
use Mckenziearts\Shopper\Plugins\Promo\Repositories\DiscountRepository;

class DiscountController extends Controller
{
    /**
     * @var DiscountRepository
     */
    private $repository;

    /**
     * @var OfferRepository
     */
    private $offerRepository;

    /**
     * DiscountController constructor.
     *
     * @param DiscountRepository $repository
     * @param OfferRepository $offerRepository
     */
    public function __construct(DiscountRepository $repository, OfferRepository $offerRepository)
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

        return view('shopper::pages.promo.discounts.index', compact('records'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        $record = $this->repository->getModel();

        return view('shopper::pages.promo.discounts.form', compact('record'));
    }

    /**
     * @param DiscountRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(DiscountRequest $request)
    {
        $date = $request->input('mysqlDate');
        $data = array_merge($request->except(['date', 'mysqlDate']), ['date_begin' => $date[0], 'date_end' => $date[1]]);

        $this->repository->save($data);

        $response = [
            'status'    => 'success',
            'message'   => __('Record saved successfuly'),
            'title'     => __('Saved')
        ];

        return response()->json($response);
    }

    /**
     * @param DiscountRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(DiscountRequest $request, int $id)
    {
        $date = $request->input('mysqlDate');
        $data = array_merge($request->except(['date', 'mysqlDate']), ['date_begin' => $date[0], 'date_end' => $date[1]]);

        $this->repository->update($data, $id);

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
        $record = $this->repository->find($id);

        return view('shopper::pages.promo.discounts.form', compact('record'));
    }

    /**
     * @param int $id
     * @return \Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|static|static[]
     */
    public function show($id)
    {
        $record = $this->repository->find($id);

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
                'redirect_url'  => route('shopper.promo.discounts.index')
            ]);
        }

        return redirect()
            ->route('shopper.promo.discounts.index')
            ->with('success', __('Record deleted successfully'));
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    public function lists()
    {
        return $this->repository->all();
    }

    /**
     * Return a list of offer in one discount
     *
     * @param int $id
     * @return mixed
     */
    public function getDiscountOffers(int $id)
    {
        $record = $this->repository->find($id, ['offers']);

        return $record->offers;
    }

    /**
     * Store a new offer in an order
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeDiscountOffers(Request $request, int $id)
    {
        $offer = $this->offerRepository->find($request->input('offer_id'));
        $discount = $this->repository->find($id);

        if ($discount->type === Discount::DISCOUNT_PERCENT) {
            $percent = (float) ($discount->value / 100);
            $newPrice = $offer->price - ($offer->price * $percent);
        } else {
            $newPrice = $offer->price - (float) $discount->value;
        }

        Offer::where('id', $request->input('offer_id'))->update([
            'old_price'       => $offer->price,
            'price'           => $newPrice,
            'discount_id'     => $discount->id,
            'discount_value'  => $discount->value,
            'discount_price'  => ($offer->price - $newPrice),
            'discount_type'   => $discount->type,
        ]);

        $response = [
            'status'    => 'success',
            'message'   => __('Offer added successfuly for this discount'),
            'title'     => __('Add Offer')
        ];

        return response()->json($response);
    }

    /**
     * Remove Discount to offer
     *
     * @param $ids
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroyDiscountOffers($ids)
    {
        $idsOffer = explode(',', $ids);

        foreach ($idsOffer as $id) {
            $offer = Offer::find($id);
            Offer::where('id', $id)->update([
                'old_price'       => null,
                'price'           => $offer->old_price,
                'discount_id'     => null,
                'discount_value'  => null,
                'discount_price'  => null,
                'discount_type'   => null,
            ]);
        }

        $response = [
            'status'    => 'success',
            'message'   => __('Offers removed to the discount successfuly'),
            'title'     => __('Removed')
        ];

        return response()->json($response);
    }
}
