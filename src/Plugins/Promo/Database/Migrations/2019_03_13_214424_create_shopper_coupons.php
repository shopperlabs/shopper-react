<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShopperCoupons extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shopper_coupons', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('active')->default(0);
            $table->string('name')->unique()->index();
            $table->integer('value');
            $table->string('type');
            $table->string('code')->index();
            $table->dateTime('date_begin');
            $table->dateTime('date_end')->nullable();
            $table->integer('usage_limit')->nullable();
            $table->integer('usage_limit_per_user')->nullable();
            $table->text('preview_text')->nullable();
            $table->longText('description')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shopper_coupons');
    }
}
