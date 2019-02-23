<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShopperMediasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shopper_medias', function (Blueprint $table) {
            $table->increments('id');
            $table->string('disk_name');
            $table->string('file_name');
            $table->string('file_size');
            $table->string('content_type');
            $table->string('field')->nullable();
            $table->boolean('is_public')->default(true);
            $table->smallInteger('sort_order')->default(1);
            $table->nullableMorphs('attachmentable');
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
        Schema::dropIfExists('shopper_medias');
    }
}
