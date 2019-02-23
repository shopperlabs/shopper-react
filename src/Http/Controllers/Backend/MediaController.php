<?php

namespace Mckenziearts\Shopper\Http\Controllers\Backend;

use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;
use Mckenziearts\Shopper\Events\ImageResize;
use Mckenziearts\Shopper\Http\Controllers\Controller;
use Mckenziearts\Shopper\Repositories\MediaRepository;

class MediaController extends Controller
{
    /**
     * @var MediaRepository
     */
    private $repository;

    /**
     * @var string
     */
    private $uploadsFolder;

    /**
     * MediaController constructor.
     *
     * @param MediaRepository $repository
     */
    public function __construct(MediaRepository $repository)
    {
        $this->repository = $repository;
        $this->uploadsFolder = config('shopper.storage.uploads.folder');
    }

    /**
     * Upload single file and save to database
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function uploader(Request $request)
    {
        if ($request->file('file')) {
            $field = $request->input('field');
            $file  = $request->file('file');
            $name = str_slug(explode('.', $file->getClientOriginalName())[0]). '-' .time();
            $filename = $name . '.' . $file->getClientOriginalExtension();

            $fileManager = $this->repository->getModel();
            $fileManager->createDirectory($this->uploadsFolder);
            $fileManager->createDirectory($this->uploadsFolder. '/public');
            $destinationFolder = config('shopper.storage.uploads.path'). '/public/';

            $image = Image::make($file);
            $image->save($destinationFolder . $filename);

            event(new ImageResize($request->file('file'), $name, $request->input('model')));

            // save file information to database
            $data = [
                'disk_name'     => $filename,
                'file_name'     => $file->getClientOriginalName(),
                'file_size'     => $file->getSize(),
                'content_type'  => $file->getClientMimeType(),
                'field'         => $field,
                'is_public'     => true
            ];

            $media = $this->repository->store($data);

            $response = [
                'status'   => 'success',
                'message'  => __('File successfull uploaded'),
                'url'      => asset('storage/uploads/public/'.$filename),
                'id'       => $media->id,
                'name'     => $filename,
            ];

            return response()->json($response);
        }
    }
}
