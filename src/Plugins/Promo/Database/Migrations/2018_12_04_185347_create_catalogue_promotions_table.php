<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCataloguePromotionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shopper_catalogue_promotions', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('active')->default(0);
            $table->string('name')->unique()->index();
            $table->string('slug')->unique()->index();
            $table->string('type')->nullable();
            $table->string('code')->nullable()->index();
            $table->dateTime('date_begin');
            $table->dateTime('date_end')->nullable();
            $table->text('preview_text')->nullable();
            $table->longText('description')->nullable();
            $table->integer('sort_order')->nullable();
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
        Schema::dropIfExists('shopper_catalogue_promotions');
    }
}
