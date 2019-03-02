<?php

namespace Mckenziearts\Shopper\Traits;

use Illuminate\Support\Facades\Storage;

trait CheckTrait
{

    /**
     * Check disk name
     *
     * @param $name
     *
     * @return bool
     */
    public function checkDisk($name)
    {
        return in_array($name, config('shopper.storage.disk'))
            && array_key_exists($name, config('filesystems.disks'));
    }

    /**
     * Check Disk and Path
     *
     * @param $disk
     * @param $path
     *
     * @return bool
     */
    public function checkPath($disk, $path)
    {
        // check disk name
        if (!$this->checkDisk($disk)) {
            return false;
        }

        // check path
        if ($path && ! Storage::disk($disk)->exists($path)) {
            return false;
        }

        return true;
    }

    /**
     * Disk/path not found message
     *
     * @return array
     */
    public function notFoundMessage()
    {
        return [
            'result' => [
                'status'  => 'danger',
                'message' => __('Not Found!'),
            ],
        ];
    }
}
