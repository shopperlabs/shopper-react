<?php

namespace Mckenziearts\Shopper\Core;

class SendTo
{
    /**
     * Send message to Twitter
     *
     * @param $message
     * @param null $media
     * @param array $options
     * @return Twitter\stdClass
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
     */
    public static function Facebook($type, $data)
    {
        switch ($type) {
            case 'link':
                $message = isset($data['message']) ? $data['message'] : '';
                $result = FacebookApi::sendLink($data['link'], $data['message']);
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
