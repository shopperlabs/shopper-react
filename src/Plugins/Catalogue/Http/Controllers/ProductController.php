<?php

namespace Mckenziearts\Shopper\Plugins\Catalogue\Http\Controllers;

use Illuminate\Http\Request;
use Mckenziearts\Shopper\Core\SendTo;
use Mckenziearts\Shopper\Http\Controllers\Controller;
use Mckenziearts\Shopper\Models\Media;
use Mckenziearts\Shopper\Plugins\Catalogue\Http\Requests\ProductRequest;
use Mckenziearts\Shopper\Plugins\Catalogue\Models\Category;
use Mckenziearts\Shopper\Plugins\Catalogue\Models\Product;
use Mckenziearts\Shopper\Plugins\Catalogue\Models\ProductRelation;
use Mckenziearts\Shopper\Plugins\Catalogue\Repositories\ProductRepository;
use Mckenziearts\Shopper\Repositories\MediaRepository;

class ProductController extends Controller
{
    /**
     * @var ProductRepository
     */
    private $repository;

    /**
     * @var MediaRepository
     */
    private $mediaRepository;

    /**
     * ProductController constructor.
     *
     * @param ProductRepository $repository
     * @param MediaRepository $mediaRepository
     */
    public function __construct(ProductRepository $repository, MediaRepository $mediaRepository)
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

        return view('shopper::pages.products.index', compact('records'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        $record = $this->repository->getModel();

        return view('shopper::pages.products.form', compact('record'));
    }

    /**
     * @param int $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit(int $id)
    {
        $record = $this->repository->find($id);

        return view('shopper::pages.products.form', compact('record'));
    }

    /**
     * @param ProductRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(ProductRequest $request)
    {
        $record = $this->repository->save($request->all());

        // Set relation between brand and media for preview image
        if (!is_null($request->input('preview_image'))) {
            $media = $this->mediaRepository->find($request->input('preview_image'));
            $media->update([
                'attachmentable_type'   => Product::class,
                'attachmentable_id'     => $record->id
            ]);
        }

        // Set relation between brand and media for images gallery
        if (count($request->input('ids')) > 0) {
            foreach ($request->input('ids') as $id) {
                Media::where('id', $id)->update([
                    'attachmentable_type'   => Product::class,
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
     * @param ProductRequest $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(ProductRequest $request, $id)
    {
        $categoriesIds = [];

        $this->repository->update($request->all(), $id);
        $record = $this->repository->find($id);

        if (count($request->input('additionnalsCategories')) > 0) {
            foreach ($request->input('additionnalsCategories') as $categoryName) {
                $category = Category::where('name', '=', $categoryName)->first();
                array_push($categoriesIds, $category->id);
            }

            $record->categories()->sync($categoriesIds);
        }


        // Set relation between brand and media for preview image
        if (!is_null($request->input('preview_image')) && !is_array($request->input('preview_image'))) {
            $media = $this->mediaRepository->find($request->input('preview_image'));

            if ($record->previewImage) {
                $record->previewImage()->delete();
                $media->update([
                    'attachmentable_type'   => Product::class,
                    'attachmentable_id'     => $record->id
                ]);
            }

            $media->update([
                'attachmentable_type'   => Product::class,
                'attachmentable_id'     => $record->id
            ]);
        }

        // Set relation between brand and media for images gallery
        if (count($request->input('ids')) > 0) {
            foreach ($request->input('ids') as $id) {
                Media::where('id', $id)->update([
                    'attachmentable_type'   => Product::class,
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
        $record = $this->repository->find($id, ['previewImage', 'images', 'categories']);

        if (! is_null($record->previewImage)) {
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
                    'redirect_url'  => route('shopper.catalogue.products.index')
                ]);
            }

            return redirect()
                ->route('shopper.catalogue.products.index')
                ->with('success', __('Record deleted successfully'));

        } catch (\Exception $e) {
            return redirect()
                ->route('shopper.catalogue.products.index')
                ->with('warning', $e->getMessage());
        }
    }

    /**
     * Return list of product's offers
     *
     * @param int $id
     * @return mixed
     */
    public function productOffers(int $id)
    {
        $record = $this->repository->find($id);

        return $record->offers;
    }

    /**
     * Return list of active records
     *
     * @param int $id
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function lists(int $id = null)
    {
        if ($id) {
            $products = $this->repository->active()->with(['brand', 'category'])->where('id', '<>', $id)->get();
        } else {
            $products = $this->repository->active()->get();
        }

        return $products;
    }

    /**
     * @param int $id
     * @return mixed
     */
    public function relatedProducts(int $id)
    {
        $relations = ProductRelation::select('item_id')->where('product_id', $id)->get();
        $relatedProducts = collect();
        foreach ($relations as $relation) {
            $product = Product::find($relation->item_id);
            $relatedProducts->push($product);
        }

        $relatedProducts->map(function ($item) {
            $item['brand_name'] = $item->getBrand();
            $item['category_name'] = $item->getCategory();
        });

        return $relatedProducts;
    }

    /**
     * @param $id
     * @param int $product_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function setRelatedProduct($id, int $product_id)
    {
        $ids = explode(',', $id);
        foreach ($ids as $relatedId) {
            ProductRelation::create([
                'product_id' => $product_id,
                'item_id'    => $relatedId,
                'item_type'  => Product::class
            ]);
        }

        $response = [
            'status'    => 'success',
            'message'   => __('Related product add successfuly'),
            'title'     => __('Saved')
        ];

        return response()->json($response);
    }

    /**
     * @param $id
     * @param int $product_id
     * @return \Illuminate\Http\JsonResponse
     */
    public function removeRelatedProducts($id, int $product_id)
    {
        $ids = explode(',', $id);
        ProductRelation::where('product_id', $product_id)->whereIn('id', $ids)->delete();

        $response = [
            'status'    => 'success',
            'message'   => __('Related product remove successfuly'),
            'title'     => __('Deleted')
        ];

        return response()->json($response);
    }

    /**
     * Publish product to Facebook
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function facebook(int $id)
    {
        $record = $this->repository->find($id, ['previewImage', 'images']);
        $backLine = "\n\n";
        $html = $record->name . $backLine;
        $html .= str_limit($record->preview_text, 150) . $backLine;
        $html .= __('Available now on our website. Follow the link') . $backLine;
        $html .= url('/');

        try {
            SendTo::Facebook(
                'photo',
                [
                    'photo' => public_path('storage/uploads/public/'.$record->previewImage->disk_name),
                    'message' => $html
                ]
            );

            $response = [
                'status'    => 'success',
                'message'   => __('Record successfuly share on your Facebook page'),
                'title'     => __('Facebook Post')
            ];

            return response()->json($response);
        } catch (\Exception $e) {
            $response = [
                'status'    => 'error',
                'message'   => $e->getMessage(),
                'title'     => __('Facebook Post Error')
            ];

            return response()->json($response);
        }
    }

    /**
     * Publish product to Twitter
     *
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function twitter(int $id)
    {
        $record = $this->repository->find($id, ['previewImage', 'images']);
        $backLine = "\n\n";
        $html = $record->name . $backLine;
        $html .= str_limit($record->preview_text, 150) . $backLine;
        $html .= __('Available now on our website. Follow the link') . $backLine;
        $html .= url('/');

        try {
            SendTo::Twitter($html, [
                public_path('storage/uploads/public/'.$record->previewImage->disk_name)
            ]);

            $response = [
                'status'    => 'success',
                'message'   => __('Record successfuly share on your Twitter account'),
                'title'     => __('Twitter Post')
            ];

            return response()->json($response);
        } catch (\Exception $e) {
            $response = [
                'status'    => 'error',
                'message'   => $e->getMessage(),
                'title'     => __('Twitter Post Error')
            ];

            return response()->json($response);
        }
    }
}
