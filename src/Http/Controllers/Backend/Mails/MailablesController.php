<?php

namespace Mckenziearts\Shopper\Http\Controllers\Backend\Mails;

use Illuminate\Http\Request;
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

    /**
     * Generate a new Mail Class
     *
     * @param Request $request
     * @return mixed
     */
    public function generateMailable(Request $request)
    {
        return ShopperMail::generateMailable($request);
    }

    /**
     * Display a single Mailable view
     *
     * @param string $name
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function viewMailable(string $name)
    {
        $mailable = ShopperMail::getMailable('name', $name);

        if ($mailable->isEmpty()){
            return redirect()->route('shopper.settings.mails.mailables.mailableList');
        }

        $resource = $mailable->first();

        return view(ShopperMail::$view_namespace.'::pages.mails.sections.view-mailable', compact('resource'));
    }

    /**
     * Preview a Mailable template
     *
     * @param string $name
     * @return array|\Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View|null|string
     * @throws \ReflectionException
     */
    public function previewMailable(string  $name)
    {
        $mailable = ShopperMail::getMailable('name', $name);

        if ($mailable->isEmpty()){
            return redirect()->route('shopper.settings.mails.mailables.mailableList');
        }
        $resource = $mailable->first();

        if ( !is_null(ShopperMail::handleMailableViewDataArgs($resource['namespace'])) ){
            $instance = ShopperMail::handleMailableViewDataArgs($resource['namespace']);
        } else {
            $instance = new $resource['namespace'];
        }

        if (collect($resource['data'])->isEmpty()) {
            return __('View not found');
        }

        $view = !is_null($resource['markdown']) ? $resource['markdown'] : $resource['data']->view;

        if (view()->exists($view)) {
            try {
                $html = $instance;
                return $html->render();
            } catch( \ErrorException $e ){
                return view(ShopperMail::$view_namespace.'::pages.mails.previewerror', [ 'errorMessage' => $e->getMessage() ]);
            }
        }

        return view(ShopperMail::$view_namespace.'::pages.mails.previewerror', [ 'errorMessage' => __('No template associated with this mailable.')]);
    }

    /**
     * Delete a Mailable Class
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function delete(Request $request)
    {
        $mailableFile = config('shopper.mail_dir').$request->mailablename.'.php';

        if (file_exists($mailableFile)) {
            unlink($mailableFile);
            return response()->json(['status' => 'ok']);
        }

        return response()->json(['status' => 'error']);
    }

    /**
     * Parse Template action
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function parseTemplate(Request $request)
    {
        $template = $request->has('template') ? $request->template : false;

        if(ShopperMail::markdownedTemplateToView(true, $request->markdown, $request->viewpath, $template)) {
            return response()->json(['status' => 'ok']);
        }

        return response()->json(['status' => 'error']);
    }

    /**
     * Preview Markdown
     *
     * @param Request $request
     * @return bool|string
     */
    public function previewMarkdownView(Request $request)
    {
        return ShopperMail::previewMarkdownViewContent( false, $request->markdown, $request->name, false, $request->namespace);
    }

    /**
     * Edit mailable template
     *
     * @param string $name
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function editMailable(string $name)
    {
        $templateData = ShopperMail::getMailableTemplateData($name);

        if (!$templateData) {
            return redirect()->route('shopper.settings.mails.mailables.viewMailable', ['name' => $name]);
        }

        return view(ShopperMail::$view_namespace.'::pages.mails.sections.edit-mailable-template', compact('templateData', 'name'));
    }
}
