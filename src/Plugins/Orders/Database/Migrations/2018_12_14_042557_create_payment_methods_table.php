<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePaymentMethodsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shopper_orders_payment_methods', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('active')->default(false);
            $table->string('name')->unique()->index();
            $table->string('code')->nullable()->index();
            $table->text('description')->nullable();
            $table->integer('sort_order')->nullable()->unsigned();
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
        Schema::dropIfExists('shopper_orders_payment_methods');
    }
}
