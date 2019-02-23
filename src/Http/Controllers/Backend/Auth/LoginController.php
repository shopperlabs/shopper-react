<?php

namespace Mckenziearts\Shopper\Http\Controllers\Backend\Auth;

use Cartalyst\Sentinel\Laravel\Facades\Sentinel;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Mckenziearts\Shopper\Http\Controllers\Controller;
use Mckenziearts\Shopper\Models\AccessLog;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    /**
     * Show the application's login form.
     *
     * @return \Illuminate\Http\Response
     */
    public function showLoginForm()
    {
        return view('shopper::pages.auth.login');
    }

    /**
     * Handle a login request to the application.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws ValidationException
     */
    public function login(Request $request)
    {
        $this->validateLogin($request);

        $user = Sentinel::authenticateAndRemember($request->only($this->username(), 'password'));

        if ($request->ajax()) {
            if (! $user) {
                $response = [
                    'status'    => 'error',
                    'message'   => __('These credentials do not match our records.')
                ];

                return response()->json($response);
            }

            $response = [
                'status'    => 'success',
                'message'   => __('Successfull Login'),
                'user'      => $user
            ];

            return response()->json($response);
        }

        if (! $user) {
            return back()->with('error', __('These credentials do not match our records.'));
        }

        AccessLog::add($user);

        return redirect(route('shopper.dashboard.home'))->with('success', __('Successfull Login'));
    }

    /**
     * Validate login data
     *
     * @param Request $request
     * @throws ValidationException
     */
    protected function validateLogin(Request $request)
    {
        $this->validate($request, [
            $this->username()   => 'required|email',
            'password'          => 'required|string',
        ]);
    }

    /**
     * Get the login username to be used by the controller.
     *
     * @return string
     */
    public function username()
    {
        return 'email';
    }

    /**
     * Log the user out of the application.
     *
     * @return \Illuminate\Http\Response
     */
    public function logout()
    {
        Sentinel::logout();

        return redirect()->route('shopper.login');
    }
}
