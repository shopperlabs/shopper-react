<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShopperReviews extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shopper_catalogue_reviews', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('active')->default(false);
            $table->integer('user_id')->unsigned()->index();
            $table->integer('product_id')->unsigned()->index();
            $table->integer('rate')->default(1);
            $table->text('comment')->nullable();
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
        Schema::dropIfExists('shopper_reviews');
    }
}
