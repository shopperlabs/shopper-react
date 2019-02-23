<?php

namespace Mckenziearts\Shopper\Traits;

trait Resize
{
    /**
     * Method for returning specific thumbnail for model.
     *
     * @param string $type
     * @param string|null $size
     * @return string
     */
    public function thumbnail($type, string $size = null)
    {
        $image = $this->previewImage->disk_name;

        $extension = pathinfo($image, PATHINFO_EXTENSION);
        $name = str_replace_last('.'. $extension, '', $image);

        if ($type === 'cropped' && $size) {
            $filename = $name .'-'. $type .'-'. $size .'.'. $extension;

            return shopperAsset($filename);
        }

        $filename = $name .'-'. $type .'.'. $extension;

        return shopperAsset($filename);
    }

    /**
     * Return full url for the preview image
     *
     * @return string
     */
    public function getImageUrl()
    {
        if ($this->previewImage) {
            return shopperAsset($this->previewImage->disk_name);
        }

        return null;
    }
}
