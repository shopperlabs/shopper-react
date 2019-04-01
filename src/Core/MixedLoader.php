<?php

namespace Mckenziearts\Shopper\Core;

use Illuminate\Filesystem\Filesystem;
use Illuminate\Translation\FileLoader;

class MixedLoader extends FileLoader
{
    /**
     * Repository.
     *
     * @var \Mckenziearts\Shopper\Repositories\TranslationRepository
     */
    protected $repository;

    /**
     * Create a new file loader instance.
     *
     * @param \Illuminate\Filesystem\Filesystem $files
     * @param string                            $path
     *
     * @return null
     */
    public function __construct(Filesystem $files, $path)
    {
        parent::__construct( $files, $path);
        $this->path = $path;
        $this->files = $files;
    }

    /**
     * Load the messages strictly for the given locale.
     *
     * @param string $locale
     * @param string $group
     * @param string $namespace
     *
     * @return array
     */
    public function load($locale, $group, $namespace = null)
    {
        // Load from files
        if ($group == '*' && $namespace == '*') {
            return $this->loadJsonPaths($locale);
        }
        if (is_null($namespace) || $namespace == '*') {
            $translationsFromFiles = $this->loadPath($this->path, $locale, $group);
        } else {
            $translationsFromFiles = $this->loadNamespaced($locale, $group, $namespace);
        }
        // If group is 'db', get data from DB.
        $translationsFromDB = ($group == 'db') ? $this->loadFromDB($locale, $group, $namespace) : [];

        return array_merge($translationsFromFiles, $translationsFromDB);
    }

    /**
     * Load the messages from DB strictly for the given locale.
     *
     * @param string $group
     * @param string $namespace
     * @param string $locale
     *
     * @return array
     */
    public function loadFromDB($locale, $group, $namespace = null)
    {
        return $this->repository->allToArray($locale, $group, $namespace);
    }
}
