<?php
/**
 * Created by IntelliJ IDEA.
 * User: Mac
 * Date: 2019-03-27
 * Time: 14:57
 */

namespace Mckenziearts\Shopper\Plugins\Users\Traits;


use Mckenziearts\Shopper\Plugins\Users\Models\Transaction;
use Mckenziearts\Shopper\Plugins\Users\Models\Wallet;

trait HasWallet
{
    /**
     * Retrieve the balance of this user's wallet
     */
    public function getBalanceAttribute()
    {
        return $this->wallet->balance;
    }

    /**
     * Retrieve the wallet of this user
     */
    public function wallet()
    {
        return $this->hasOne(Wallet::class)->withDefault();
    }

    /**
     * Retrieve all transactions of this user
     */
    public function transactions()
    {
        return $this->hasManyThrough(Transaction::class, Wallet::class)->latest();
    }

    /**
     * Determine if the user can withdraw the given amount
     * @param  integer $amount
     * @return boolean
     */
    public function canWithdraw($amount)
    {
        return $this->balance >= $amount;
    }

    /**
     * Move credits to this account
     * @param  integer $amount
     * @param  string $type
     * @param string $meta
     * @param bool $accepted
     */
    public function deposit($amount, $type = 'deposit', $meta = '', $accepted = true)
    {
        if ($accepted) {
            $this->wallet->balance += $amount;
            $this->wallet->save();
        } elseif (! $this->wallet->exists) {
            $this->wallet->save();
        }

        $this->wallet->transactions()
            ->create([
                'amount' => $amount,
                'hash' => uniqid('lwch_', true),
                'type' => $type,
                'accepted' => $accepted,
                'meta' => $meta
            ]);
    }

    /**
     * Fail to move credits to this account
     * @param  integer $amount
     * @param  string  $type
     * @param  string   $meta
     */
    public function failDeposit($amount, $type = 'deposit', $meta = '')
    {
        $this->deposit($amount, $type, $meta, false);
    }

    /**
     * Attempt to move credits from this account
     * @param  integer $amount
     * @param  string $type
     * @param string $meta
     * @param  boolean $shouldAccept
     */
    public function withdraw($amount, $type = 'withdraw', $meta = '', $shouldAccept = true)
    {
        $accepted = $shouldAccept ? $this->canWithdraw($amount) : true;

        if ($accepted) {
            $this->wallet->balance -= $amount;
            $this->wallet->save();
        } elseif (! $this->wallet->exists) {
            $this->wallet->save();
        }

        $this->wallet->transactions()
            ->create([
                'amount' => $amount,
                'hash' => uniqid('lwch_', true),
                'type' => $type,
                'accepted' => $accepted,
                'meta' => $meta
            ]);
    }

    /**
     * Move credits from this account
     * @param  integer $amount
     * @param  string  $type
     * @param  array   $meta
     * @param  boolean $shouldAccept
     */
    public function forceWithdraw($amount, $type = 'withdraw', $meta = [])
    {
        return $this->withdraw($amount, $type, $meta, false);
    }

    /**
     * Returns the actual balance for this wallet.
     * Might be different from the balance property if the database is manipulated
     * @return float balance
     */
    public function actualBalance()
    {
        $credits = $this->wallet->transactions()
            ->whereIn('type', ['deposit', 'refund'])
            ->where('accepted', 1)
            ->sum('amount');

        $debits = $this->wallet->transactions()
            ->whereIn('type', ['withdraw', 'payout'])
            ->where('accepted', 1)
            ->sum('amount');

        return $credits - $debits;
    }

}
