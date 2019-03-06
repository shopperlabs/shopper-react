<?php

namespace Mckenziearts\Shopper\Http\Controllers\Backend\Mails;

use Illuminate\Support\Facades\App;
use Mckenziearts\Shopper\Core\ShopperMail;
use Mckenziearts\Shopper\Http\Controllers\Controller;

class MailablesController extends Controller
{
    /**
     * MailablesController constructor.
     */
    public function __construct()
    {
        abort_unless(
            App::environment(config('shopper.allowed_environments', ['local'])),
            403
        );
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function index()
    {
        $mailables = ShopperMail::getMailables();

        $mailables = (null !== $mailables) ? $mailables->sortBy('name') : collect([]);

        return view(ShopperMail::$view_namespace.'::pages.mails.sections.mailables', compact('mailables'));
    }
}
