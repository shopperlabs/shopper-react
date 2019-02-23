<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShopperAddresses extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shopper_addresses', function (Blueprint $table) {
            $table->increments('id');
            $table->unsignedInteger('user_id')->index()->nullable();
            $table->boolean('active')->default(false);
            $table->unsignedInteger('country_id')->index();
            $table->unsignedInteger('state_id')->index();
            $table->string('city');
            $table->string('street');
            $table->string('phone_number');
            $table->string('post_code')->nullable();
            $table->string('address')->nullable();
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
        Schema::dropIfExists('shopper_addresses');
    }
}
