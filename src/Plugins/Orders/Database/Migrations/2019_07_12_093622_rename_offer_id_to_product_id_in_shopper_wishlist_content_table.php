<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class RenameOfferIdToProductIdInShopperWishlistContentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasColumn('shopper_wishlist_content', 'offer_id')) {
            Schema::table('shopper_wishlist_content', function (Blueprint $table) {
                $table->renameColumn('offer_id', 'product_id');
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        if (Schema::hasColumn('shopper_wishlist_content', 'product_id')) {
            Schema::table('shopper_wishlist_content', function (Blueprint $table) {
                $table->renameColumn('product_id', 'offer_id');
            });
        }
    }
}
