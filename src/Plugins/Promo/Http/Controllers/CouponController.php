<?php

namespace Mckenziearts\Shopper\Plugins\Promo\Http\Controllers;

use Illuminate\Http\Request;
use Mckenziearts\Shopper\Http\Controllers\Controller;
use Mckenziearts\Shopper\Plugins\Catalogue\Models\Product;
use Mckenziearts\Shopper\Plugins\Promo\Http\Requests\CouponRequest;
use Mckenziearts\Shopper\Plugins\Promo\Models\CouponRelation;
use Mckenziearts\Shopper\Plugins\Promo\Repositories\CouponRepository;

class CouponController extends Controller
{
    /**
     * @var CouponRepository
     */
    private $repository;

    public function __construct(CouponRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $records = $this->repository->paginateList();

        return view('shopper::pages.promo.coupons.index', compact('records'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        $record = $this->repository->getModel();

        return view('shopper::pages.promo.coupons.form', compact('record'));
    }

    /**
     * @param CouponRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CouponRequest $request)
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
     * @param int $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit(int $id)
    {
        $record = $this->repository->find($id);

        return view('shopper::pages.promo.coupons.form', compact('record'));
    }

    /**
     * @param int $id
     * @return \Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|static|static[]
     */
    public function show($id)
    {
        $record = $this->repository->find($id, ['products', 'users']);
        $record->products->map(function ($item) {
            $item['brand_name'] = $item->getBrand();
            $item['category_name'] = $item->getCategory();
        });

        return $record;
    }

    /**
     * @param CouponRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(CouponRequest $request, int $id)
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
                'redirect_url'  => route('shopper.promo.coupons.index')
            ]);
        }

        return redirect()
            ->route('shopper.promo.coupons.index')
            ->with('success', __('Record deleted successfully'));
    }

    /**
     * Store products who coupon be apply
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function storeCouponProducts(Request $request, int $id)
    {
        $coupon = $this->repository->find($id);

        if (count($request->input('product_ids')) > 0) {
            foreach ($request->input('product_ids') as $id) {
                CouponRelation::updateOrCreate(
                    ['coupon_id' => $coupon->id, 'couponable_id' => $id],
                    ['couponable_type' => Product::class]
                );
            }

            $response = [
                'status'    => 'success',
                'message'   => __('Product(s) added successfuly'),
                'title'     => __('Added'),
                'products'  => $coupon->products
            ];
        } else {
            $response = [
                'status'    => 'error',
                'message'   => __('No products selected'),
                'title'     => __('Error'),
                'products'  => []
            ];
        }

        return response()->json($response);
    }

    /**
     * GetCouponProduct : Return a list of products that's this coupon must be apply
     *
     * @param int $id
     * @return mixed
     */
    public function getCouponProducts($id)
    {
        $coupon = $this->repository->find($id, ['products']);
        $coupon->products->map(function ($item) {
            $item['brand_name'] = $item->getBrand();
            $item['category_name'] = $item->getCategory();
        });

        return $coupon->products;
    }

    /**
     * @param mixed     $id
     * @param int       $coupon_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function removeProducts($id, int $coupon_id)
    {
        $ids = explode(',', $id);
        CouponRelation::where('coupon_id', $coupon_id)->whereIn('couponable_id', $ids)->delete();

        $response = [
            'status'    => 'success',
            'message'   => __('Product remove successfuly'),
            'title'     => __('Deleted')
        ];

        return response()->json($response);
    }
}
