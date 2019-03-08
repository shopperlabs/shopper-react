<?php

namespace Mckenziearts\Shopper\Http\Controllers\Backend;

use Cartalyst\Sentinel\Laravel\Facades\Sentinel;
use Mckenziearts\Shopper\Http\Controllers\Controller;
use Mckenziearts\Shopper\Http\Requests\ProfileRequest;
use Mckenziearts\Shopper\Http\Requests\UserRequest;
use Mckenziearts\Shopper\Models\Sentinel\EloquentUser;
use Mckenziearts\Shopper\Notifications\UserCredentials;
use Mckenziearts\Shopper\Repositories\MediaRepository;
use Mckenziearts\Shopper\Repositories\UserRepository;
use Thomaswelton\LaravelGravatar\Facades\Gravatar;

class UserController extends Controller
{
    /**
     * @var UserRepository
     */
    private $repository;

    /**
     * @var MediaRepository
     */
    private $mediaRepository;

    /**
     * UserController constructor.
     *
     * @param UserRepository $repository
     * @param MediaRepository $mediaRepository
     */
    public function __construct(UserRepository $repository, MediaRepository $mediaRepository)
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

        return view('shopper::pages.backend.users.index', compact('records'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        $record = $this->repository->getModel();

        return view('shopper::pages.backend.users.form', compact('record'));
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit($id)
    {
        $record = $this->repository->find($id);

        return view('shopper::pages.backend.users.form', compact('record'));
    }

    /**
     * @param UserRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(UserRequest $request)
    {
        $record = $this->repository->save($request->all());

        // Set relation between brand and media for preview image
        if (! is_null($request->input('image_id'))) {
            $media = $this->mediaRepository->find($request->input('image_id'));
            $media->update([
                'attachmentable_type'   => EloquentUser::class,
                'attachmentable_id'     => $record->id
            ]);

            $record->update(['avatar' => asset('storage/uploads/public/'.$media->disk_name)]);
        }

        // Set Role to the User
        $role = Sentinel::findRoleById($request->input('role'));
        $role->users()->attach($record);

        if (count($request->input('send_mail')) > 0) {
            // Send email to user with credentials
            $record->notify(new UserCredentials($request->input('password')));
        }

        $response = [
            'status'    => 'success',
            'message'   => __('Record saved successfuly'),
            'title'     => __('Saved')
        ];

        return response()->json($response);
    }

    /**
     * @param UserRequest $request
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UserRequest $request, $id)
    {
        $this->repository->update($request->all(), $id);
        $record = $this->repository->find($id);

        // Set relation between brand and media for preview image
        if (! is_null($request->input('image_id'))) {
            $record->previewImage()->delete();
            $media = $this->mediaRepository->find($request->input('image_id'));
            $media->update([
                'attachmentable_type'   => EloquentUser::class,
                'attachmentable_id'     => $record->id
            ]);

            $record->update(['avatar' => asset('storage/uploads/public/'.$media->disk_name)]);
        }

        // Remove user current role
        $record->roles()->detach();
        // Update user a new role
        $role = Sentinel::findRoleById($request->input('role'));
        $role->users()->attach($record);

        $response = [
            'status'    => 'success',
            'message'   => __('User updated successfuly'),
            'title'     => __('Updated')
        ];

        return response()->json($response);
    }

    /**
     * @param int $id
     * @return \Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model|UserRepository|UserRepository[]
     */
    public function show(int $id)
    {
        $record = $this->repository->find($id, ['previewImage']);
        $record->role = $record->getRole();

        if (! is_null($record->previewImage)) {
            return [
                'record'    => $record,
                'imageUrl'  => asset('storage/uploads/public/'.$record->previewImage->disk_name),
            ];
        }

        return [
            'record'    => $record,
            'imageUrl'  => Gravatar::src($record->email, 150),
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
        $this->repository->delete($id);

        return redirect()
            ->route('shopper.settings.backend.users.index')
            ->with('success', __('Record deleted successfully'));
    }

    /**
     * Display User account profile
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function profile()
    {
        return view('shopper::pages.backend.users.profile');
    }

    /**
     * @param ProfileRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function saveProfile(ProfileRequest $request)
    {
        $record = $this->repository->updateProfile($request->all(), $request->input('id'));

        // Set relation between user and media for preview image
        if (! is_null($request->input('image_id'))) {
            $record->previewImage()->delete();
            $media = $this->mediaRepository->find($request->input('image_id'));
            $media->update([
                'attachmentable_type'   => EloquentUser::class,
                'attachmentable_id'     => $record->id
            ]);

            $record->update(['avatar' => asset('storage/uploads/public/'.$media->disk_name)]);
        }

        $response = [
            'status'    => 'success',
            'message'   => __('Your profile been updated successfuly'),
            'title'     => __('Updated Profile')
        ];

        return response()->json($response);
    }
}
