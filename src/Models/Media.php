<?php

namespace Mckenziearts\Shopper\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;

class Media extends Model
{
    /**
     * {@inheritDoc}
     */
    protected $table = 'shopper_medias';

    /**
     * {@inheritDoc}
     */
    protected $fillable = [
        'disk_name',
        'file_name',
        'file_size',
        'content_type',
        'field',
        'attachmentable_type',
        'attachmentable_id',
        'is_public',
        'sort_order'
    ];

    /**
     * @var array Known image extensions.
     */
    public $imageExtensions = ['jpg', 'jpeg', 'png'];

    /**
     * @var array Hidden fields from array/json access
     */
    protected $hidden = ['attachmentable_type', 'attachmentable_id', 'is_public', 'sort_order'];

    /**
     * Get all of the owning attachmentable models.
     *
     * @return \Illuminate\Database\Eloquent\Relations\MorphTo
     */
    public function attachmentable()
    {
        return $this->morphTo();
    }

    /**
     * If working with local storage, determine the absolute local path.
     */
    public function getLocalRootPath()
    {
        return config('filesystems.disks.local.root', storage_path('app'));
    }

    /**
     * Define the public address for the storage path.
     */
    public function getPublicPath()
    {
        $uploadsPath = config('shopper.storage.uploads.folder', 'uploads');

        if ($this->isPublic()) {
            $uploadsPath .= '/public';
        } else {
            $uploadsPath .= '/protected';
        }

        return Url::asset('/storage/' . $uploadsPath) . '/';
    }

    /**
     * Define the internal storage path.
     */
    public function getStorageDirectory()
    {
        $uploadsFolder = config('shopper.storage.uploads.folder');

        if ($this->isPublic()) {
            return $uploadsFolder . '/public/';
        }

        return $uploadsFolder . '/protected/';
    }

    /**
     * Determines if the file is flagged "public" or not.
     */
    public function isPublic()
    {
        if (array_key_exists('is_public', $this->attributes)) {
            return $this->attributes['is_public'];
        }

        if (isset($this->is_public)) {
            return $this->is_public;
        }

        return true;
    }

    /**
     * @param string $path
     * @return bool
     */
    public function createDirectory(string $path)
    {
        $filesystem = config('shopper.storage.disk');

        if (!Storage::disk($filesystem)->exists($path)) {
            Storage::disk($filesystem)->makeDirectory($path);
            return true;
        }

        return false;
    }

    /**
     * Setup storage symlink
     *
     * @return bool
     */
    public function checkStorageSymlik()
    {
        if (!Storage::disk('local')->exists(public_path('storage'))) {
            App::make('files')->link(storage_path('app'), public_path('storage'));
            return true;
        } else {
            return false;
        }
    }
}
