<?php

namespace Mckenziearts\Shopper\Plugins\Orders\Helpers;

use Mckenziearts\Shopper\Traits\Singleton;

class PriceHelper
{
    use Singleton;

    /**
     * @var int
     */
    protected $decimal = 2;

    /**
     * @var string
     */
    protected $decPoint = '.';

    /**
     * @var string
     */
    protected $thousandsSep = ' ';

    /**
     * Apply custom format for price float value
     *
     * @param float $price
     * @return string
     */
    public static function format($price)
    {
        $price = (float) $price;

        $instance = self::instance();

        return number_format($price, $instance->decimal, $instance->decPoint, $instance->thousandsSep);
    }

    /**
     * Convert price string to float value
     *
     * @param string $value
     * @return float
     */
    public static function toFloat($value)
    {
        $value = str_replace(',', '.', $value);
        $price = (float) preg_replace("/[^0-9\.]/", "", $value);

        return $price;
    }

    /**
     * Round float price value
     *
     * @param float $price
     * @return  float
     */
    public static function round($price)
    {
        return round($price, 2);
    }
}
