<?php

use Illuminate\Database\Seeder;
use Mckenziearts\Shopper\Traits\Seedable;

class ShopperSeeder extends Seeder
{
    use Seedable;

    protected $seedersPath = __DIR__.'/';

    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->seed('RolesTableSeeder');
        $this->seed('StatusTableSeeder');
        $this->seed('CountriesTableSeeder');
        $this->seed('SettingsTableSeeder');
    }
}
