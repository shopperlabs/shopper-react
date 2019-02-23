<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShopperLocationStates extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shopper_location_states', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('country_id')->index();
            $table->string('name')->index();
            $table->string('code');
            $table->timestamps();

            $table->foreign('country_id')
                ->references('id')
                ->on('shopper_location_countries')
                ->onDelete('cascade');

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
        Schema::dropIfExists('shopper_location_states');
    }
}
