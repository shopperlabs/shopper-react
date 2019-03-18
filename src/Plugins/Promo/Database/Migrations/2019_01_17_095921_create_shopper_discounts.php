<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShopperDiscounts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shopper_promo_discounts', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('active')->default(0);
            $table->string('name')->unique()->index();
            $table->integer('value');
            $table->string('type');
            $table->string('code')->nullable()->index();
            $table->dateTime('date_begin');
            $table->dateTime('date_end')->nullable();
            $table->text('preview_text')->nullable();
            $table->longText('description')->nullable();
            $table->timestamps();

            $table->engine = 'InnoDB';
        });

        Schema::table('shopper_catalogue_offers', function (Blueprint $table) {
            $table->integer('discount_id')->nullable()->index();
            $table->string('discount_price')->nullable();
            $table->string('discount_value')->nullable();
            $table->string('discount_type')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('shopper_catalogue_offers', function (Blueprint $table) {
            $table->dropColumn(['disocunt_id', 'disocunt_price', 'discount_value', 'discount_type']);
        });

        Schema::dropIfExists('shopper_promo_discounts');
    }
}
