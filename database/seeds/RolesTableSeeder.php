<?php

use Illuminate\Database\Seeder;
use Mckenziearts\Shopper\Models\Sentinel\EloquentRole;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        EloquentRole::create([
            'name' => 'Developer',
            'slug'  => str_slug('Developer'),
            'description'   => __('Site administrator with access to developer tools.')
        ]);

        EloquentRole::create([
            'name' => 'Publisher',
            'slug'  => str_slug('Publisher'),
            'description'   => __('Site editor with access to publishing tools.')
        ]);
    }
}
