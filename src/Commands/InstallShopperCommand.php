<?php

namespace Mckenziearts\Shopper\Commands;

use Illuminate\Console\Command;
use Mckenziearts\Shopper\ShopperServiceProvider;
use Mckenziearts\Shopper\Traits\Seedable;

class InstallShopperCommand extends Command
{
    use Seedable;

    /**
     * The path of the seeder
     *
     * @var string
     */
    protected $seedersPath = DASHBOARD_PATH.'/database/seeds/';

    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'shopper:install';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Install Shopper e-commerce package';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        // Intro message
        $this->info('Installation of Shopper package, setup database, publish assets and config files');

        $this->call('vendor:publish', ['--provider' => ShopperServiceProvider::class, '--tag' => 'shopper_seeders']);
        $this->call('vendor:publish', ['--provider' => ShopperServiceProvider::class, '--tag' => 'shopper']);

        $this->setupDatabaseConfig();

        $this->info('Adding the storage and shopper symlink to your public folder');
        $this->call('shopper:link');
    }

    /**
     * Setup database configuration and seeder
     *
     * @return void
     */
    protected function setupDatabaseConfig(): void
    {
        $this->info('Migrating the database tables into your application');
        $this->call('migrate');
        $this->info('Flush data into the database');
        $this->seed('ShopperSeeder');
    }
}
