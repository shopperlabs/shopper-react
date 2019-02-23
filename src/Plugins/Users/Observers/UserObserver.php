<?php

namespace Mckenziearts\Shopper\Plugins\Users\Observers;

use Mckenziearts\Shopper\Plugins\Users\Models\User;

class UserObserver
{
    /**
     * Trigger before delete a User
     *
     * @param User $user
     */
    public function deleting(User $user)
    {
        $user->orders()->delete();
        $user->addresses()->delete();
        $user->reviews()->delete();
    }
}
