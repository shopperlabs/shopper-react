<?php

use \Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use Mckenziearts\Shopper\Plugins\Orders\Models\Status;

class StatusTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        if (Schema::hasTable('shopper_orders_statuses')) {
            $statusList = [
                [
                    'code' => Status::STATUS_NEW,
                    'name' => 'New',
                    'sort_order' => 1
                ], [
                    'code' => Status::STATUS_IN_PROGRESS,
                    'name' => 'In progress',
                    'sort_order' => 2
                ], [
                    'code' => Status::STATUS_COMPETE,
                    'name' => 'Complete',
                    'sort_order' => 3
                ], [
                    'code' => Status::STATUS_CANCELED,
                    'name' => 'Canceled',
                    'sort_order' => 4
                ],
                [
                    'code' => Status::STATUS_PAID,
                    'name' => 'Paid',
                    'sort_order' => 5
                ],

            ];

            foreach ($statusList as $statusData) {
                Status::create($statusData);
            }
        }
    }
}
