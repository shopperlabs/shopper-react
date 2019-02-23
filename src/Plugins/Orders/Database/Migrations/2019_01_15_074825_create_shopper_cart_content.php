<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShopperCartContent extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shopper_cart_content', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('cart_id')->unsigned()->index()->default(0);
            $table->integer('offer_id')->unsigned()->index()->default(0);
            $table->integer('quantity')->unsigned()->default(0);
            $table->timestamps();

            $table->engine = 'InnoDB';
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shopper_cart_content');
    }
}
