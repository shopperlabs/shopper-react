<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateShopperCouponsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (!Schema::hasColumn('shopper_coupons', 'min_value')) {
            Schema::table('shopper_coupons', function (Blueprint $table) {
                $table->integer('min_value')->nullable()->after('value');
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
        if (Schema::hasColumn('shopper_coupons', 'min_value')) {
            Schema::table('shopper_coupons', function (Blueprint $table) {
                $table->dropColumn('min_value');
            });
        }
    }
}
