<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCataloguePromotionProductTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shopper_catalogue_promotion_product', function (Blueprint $table) {
            $table->unsignedInteger('promotion_id');
            $table->unsignedInteger('product_id');
            $table->primary(['promotion_id', 'product_id'], 'product_promotion');

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
        Schema::dropIfExists('shopper_catalogue_promotion_product');
    }
}
