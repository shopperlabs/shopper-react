<?php

namespace Mckenziearts\Shopper\Http\Controllers\Backend\Mails;

use Illuminate\Routing\Controller;
use Illuminate\Http\Request;
use Mckenziearts\Shopper\Core\ShopperMail;
use Illuminate\Support\Facades\App;

class TemplatesController extends Controller
{
    /**
     * TemplatesController constructor.
     */
	public function __construct()
    {
        abort_unless(
            App::environment(config('shopper.allowed_environments', ['local'])),
            403
        );
    }

    /**
     * DIsplay Templates View
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
	public function index()
	{
		$skeletons = ShopperMail::getTemplateSkeletons();
		$templates = ShopperMail::getTemplates();

		return View(ShopperMail::$view_namespace.'::pages.mails.sections.templates', compact('skeletons', 'templates'));
	}

    /**
     * Create new Mail Template view
     *
     * @param string    $type
     * @param string    $name
     * @param string    $skeleton
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
	public function new(string $type, string $name, string $skeleton)
	{
		$type = $type === 'html' ? $type : 'markdown';
		$skeleton = ShopperMail::getTemplateSkeleton($type, $name, $skeleton);

		return view(ShopperMail::$view_namespace.'::pages.mails.sections.create-template', compact('skeleton'));
	}

    /**
     * View a template
     *
     * @param null $templateslug
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
	public function view($templateslug = null)
	{
		$template = ShopperMail::getTemplate($templateslug);

		if (is_null($template)) {
			return redirect()->route('shopper.settings.mails.templates.templateList');
		}

		return View(ShopperMail::$view_namespace.'::pages.mails.sections.edit-template', compact('template'));
	}

    /**
     * Create a New Template
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
	public function create(Request $request)
	{
		return ShopperMail::createTemplate($request);
	}

    /**
     * Select Mail template
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
	public function select()
	{
		$skeletons = ShopperMail::getTemplateSkeletons();

		return view(ShopperMail::$view_namespace.'::pages.mails.sections.new-template', compact('skeletons'));
	}

    /**
     * @param Request $request
     * @return bool|string
     * @throws \Throwable
     */
	public function previewTemplateMarkdownView(Request $request)
	{
		return ShopperMail::previewMarkdownViewContent(false,  $request->markdown, $request->name, true);
	}

    /**
     * Delete template
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
	public function delete(Request $request)
	{
		if ( ShopperMail::deleteTemplate($request->templateslug) ){
			return response()->json(['status' => 'ok']);
		} else {
			return response()->json(['status' => 'error']);
		}
	}

    /**
     * Update template
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
	public function update(Request $request)
	{
		return ShopperMail::updateTemplate($request);
	}

}
