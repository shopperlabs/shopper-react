<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shopper_orders', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned()->index();
            $table->integer('status_id')->nullable()->index();
            $table->string('order_number')->nullable()->index();
            $table->string('secret_key')->nullable();
            $table->decimal('total_price', 15, 2)->nullable();
            $table->decimal('shipping_price', 15, 2)->nullable();
            $table->integer('shipping_type_id')->nullable()->index();
            $table->integer('payment_method_id')->nullable()->index();
            $table->mediumText('property')->nullable();
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
        Schema::dropIfExists('shopper_orders');
    }
}
