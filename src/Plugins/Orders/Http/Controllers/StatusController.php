<?php

namespace Mckenziearts\Shopper\Plugins\Orders\Http\Controllers;

use Illuminate\Http\Request;
use Mckenziearts\Shopper\Http\Controllers\Controller;
use Mckenziearts\Shopper\Plugins\Orders\Http\Requests\StatusRequest;
use Mckenziearts\Shopper\Plugins\Orders\Repositories\StatusRepository;

class StatusController extends Controller
{
    /**
     * @var StatusRepository
     */
    private $repository;

    /**
     * StatusController constructor.
     *
     * @param StatusRepository $repository
     */
    public function __construct(StatusRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $records = $this->repository->paginateList();

        return view('shopper::pages.orders.status.index', compact('records'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        $record = $this->repository->getModel();

        return view('shopper::pages.orders.status.form', compact('record'));
    }

    /**
     * @param int $id
     * @return \Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|StatusRepository|StatusRepository[]
     */
    public function show($id)
    {
        $record = $this->repository->find($id);

        return $record;
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit($id)
    {
        $record = $this->repository->find($id);

        return view('shopper::pages.orders.status.form', compact('record'));
    }

    /**
     * @param StatusRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StatusRequest $request)
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
     * @param StatusRequest $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(StatusRequest $request, $id)
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
                'redirect_url'  => route('shopper.shoporders.statuses.index')
            ]);
        }

        return redirect()
            ->route('shopper.shoporders.statuses.index')
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
