<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCatalogueAdditionalCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shopper_catalogue_additional_categories', function (Blueprint $table) {
            $table->unsignedInteger('category_id');
            $table->unsignedInteger('product_id');
            $table->primary(['category_id', 'product_id'], 'product_category');

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
        Schema::dropIfExists('shopper_catalogue_additional_categories');
    }
}
