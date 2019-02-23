<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCatalogueCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shopper_catalogue_categories', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('active')->default(false);
            $table->string('name')->unique()->index();
            $table->string('slug')->unique()->index();
            $table->string('code')->nullable()->index();
            $table->text('preview_text')->nullable();
            $table->text('description')->nullable();
            $table->integer('parent_id')->nullable()->unsigned();
            $table->integer('sort_order')->nullable()->unsigned();
            $table->timestamps();

            $table->foreign('parent_id')
                ->references('id')
                ->on('shopper_catalogue_categories')
                ->onDelete('cascade');
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
        Schema::dropIfExists('shopper_catalogue_categories');
    }
}
