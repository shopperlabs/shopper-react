<?php

namespace Mckenziearts\Shopper\Events;

use Illuminate\Queue\SerializesModels;
use \Illuminate\Http\UploadedFile;

class ImageResize
{
    use SerializesModels;

    /**
     * @var UploadedFile
     */
    public $file;

    /**
     * @var string
     */
    public $filename;

    /**
     * @var string
     */
    public $model;

    /**
     * ImageResize constructor.
     *
     * @param UploadedFile $file
     * @param string $filename
     * @param string $model
     */
    public function __construct(UploadedFile $file, string $filename, string $model = null)
    {
        $this->file = $file;
        $this->filename = $filename;
        $this->model = $model;
    }
}
