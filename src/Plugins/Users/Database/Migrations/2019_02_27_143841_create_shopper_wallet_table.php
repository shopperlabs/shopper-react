<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateShopperWalletTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('shopper_wallets', function (Blueprint $table){
            $table->increments('id');
            $table->unsignedInteger('user_id')->nullable();
            $table->bigInteger('balance')->default(0);
            $table->timestamps();
            $table->foreign('user_id')
                ->references('id')
                ->on('shopper_users')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('shopper_wallets');
    }
}
