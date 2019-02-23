<?php

namespace Mckenziearts\Shopper\Core;

use Illuminate\Http\Request;

class EnvironmentManager
{
    /**
     * @var string
     */
    private $envPath;

    /**
     * @var string
     */
    private $envExamplePath;

    /**
     * Set the .env and .env.example paths.
     */
    public function __construct()
    {
        $this->envPath = base_path('.env');
        $this->envExamplePath = base_path('.env.example');
    }

    /**
     * Get the content of the .env file.
     *
     * @return string
     */
    public function getEnvContent()
    {
        if (!file_exists($this->envPath)) {
            if (file_exists($this->envExamplePath)) {
                copy($this->envExamplePath, $this->envPath);
            } else {
                touch($this->envPath);
            }
        }

        return file_get_contents($this->envPath);
    }

    /**
     * Get the the .env file path.
     *
     * @return string
     */
    public function getEnvPath()
    {
        return $this->envPath;
    }

    /**
     * Get the the .env.example file path.
     *
     * @return string
     */
    public function getEnvExamplePath()
    {
        return $this->envExamplePath;
    }

    /**
     * Save the form content to the .env file.
     *
     * @param Request $request
     * @return array
     */
    public function saveEnvConfigFile(Request $request)
    {
        $results = ['success', __('Your .env file settings have been saved.')];

        $envFileData =
            'TWITTER_CONSURMER_KEY=\'' . $request->input('twitter_consurmer_key') . "'\n" .
            'TWITTER_CONSURMER_SECRET=' . $request->input('twitter_consurmer_secret') . "\n" .
            'TWITTER_ACCESS_TOKEN=' . $request->input('twitter_access_token') . "\n" .
            'TWITTER_ACCESS_TOKEN_SECRET=' . $request->input('twitter_access_token_secret') . "\n\n" .

            'FACEBOOK_APP_ID=' . $request->input('facebook_app_id') . "\n" .
            'FACEBOOK_APP_SECRET=' . $request->input('facebook_app_secret') . "\n" .
            'FACEBOOK_DEFAULT_GRAPH_VERSION=' . $request->input('facebook_graph_version') . "\n" .
            'FACEBOOK_PAGE_ACCESS_TOKEN=' . $request->input('facebook_page_access_token') . "\n\n";

        try {
            file_put_contents($this->envPath, $envFileData);
        }
        catch(\Exception $e) {
            $results = ['error', __('Unable to save the .env file, Please create it manually.')];
        }

        return $results;
    }
}
