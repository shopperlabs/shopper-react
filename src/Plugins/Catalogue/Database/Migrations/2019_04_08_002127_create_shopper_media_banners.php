<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShopperMediaBanners extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shopper_media_banners', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedInteger('size_id')->nullable()->index();
            $table->string('code', '50')->unique()->index();
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->string('text_position')->nullable();
            $table->decimal('price', '15', '2')->nullable();
            $table->string('button_text')->nullable();
            $table->string('button_icon')->nullable();
            $table->string('link_type')->nullable();
            $table->string('link_url')->nullable();
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
        Schema::dropIfExists('shopper_media_banners');
    }
}
