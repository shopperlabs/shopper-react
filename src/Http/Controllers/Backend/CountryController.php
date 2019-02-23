<?php

namespace Mckenziearts\Shopper\Http\Controllers\Backend;

use Mckenziearts\Shopper\Http\Controllers\Controller;
use Mckenziearts\Shopper\Http\Requests\CountryRequest;
use Mckenziearts\Shopper\Repositories\CountryRepository;

class CountryController extends Controller
{
    /**
     * @var CountryRepository
     */
    private $repository;

    /**
     * CountryController constructor.
     *
     * @param CountryRepository $repository
     */
    public function __construct(CountryRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $records = $this->repository->paginateList();

        return view('shopper::pages.settings.locations.index', compact('records'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        $record = $this->repository->getModel();

        return view('shopper::pages.settings.locations.form', compact('record'));
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit($id)
    {
        $record = $this->repository->find($id);

        return view('shopper::pages.settings.locations.form', compact('record'));
    }

    /**
     * @param CountryRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CountryRequest $request)
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
     * @param CountryRequest $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(CountryRequest $request, $id)
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
     * @return \Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|CountryRepository|CountryRepository[]
     */
    public function show(int $id)
    {
        return $this->repository->find($id, ['states']);
    }

    /**
     * Delete a record
     *
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(int $id)
    {
        $this->repository->delete($id);

        return redirect()
            ->route('shopper.settings.locations.countries.index')
            ->with('success', __('Record deleted successfully'));
    }

    /**
     * Return list of enabled countries
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function lists()
    {
        return $this->repository->isEnabled()->get();
    }

    /**
     * Return list of state of the country id set in parameter
     *
     * @param int $id
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function statesList(int $id)
    {
        $country = $this->repository->find($id, ['states']);

        return $country->states;
    }
}
