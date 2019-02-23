<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShopperTags extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shopper_tags', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('active')->default(false);
            $table->string('name')->unique()->index();
            $table->string('slug')->unique()->index();
            $table->text('preview_text')->nullable();
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
        Schema::dropIfExists('shopper_tags');
    }
}
