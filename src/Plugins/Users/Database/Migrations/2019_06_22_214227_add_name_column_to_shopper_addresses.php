<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddNameColumnToShopperAddresses extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasColumn('shopper_addresses', 'name')) {
            Schema::table('shopper_addresses', function (Blueprint $table) {
                $table->string('name')->after('active')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('shopper_addresses', 'name')) {
            Schema::table('shopper_addresses', function (Blueprint $table) {
                $table->dropColumn('name');
            });
        }
    }
}
