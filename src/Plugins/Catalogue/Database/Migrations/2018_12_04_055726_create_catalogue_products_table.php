<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCatalogueProductsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shopper_catalogue_products', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('active')->default(false);
            $table->string('name')->unique()->index();
            $table->string('slug')->unique()->index();
            $table->unsignedInteger('brand_id')->nullable()->index();
            $table->unsignedInteger('category_id')->nullable()->index();
            $table->string('code')->nullable()->index();
            $table->text('preview_text')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();
            $table->softDeletes();

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
        Schema::dropIfExists('shopper_catalogue_products');
    }
}
