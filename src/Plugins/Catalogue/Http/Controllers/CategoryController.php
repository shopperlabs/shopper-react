<?php

namespace Mckenziearts\Shopper\Plugins\Catalogue\Http\Controllers;

use Mckenziearts\Shopper\Http\Controllers\Controller;
use Mckenziearts\Shopper\Models\Media;
use Mckenziearts\Shopper\Plugins\Catalogue\Http\Requests\CategoryRequest;
use Mckenziearts\Shopper\Plugins\Catalogue\Models\Category;
use Mckenziearts\Shopper\Plugins\Catalogue\Repositories\CategoryRepository;
use Mckenziearts\Shopper\Repositories\MediaRepository;

class CategoryController extends Controller
{
    /**
     * @var CategoryRepository
     */
    private $repository;

    /**
     * @var MediaRepository
     */
    private $mediaRepository;

    /**
     * CategoryController constructor.
     *
     * @param CategoryRepository $repository
     * @param MediaRepository $mediaRepository
     */
    public function __construct(CategoryRepository $repository, MediaRepository $mediaRepository)
    {
        $this->repository = $repository;
        $this->mediaRepository = $mediaRepository;
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $records = $this->repository->paginateList();

        return view('shopper::pages.categories.index', compact('records'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        $record = $this->repository->getModel();

        return view('shopper::pages.categories.form', compact('record'));
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit($id)
    {
        $record = $this->repository->find($id, ['parent', 'childs']);

        return view('shopper::pages.categories.form', compact('record'));
    }

    /**
     * @param CategoryRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(CategoryRequest $request)
    {
        $record = $this->repository->save($request->all());

        // Set relation between brand and media for preview image
        if (!is_null($request->input('preview_image'))) {
            $media = $this->mediaRepository->find($request->input('preview_image'));
            $media->update([
                'attachmentable_type'   => Category::class,
                'attachmentable_id'     => $record->id
            ]);
        }

        // Set relation between brand and media for images gallery
        if (count($request->input('ids')) > 0) {
            foreach ($request->input('ids') as $id) {
                Media::where('id', $id)->update([
                    'attachmentable_type'   => Category::class,
                    'attachmentable_id'     => $record->id
                ]);
            }
        }

        $response = [
            'status'    => 'success',
            'message'   => __('Record saved successfuly'),
            'title'     => __('Saved')
        ];

        return response()->json($response);
    }

    /**
     * @param CategoryRequest $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(CategoryRequest $request, $id)
    {
        $this->repository->update($request->all(), $id);
        $record = $this->repository->find($id);

        // Set relation between brand and media for preview image
        if (!is_null($request->input('preview_image')) && !is_array($request->input('preview_image'))) {
            $media = $this->mediaRepository->find($request->input('preview_image'));

            if ($record->previewImage) {
                $record->previewImage()->delete();
                $media->update([
                    'attachmentable_type'   => Category::class,
                    'attachmentable_id'     => $record->id
                ]);
            }

            $media->update([
                'attachmentable_type'   => Category::class,
                'attachmentable_id'     => $record->id
            ]);
        }

        // Set relation between brand and media for images gallery
        if (count($request->input('ids')) > 0) {
            foreach ($request->input('ids') as $id) {
                Media::where('id', $id)->update([
                    'attachmentable_type'   => Category::class,
                    'attachmentable_id'     => $record->id
                ]);
            }
        }

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
        $record = $this->repository->find($id, ['previewImage', 'images']);

        if (!is_null($record->previewImage)) {
            return [
                'record'    => $record,
                'imageUrl'  => asset('storage/uploads/public/'.$record->previewImage->disk_name),
            ];
        }

        return [
            'record'    => $record,
            'imageUrl'  => null,
        ];
    }

    /**
     * Delete a record
     *
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(int $id)
    {
        try {
            $this->repository->delete($id);

            return redirect()
                ->route('shopper.catalogue.categories.index')
                ->with('success', __('Record deleted successfully'));

        } catch (\Exception $e) {
            return redirect()
                ->route('shopper.catalogue.categories.index')
                ->with('warning', $e->getMessage());
        }
    }

    /**
     * Return list of active records
     *
     * @param null $id
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function categoriesList($id = null)
    {
        return $this->repository->categoriesList($id);
    }

    /**
     * @param int $id
     * @return mixed
     */
    public function productsCategory(int $id)
    {
        $record = $this->repository->find($id);

        return $record->products;
    }
}
