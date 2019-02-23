<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShopperLocationCountries extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shopper_location_countries', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('is_enabled')->default(false);
            $table->string('name')->index();
            $table->string('code');
            $table->string('iso_3', 3)->nullable();
            $table->string('calling_code', 3)->nullable();
            $table->string('flag', 6)->nullable();
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
        Schema::dropIfExists('shopper_location_countries');
    }
}
