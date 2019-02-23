<?php

use Illuminate\Database\Seeder;
use Mckenziearts\Shopper\Models\Setting;

class SettingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $settings = [
            ['key'   => 'site_address', 'value' => ''],
            ['key'   => 'site_description', 'value' => ''],
            ['key'   => 'site_email', 'value' => 'contact@laravel-shopper.com'],
            ['key'   => 'site_keywords', 'value' => implode(', ', ['store', 'shopper', 'e-commerce', 'shopping'])],
            ['key'   => 'site_currency', 'value' => 'XAF'],
            ['key'   => 'site_phone', 'value' => ''],
            ['key'   => 'site_title', 'value' => 'Shopper Market']
        ];

        foreach ($settings as $setting) {
            Setting::firstOrCreate(['key' => $setting['key']], [
                'key'   => $setting['key'],
                'value' => $setting['value'],
            ]);
        }
    }
}
