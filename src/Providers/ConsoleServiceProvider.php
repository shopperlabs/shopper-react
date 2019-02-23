<?php

namespace Mckenziearts\Shopper\Providers;

use Illuminate\Support\ServiceProvider;
use Mckenziearts\Shopper\Commands\CreateAdminCommand;
use Mckenziearts\Shopper\Commands\InstallShopperCommand;
use Mckenziearts\Shopper\Commands\PublicLinkCommand;

class ConsoleServiceProvider extends ServiceProvider
{
    /**
     * Indicates if loading of the provider is deferred.
     *
     * @var bool
     */
    protected $defer = false;

    /**
     * The available command shortname.
     *
     * @var array
     */
    protected $commands = [
        CreateAdminCommand::class,
        InstallShopperCommand::class,
        PublicLinkCommand::class,
    ];

    /**
     * Register the commands.
     */
    public function register()
    {
        foreach ($this->commands as $command) {
            $this->commands($command);
        }
    }
}
