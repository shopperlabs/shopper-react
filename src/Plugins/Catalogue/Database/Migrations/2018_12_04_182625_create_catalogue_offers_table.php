<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCatalogueOffersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shopper_catalogue_offers', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('active')->default(false);
            $table->unsignedInteger('product_id')->nullable()->index();
            $table->string('name')->index();
            $table->string('code')->nullable()->index();
            $table->decimal('price', '15', '2')->nullable()->index();
            $table->decimal('old_price', '15', '2')->nullable()->index();
            $table->integer('quantity')->unsigned()->default(0);
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
        Schema::dropIfExists('shopper_catalogue_offers');
    }
}
