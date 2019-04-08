<?php

namespace Mckenziearts\Shopper\Plugins\Catalogue\Http\Controllers;

use Illuminate\Http\Request;
use Mckenziearts\Shopper\Http\Controllers\Controller;
use Mckenziearts\Shopper\Plugins\Catalogue\Http\Requests\SizeRequest;
use Mckenziearts\Shopper\Plugins\Catalogue\Repositories\SizeRepository;

class SizeController extends Controller
{
    /**
     * @var SizeRepository
     */
    private $repository;

    public function __construct(SizeRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $records = $this->repository->paginateList();

        return view('shopper::pages.sizes.index', compact('records'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        $record = $this->repository->getModel();

        return view('shopper::pages.sizes.form', compact('record'));
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit($id)
    {
        $record = $this->repository->find($id);

        return view('shopper::pages.sizes.form', compact('record'));
    }

    /**
     * @param SizeRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(SizeRequest $request)
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
     * @param SizeRequest $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(SizeRequest $request, $id)
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
     * @param $id
     * @return \Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|static|static[]
     */
    public function show(int $id)
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
                'redirect_url'  => route('shopper.catalogue.sizes.index')
            ]);
        }

        return redirect()
            ->route('shopper.catalogue.sizes.index')
            ->with('success', __('Record deleted successfully'));
    }

    /**
     * Return list of records
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function sizesList()
    {
        return $this->repository->sizesList();
    }
}
