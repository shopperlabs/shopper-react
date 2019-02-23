<?php

namespace Mckenziearts\Shopper\Commands;

use Illuminate\Console\Command;

class PublicLinkCommand extends Command
{
    /**
     * The console command signature.
     *
     * @var string
     */
    protected $signature = 'shopper:link';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a symbolic link from "vendor/shopper" to "public/shopper" and add Storage simnolic link';

    /**
     * Execute the console command.
     *
     * @return void
     */
    public function handle()
    {
        if (file_exists(public_path('shopper'))) {
            return $this->error('The "public/shopper" directory already exists.');
        }

        $this->laravel->make('files')->link(realpath(DASHBOARD_PATH.'/public/'), public_path('shopper'));
        $this->info('The [public/shopper] directory has been linked.');

        if (file_exists(public_path('storage'))) {
            return $this->error('The "public/storage" directory already exists.');
        }

        $this->laravel->make('files')->link(storage_path('app'), public_path('storage'));
        $this->info('The [public/storage] directory has been linked.');
    }
}
