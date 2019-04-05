<?php
/**
 * Created by IntelliJ IDEA.
 * User: Mac
 * Date: 2019-03-27
 * Time: 14:50
 */

namespace Mckenziearts\Shopper\Plugins\Users\Models;


use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{
    protected $table = 'shopper_wallets';
    /**
     * Retrieve all transactions
     */
    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    /**
     * Retrieve owner
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

}
