<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOfferOrderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shopper_orders_offer_order', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('offer_id')->index();
            $table->unsignedInteger('order_id')->index();
            $table->decimal('price', 15, 2)->nullable();
            $table->decimal('old_price', 15, 2)->nullable();
            $table->integer('quantity')->unsigned()->nullable();
            $table->string('code')->nullable();
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
        Schema::dropIfExists('shopper_orders_offer_order');
    }
}
