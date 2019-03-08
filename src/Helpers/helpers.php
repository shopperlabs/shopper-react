<?php

use Money\Currencies\ISOCurrencies;
use Money\Currency;
use Money\Formatter\IntlMoneyFormatter;
use Money\Money;

if (! function_exists('setEnvironmentValue')) {
    /**
     * Function to set or update .env variable
     *
     * @param array $values
     * @return bool
     */
    function setEnvironmentValue(array $values)
    {
        $envFile = app()->environmentFilePath();
        $str = file_get_contents($envFile);

        if (count($values) > 0) {
            $str .= "\n"; // In case the searched variable is in the last line without \n
            foreach ($values as $envKey => $envValue) {
                $envKey = strtoupper($envKey);
                $keyPosition = strpos($str, "{$envKey}=");
                $endOfLinePosition = strpos($str, "\n", $keyPosition);
                $oldLine = substr($str, $keyPosition, $endOfLinePosition - $keyPosition);
                $space = strpos($envValue, ' ');
                $envValue = ($space === false) ? $envValue : '"' . $envValue . '"';

                // If key does not exist, add it
                if (!$keyPosition || !$endOfLinePosition || !$oldLine) {
                    $str .= "{$envKey}={$envValue}\n";
                } else {
                    $str = str_replace($oldLine, "{$envKey}={$envValue}", $str);
                }
            }
        }

        $str = substr($str, 0, -1);

        if (!file_put_contents($envFile, $str)) {
            return false;
        }

        return true;
    }
}

if (! function_exists('shopperAsset')) {
    /**
     * Return fullpath of an image
     *
     * @param string $filename
     * @return string
     */
    function shopperAsset(string $filename)
    {
        return (new \Mckenziearts\Shopper\Models\Media())->getPublicPath() . $filename;
    }
}

if (! function_exists('setting')) {
    /**
     * Return a value of a setting
     *
     * @param string $value
     * @return mixed
     */
    function setting(string $value)
    {
        return (new \Mckenziearts\Shopper\Models\Setting())->get($value);
    }
}

if (! function_exists('shopperMoney')) {
    /**
     * Return money format
     *
     * @param mixed     $amount
     * @param string    $currency
     * @return string
     */
    function shopperMoney($amount, $currency)
    {
        if (in_array($currency, ['XAF'])) {
            $money = new Money($amount, new Currency($currency));
            $currencies = new ISOCurrencies();

            $numberFormatter = new \NumberFormatter(app()->getLocale(), \NumberFormatter::CURRENCY);
            $moneyFormatter = new IntlMoneyFormatter($numberFormatter, $currencies);

            return $moneyFormatter->format($money);
        } else {
            return moneyFormat($amount, $currency);
        }
    }
}
