<?php

namespace Mckenziearts\Shopper\Plugins\Catalogue\Http\Controllers;

use Illuminate\Http\Request;
use Mckenziearts\Shopper\Http\Controllers\Controller;
use Mckenziearts\Shopper\Models\Media;
use Mckenziearts\Shopper\Plugins\Catalogue\Http\Requests\BannerRequest;
use Mckenziearts\Shopper\Plugins\Catalogue\Models\Banner;
use Mckenziearts\Shopper\Plugins\Catalogue\Repositories\BannerRepository;
use Mckenziearts\Shopper\Repositories\MediaRepository;

class BannerController extends Controller
{
    /**
     * @var BannerRepository
     */
    private $repository;

    /**
     * @var MediaRepository
     */
    private $mediaRepository;

    public function __construct(BannerRepository $repository, MediaRepository $mediaRepository)
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

        return view('shopper::pages.banners.index', compact('records'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        $record = $this->repository->getModel();

        return view('shopper::pages.banners.form', compact('record'));
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit($id)
    {
        $record = $this->repository->find($id, ['image', 'backgroundImage']);

        return view('shopper::pages.banners.form', compact('record'));
    }

    /**
     * @param BannerRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(BannerRequest $request)
    {
        $record = $this->repository->save($request->all());

        // Set relation between brand and media for image
        if (! is_null($request->input('image'))) {
            $media = Media::find($request->input('image'));
            $media->attachmentable_type = Banner::class;
            $media->attachmentable_id   = $record->id;
            $media->save();
        }

        // Set relation between brand and media for background image
        if (! is_null($request->input('backgroundImage'))) {
            $media = Media::find($request->input('backgroundImage'));
            $media->attachmentable_type = Banner::class;
            $media->attachmentable_id   = $record->id;
            $media->save();
        }


        $response = [
            'status'    => 'success',
            'message'   => __('Record saved successfuly'),
            'title'     => __('Saved')
        ];

        return response()->json($response);
    }

    /**
     * @param BannerRequest $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(BannerRequest $request, $id)
    {
        $this->repository->update($request->all(), $id);
        $record = $this->repository->find($id);

        // Set relation between brand and media for image
        if (!is_null($request->input('image')) && ! is_array($request->input('image'))) {
            $media = Media::find($request->input('image'));

            if ($record->image) {
                $record->image()->delete();
                $media->attachmentable_type = Banner::class;
                $media->attachmentable_id   = $record->id;
                $media->save();
            }

            $media->attachmentable_type = Banner::class;
            $media->attachmentable_id   = $record->id;
            $media->save();
        }

        // Set relation between brand and media for background image
        if (!is_null($request->input('backgroundImage')) && ! is_array($request->input('backgroundImage'))) {
            $media = Media::find($request->input('backgroundImage'));

            if ($record->backgroundImage) {
                $record->backgroundImage()->delete();
                $media->attachmentable_type = Banner::class;
                $media->attachmentable_id   = $record->id;
                $media->save();
            }

            $media->attachmentable_type = Banner::class;
            $media->attachmentable_id   = $record->id;
            $media->save();
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
        $record = $this->repository->find($id, ['image', 'backgroundImage']);

        if (! is_null($record->image) && ! is_null($record->backgroundImage)) {
            return [
                'record'    => $record,
                'imageUrl'  => asset('storage/uploads/public/'.$record->image->disk_name),
                'backgroundImageUrl'  => asset('storage/uploads/public/'.$record->backgroundImage->disk_name),
            ];
        } elseif (! is_null($record->image) && is_null($record->backgroundImage)) {
            return [
                'record'    => $record,
                'imageUrl'  => asset('storage/uploads/public/'.$record->image->disk_name),
                'backgroundImageUrl'  => null,
            ];
        } elseif (is_null($record->image) && ! is_null($record->backgroundImage)) {
            return [
                'record'    => $record,
                'imageUrl'  => null,
                'backgroundImageUrl'  => asset('storage/uploads/public/'.$record->backgroundImage->disk_name),
            ];
        }

        return [
            'record'    => $record,
            'imageUrl'  => null,
            'backgroundImageUrl'  => null,
        ];
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
        try {
            $this->repository->delete($id);

            if ($request->ajax()) {
                return response()->json([
                    'status'  => 'ok',
                    'redirect_url'  => route('shopper.catalogue.banners.index')
                ]);
            }

            return redirect()
                ->route('shopper.catalogue.banners.index')
                ->with('success', __('Record deleted successfully'));

        } catch (\Exception $e) {
            return redirect()
                ->route('shopper.catalogue.banners.index')
                ->with('warning', $e->getMessage());
        }
    }
}
