<?php

namespace Mckenziearts\Shopper\Http\Controllers\Backend\Auth;

use App\Http\Controllers\Controller;
use Cartalyst\Sentinel\Laravel\Facades\Reminder;
use Cartalyst\Sentinel\Laravel\Facades\Sentinel;
use Illuminate\Http\Request;
use Mckenziearts\Shopper\Notifications\ReminderEmailSender;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    /**
     * Display the form to request a password reset link.
     *
     * @return \Illuminate\Http\Response
     */
    public function showLinkRequestForm()
    {
        return view('shopper::pages.auth.passwords.email');
    }

    /**
     * Send a reset link to the given user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function sendResetLinkEmail(Request $request)
    {
        $this->validateEmail($request);

        $user = Sentinel::findByCredentials($request->only('email'));

        return (! is_null($user))
            ? $this->sendResetLinkResponse($user, "We have e-mailed your password reset link!")
            : $this->sendResetLinkFailedResponse($request, "We can't find a user with that e-mail address.");
    }

    /**
     * Validate the email for the given request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    protected function validateEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);
    }

    /**
     * Get the response for a successful password reset link.
     *
     * @param  mixed  $user
     * @param  string  $response
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    protected function sendResetLinkResponse($user, $response)
    {
        ($reminder = Reminder::exists($user)) || ($reminder = Reminder::create($user));

        $user->notify(new ReminderEmailSender($reminder));

        return back()->with('success', __($response));
    }

    /**
     * Get the response for a failed password reset link.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $response
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    protected function sendResetLinkFailedResponse(Request $request, $response)
    {
        return back()
            ->withInput($request->only('email'))
            ->withErrors(['email' => __($response)]);
    }

    /**
     * Display the password reset view for the given token.
     *
     * If no token is present, display the link request form.
     *
     * @param integer   $id
     * @param  string $token
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function showResetForm(int $id, string $token)
    {
        return view('shopper::pages.auth.passwords.reset')->with(
            ['token' => $token, 'id' => $id]
        );
    }

    /**
     * Reset the given user's password.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\JsonResponse
     */
    public function reset(Request $request)
    {
        $request->validate($this->rules(), $this->validationErrorMessages());
        $user = Sentinel::findByCredentials(['email' => $request->input('email')]);

        if ($user) {
            if ($reminder = Reminder::complete($user, $request->input('token'), $request->input('password'))) {
                // Reminder was successfull
                return redirect()
                    ->route('shopper.login')
                    ->with('success', __("Your password has been successfull updated"));
            } else {
                // Reminder was unsuccessfull
                return redirect()
                    ->back()
                    ->with('error', __("Your password link expired. Please request another link"));
            }
        } else {
            return redirect()
                ->back()
                ->with('error', __("We can't find a user with that e-mail address."));
        }
    }

    /**
     * Get the password reset validation rules.
     *
     * @return array
     */
    protected function rules()
    {
        return [
            '_id'   => 'required',
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|confirmed|min:6',
        ];
    }

    /**
     * Get the password reset validation error messages.
     *
     * @return array
     */
    protected function validationErrorMessages()
    {
        return [];
    }
}
