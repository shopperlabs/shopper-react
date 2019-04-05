<?php
/**
 * Created by IntelliJ IDEA.
 * User: Mac
 * Date: 2019-03-27
 * Time: 14:51
 */

namespace Mckenziearts\Shopper\Plugins\Users\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $table = 'shopper_wallet_transactions';

    protected $fillable = [
        'wallet_id', 'amount', 'hash', 'type', 'accepted', 'meta'
    ];

    protected $casts = [
        'amount' => 'float',
    ];

    /**
     * Retrieve the wallet from this transaction
     */
    public function wallet()
    {
        return $this->belongsTo(Wallet::class);
    }

    /**
     * Retrieve the amount with the positive or negative sign
     */
    public function getAmountWithSignAttribute()
    {
        return in_array($this->type, ['deposit', 'refund'])
            ? '+' . $this->amount
            : '-' . $this->amount;
    }

}
