<?php

namespace Mckenziearts\Shopper\Core;

use Mckenziearts\Shopper\Core\Twitter\Api AS TwitterApi;
use Mckenziearts\Shopper\Core\Facebook\Api AS FacebookApi;

class SendTo
{
    /**
     * Send message to Twitter
     *
     * @param $message
     * @param array $media
     * @param array $options
     * @return Twitter\stdClass
     * @throws Twitter\TwitterException
     */
    public static function Twitter($message, $media = [], $options = [])
    {
        return TwitterApi::sendMessage($message, $media, $options);
    }

    /**
     * Send message to Facebook page
     *
     * @param $type
     * @param $data
     * @return bool
     * @throws \Exception
     */
    public static function Facebook($type, $data)
    {
        switch ($type) {
            case 'link':
                $message = isset($data['message']) ? $data['message'] : '';
                $result = FacebookApi::sendLink($data['link'], $message);
                break;
            case 'photo':
                $message = isset($data['message']) ? $data['message'] : '';
                $result = FacebookApi::sendPhoto($data['photo'], $message);
                break;
            case 'video':
                $description = isset($data['description']) ? $data['description'] : '';
                $result = FacebookApi::sendVideo($data['video'], $data['title'], $description);
                break;
        }

        return ($result > 0) ? true : false;
    }
}
