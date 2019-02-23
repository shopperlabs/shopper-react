<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStatusesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shopper_orders_statuses', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->unique()->index();
            $table->string('code')->nullable()->index();
            $table->text('description')->nullable();
            $table->boolean('is_user_show')->default(true);
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
        Schema::dropIfExists('shopper_orders_statuses');
    }
}
