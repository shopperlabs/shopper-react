<?php

namespace Mckenziearts\Shopper\Commands;

use Cartalyst\Sentinel\Laravel\Facades\Sentinel;
use Illuminate\Console\Command;
use Illuminate\Database\QueryException;

class CreateAdminCommand extends Command
{
    /**
     * The console command name.
     *
     * @var string
     */
    protected $name = 'shopper:admin';
    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create and admin user that has all of the necessary permissions.';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $this->info('Create Admin User for Shopper administration backend');
        $this->createUser();
        $this->info('The User Admin now has full access to your site.');
    }

    /**
     * Create admin user.
     *
     * @return void
     */
    protected function createUser(): void
    {
        $login           = $this->ask('User Login', 'admin');
        $email           = $this->ask('Email Address', 'admin@admin.com');
        $first_name      = $this->ask('First Name', 'Admin');
        $last_name       = $this->ask('Last Name', 'Manager');
        $password        = $this->secret('Password');
        $confirmPassword = $this->secret('Confirm Password');

        // Passwords don't match
        if ($password != $confirmPassword) {
            $this->info("Passwords don't match");
            exit;
        }

        $this->info('Creating admin account');

        $userData = [
            'login'        => $login,
            'email'        => $email,
            'first_name'   => $first_name,
            'last_name'    => $last_name,
            'password'     => $password,
            'is_superuser' => true
        ];

        $role = Sentinel::findRoleBySlug('developer');

        try {
            $user = Sentinel::registerAndActivate($userData);
            $role->users()->attach($user);

            $this->info('User created successfully.');
        } catch (\Exception | QueryException $e) {
            $this->error('User already exists or an error occurred!');
        }
    }
}
