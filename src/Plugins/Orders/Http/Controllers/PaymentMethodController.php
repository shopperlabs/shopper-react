<?php

namespace Mckenziearts\Shopper\Plugins\Orders\Http\Controllers;

use Illuminate\Http\Request;
use Mckenziearts\Shopper\Http\Controllers\Controller;
use Mckenziearts\Shopper\Plugins\Orders\Http\Requests\PaymentRequest;
use Mckenziearts\Shopper\Plugins\Orders\Repositories\PaymentRepository;

class PaymentMethodController extends Controller
{
    /**
     * @var PaymentRepository
     */
    private $repository;

    /**
     * PaymentMethodController constructor.
     *
     * @param PaymentRepository $repository
     */
    public function __construct(PaymentRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $records = $this->repository->paginateList();

        return view('shopper::pages.orders.payments.index', compact('records'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        $record = $this->repository->getModel();

        return view('shopper::pages.orders.payments.form', compact('record'));
    }

    /**
     * @param PaymentRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(PaymentRequest $request)
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
     * @param PaymentRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(PaymentRequest $request, int $id)
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
        $record = $this->repository->find($id);

        return view('shopper::pages.orders.payments.form', compact('record'));
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
                'redirect_url'  => route('shopper.shoporders.payments.index')
            ]);
        }

        return redirect()
            ->route('shopper.shoporders.payments.index')
            ->with('success', __('Record deleted successfully'));
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    public function lists()
    {
        return $this->repository->all();
    }
}
