<?php

namespace Mckenziearts\Shopper\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class UserCredentials extends Notification
{
    use Queueable;

    /**
     * @var string
     */
    public $password;

    /**
     * Create a new notification instance.
     *
     * @param string $password
     */
    public function __construct(string $password)
    {
        $this->password = $password;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return \Illuminate\Notifications\Messages\MailMessage
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
                ->subject(__('Welcome to'). ' '. setting('site_title'))
                ->greeting(__('Hello'). ' '. $notifiable->getFullName())
                ->line(__('A user account has been created for you on'). ' '. setting('site_title'). '.')
                ->line("Email : {$notifiable->email} - Password {$this->password}")
                ->line(__('You can use the following link to sign in:'))
                ->action(__('Go to admin area'), route('shopper.dashboard.home'))
                ->line(__('After signing in you should change your password by clicking your name on the top right corner of the administration area.'))
                ->line(__('Thank you for using our application!'));
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
