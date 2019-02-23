<?php

namespace Mckenziearts\Shopper\Http\Core;

use Cartalyst\Sentinel\Laravel\Facades\Sentinel;

class Menu
{
    /**
     * The contents of the menu.
     *
     * @var
     */
    public $container;

    /**
     *  Position menu.
     *
     * @var
     */
    private $location;

    /**
     * Arguments menu form
     * For the transfer of Views.
     *
     * @var
     */
    private $arg;

    /**
     * Sort menu item.
     *
     * @var
     */
    private $sort;

    /**
     * Synthesis element.
     *
     * @var
     */
    private $item;

    /**
     * template menu.
     *
     * @var
     */
    private $template;

    /**
     * DashboardMenu constructor.
     */
    public function __construct()
    {
        $this->container = collect();
    }

    /**
     * Setting the menu position.
     *
     * @param $location
     * @return Menu
     */
    public function place(string $location) : self
    {
        $this->location = $location;

        return $this;
    }

    /**
     * @param $template
     * @return Menu
     */
    public function template(string $template) : self
    {
        $this->template = $template;

        return $this;
    }

    /**
     * @param array $arg
     * @return $this
     */
    public function with(array $arg) : self
    {
        $this->arg = $arg;

        return $this;
    }

    /**
     * @param $sort
     * @return Menu
     */
    public function sortBy(int $sort) : self
    {
        $this->sort = $sort;

        return $this;
    }

    /**
     * Adding a new element to the container.
     *
     * @param string $place
     * @param        $arg
     */
    public function add(string $place, array $arg)
    {
        if (array_key_exists('show', $arg) && ! $arg['show']) {
            return;
        }

        $arg = array_merge([
            'icon'    => 'icon-folder',
            'childs'  => false,
            'divider' => false,
            'sort'    => 0,
        ], $arg);

        $this->location = $place;
        $this->arg = $arg;
        $this->sort = $arg['sort'];

        $this->item = [
            'location' => $this->location,
            'arg'      => $this->arg,
            'sort'     => $this->sort,
        ];

        $this->container[$this->arg['slug']] = $this->item;
    }

    /**
     * Generate on the menu display.
     *
     * @param string      $location
     * @param string|null $template
     *
     * @return string
     */
    public function render(string $location, string $template = null) : string
    {
        $html = '';

        if (! isset($this->user)) {
            $this->user = Sentinel::check();
            $user = $this->user;
            /*$this->container = $this->container->filter(function ($item) use ($user) {
                return (isset($item['arg']['permission'])) ? $user->hasAccess($item['arg']['permission']) : true;
            });*/
        }

        foreach ($this->container->where('location', $location)->sortBy('sort') as $key => $value) {
            if (! array_key_exists('template', $value)) {
                $value['template'] = 'shopper::components.menu.mainMenu';
            }

            if (! is_null($template)) {
                $value['template'] = $template;
            }

            $html .= view($value['template'], collect($value['arg']));
        }

        return $html;
    }
}
