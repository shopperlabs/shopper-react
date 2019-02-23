<?php

namespace Mckenziearts\Shopper\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class ReminderEmailSender extends Notification
{
    use Queueable;

    /**
     * @var
     */
    public $reminder;

    /**
     * Create a new notification instance.
     * @param $reminder
     */
    public function __construct($reminder)
    {
        $this->reminder = $reminder;
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
            ->subject(__('Reset Password Notification'))
            ->greeting(__('Hello'))
            ->line(__('You are receiving this email because we received a password reset request for your account.'))
            ->action(__('Reset Password'), route('shopper.password.reset', ['id' => $notifiable->id, 'token' => $this->reminder->code]))
            ->line(__('This password reset link will expire in 3 days.'))
            ->line(__('If you did not request a password reset, no further action is required.'));
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
