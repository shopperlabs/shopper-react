<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use Mckenziearts\Shopper\Plugins\Catalogue\Models\Size;

class SizesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (Schema::hasTable('shopper_media_sizes')) {
            $sizesList = [
                ['name' => 'Size 900x566', 'dimension' => '900x566'],
                ['name' => 'Size 870x484', 'dimension' => '870x484'],
                ['name' => 'Size 860x260', 'dimension' => '860x260'],
                ['name' => 'Size 812x430', 'dimension' => '812x430'],
                ['name' => 'Size 750x563', 'dimension' => '750x563'],
                ['name' => 'Size 566x273', 'dimension' => '566x273'],
                ['name' => 'Size 300x204', 'dimension' => '300x204'],
                ['name' => 'Size 273x273', 'dimension' => '273x273'],
                ['name' => 'Size 1920x900', 'dimension' => '1920x900'],
                ['name' => 'Size 1920x550', 'dimension' => '1920x550'],
                ['name' => 'Size 1920x650', 'dimension' => '1920x650'],
                ['name' => 'Size 1920x563', 'dimension' => '1920x563'],
                ['name' => 'Size 1016x532', 'dimension' => '1016x532'],
                ['name' => 'Size 1300x260', 'dimension' => '1300x260'],
                ['name' => 'Size 1126x440', 'dimension' => '1126x440'],
            ];

            foreach ($sizesList as $size) {
                Size::create($size);
            }
        }
    }
}
