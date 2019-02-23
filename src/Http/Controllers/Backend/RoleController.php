<?php

namespace Mckenziearts\Shopper\Http\Controllers\Backend;

use Mckenziearts\Shopper\Http\Controllers\Controller;
use Mckenziearts\Shopper\Repositories\RoleRepository;

class RoleController extends Controller
{
    /**
     * @var RoleRepository
     */
    private $repository;

    /**
     * RoleController constructor.
     *
     * @param RoleRepository $repository
     */
    public function __construct(RoleRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $records = $this->repository->paginateList();

        return view('shopper::pages.backend.roles.index', compact('records'));
    }

    /**
     * Return all roles
     *
     * @return \Illuminate\Database\Eloquent\Collection|static[]
     */
    public function lists()
    {
        return $this->repository->all();
    }
}
