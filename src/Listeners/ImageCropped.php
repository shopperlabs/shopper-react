<?php

namespace Mckenziearts\Shopper\Listeners;

use Intervention\Image\Constraint;
use Intervention\Image\Facades\Image as InterventionImage;
use Mckenziearts\Shopper\Events\ImageResize;

class ImageCropped
{
    /**
     * @var string
     */
    private $path;

    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        $this->path = config('shopper.storage.uploads.path'). '/public/';
    }

    /**
     * @param ImageResize $event
     */
    public function handle(ImageResize $event)
    {
        $image = InterventionImage::make($event->file);
        $resize_width = $image->width();
        $resize_height = $image->height();

        $resize_quality = config('shopper.quality') ?? 75;

        if (config('shopper.thumbnails')) {
            foreach (config('shopper.thumbnails') as $thumbnail) {
                if ($thumbnail['name'] && array_key_exists('scale', $thumbnail)) {
                    $scale = intval($thumbnail['scale']) / 100;
                    $thumb_resize_width  = intval($resize_width * $scale);
                    $thumb_resize_height = intval($resize_height * $scale);

                    InterventionImage::make($event->file)->resize(
                        $thumb_resize_width,
                        $thumb_resize_height,
                        function (Constraint $constraint) {
                            $constraint->aspectRatio();
                            if (config('shopper.quality') && ! config('shopper.upsize')) {
                                $constraint->upsize();
                            }
                        }
                    )->encode($event->file->getClientOriginalExtension(), $resize_quality)
                    ->save($this->path . $event->filename .'-'. $thumbnail['name'] .'.'. $event->file->getClientOriginalExtension());

                } elseif ($thumbnail['name'] && $thumbnail['crop']) {
                    foreach ($thumbnail['crop'] as $key => $crop) {
                        if ($event->model && $key === $event->model) {
                            foreach ($crop as $size => $dimension) {
                                InterventionImage::make($event->file)->fit($dimension['width'], $dimension['height'])
                                    ->encode($event->file->getClientOriginalExtension(), $resize_quality)
                                    ->save($this->path . $event->filename .'-'. $thumbnail['name']. '-'. $size .'.'. $event->file->getClientOriginalExtension());
                            }
                        }
                    }
                }
            }
        }
    }
}
