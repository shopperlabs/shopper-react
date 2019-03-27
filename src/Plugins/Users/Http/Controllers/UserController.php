<?php

namespace Mckenziearts\Shopper\Plugins\Users\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Mckenziearts\Shopper\Http\Controllers\Controller;
use Mckenziearts\Shopper\Plugins\Users\Http\Requests\UserRequest;
use Mckenziearts\Shopper\Plugins\Users\Models\User;
use Mckenziearts\Shopper\Plugins\Users\Repositories\UserRepository;
use Mckenziearts\Shopper\Repositories\MediaRepository;

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

        return view('shopper::pages.users.index', compact('records'));
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function create()
    {
        $record = $this->repository->getModel();

        return view('shopper::pages.users.form', compact('record'));
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function edit($id)
    {
        $record = $this->repository->find($id);

        return view('shopper::pages.users.form', compact('record'));
    }

    /**
     * @param UserRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(UserRequest $request)
    {
        $record = $this->repository->save($request->all());
        // Set relation between brand and media for preview image
        if (!is_null($request->input('image_id'))) {
            $media = $this->mediaRepository->find($request->input('image_id'));
            $media->update([
                'attachmentable_type'   => User::class,
                'attachmentable_id'     => $record->id
            ]);

            $record->update(['avatar' => asset('storage/uploads/public/'.$media->disk_name)]);
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

        $response = [
            'status'    => 'success',
            'message'   => __('Record updated successfuly'),
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
        return $this->repository->find($id, ['addresses', 'orders','transactions']);
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
                'redirect_url'  => route('shopper.users.index')
            ]);
        }

        return redirect()
            ->route('shopper.users.index')
            ->with('success', __('Record deleted successfully'));
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder[]|\Illuminate\Database\Eloquent\Collection
     */
    public function lists()
    {
        return $this->repository->all();
    }

    /**
     * @param int $id
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function orders(int $id)
    {
        $user = $this->repository->find($id, ['orders']);

        return $user->orders;
    }

    /**
     * @param int $id
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function addresses(int $id)
    {
        $user = $this->repository->find($id, ['addresses']);

        return $user->addresses;
    }

    /**
     * Impersonate user
     *
     * @return \Illuminate\Http\RedirectResponse
     */
    public function impersonate()
    {
        $user = $this->repository->getModel()->first();

        if ($user) {
            Auth::login($user);

            return redirect(url('/'))->with('status', __("Impersonate as {$user->name}"));
        } else {
            return redirect()->route('shopper.users.index')
                ->with('warning', __('There is no user you can impersonate'));
        }
    }

    /**
     * @param int $id
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function transactions(int $id)
    {
        return $this->repository->find($id, ['transactions'])->transactions;
    }
}
