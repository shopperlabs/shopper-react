<?php

namespace Mckenziearts\Shopper\Plugins\Tags\Http\Controllers;

use Mckenziearts\Shopper\Http\Controllers\Controller;
use Mckenziearts\Shopper\Plugins\Catalogue\Models\Product;
use Mckenziearts\Shopper\Plugins\Tags\Http\Requests\TagRequest;
use Mckenziearts\Shopper\Plugins\Tags\Models\TagRelation;
use Mckenziearts\Shopper\Plugins\Tags\Repositories\TagRepository;

class TagController extends Controller
{
    /**
     * @var TagRepository
     */
    private $repository;

    /**
     * TagController constructor.
     *
     * @param TagRepository $repository
     */
    public function __construct(TagRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $records = $this->repository->paginateList();

        return view('shopper::pages.tags.index', compact('records'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        $record = $this->repository->getModel();

        return view('shopper::pages.tags.form', compact('record'));
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit($id)
    {
        $record = $this->repository->find($id);

        return view('shopper::pages.tags.form', compact('record'));
    }

    /**
     * @param TagRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(TagRequest $request)
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
     * @param TagRequest $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(TagRequest $request, $id)
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
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(int $id)
    {
        $this->repository->delete($id);

        return redirect()
            ->route('shopper.tags.index')
            ->with('success', __('Record deleted successfully'));
    }

    /**
     * @param $id
     * @param int $tag_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function setProducts($id, int $tag_id)
    {
        $ids = explode(',', $id);
        foreach ($ids as $productId) {
            TagRelation::updateOrCreate([
                'taggable_type' => Product::class,
                'taggable_id'   => $productId,
                'tag_id'        => $tag_id
            ], ['tag_id'        => $tag_id]);
        }

        $response = [
            'status'    => 'success',
            'message'   => __('Product add successfuly'),
            'title'     => __('Saved')
        ];

        return response()->json($response);
    }

    /**
     * @param int $id
     * @return mixed
     */
    public function getProducts(int $id)
    {
        $record = $this->repository->find($id);

        $record->products->map(function ($item) {
            $item['brand_name'] = $item->getBrand();
            $item['category_name'] = $item->getCategory();
        });

        return $record->products;
    }

    /**
     * @param mixed     $id
     * @param int       $tag_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function removeProducts($id, int $tag_id)
    {
        $ids = explode(',', $id);
        TagRelation::where('tag_id', $tag_id)->whereIn('taggable_id', $ids)->delete();

        $response = [
            'status'    => 'success',
            'message'   => __('Product remove successfuly'),
            'title'     => __('Deleted')
        ];

        return response()->json($response);
    }
}
