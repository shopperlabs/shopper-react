<?php

namespace Mckenziearts\Shopper\Traits;

/**
 * Singleton trait.
 *
 * Allows a simple interface for treating a class as a singleton.
 * Usage: myObject::instance()
 *
 * @author Arthur Monney
 */
trait Singleton
{
    protected static $instance;

    /**
     * Create a new instance of this singleton.
     */
    final public static function instance()
    {
        return isset(static::$instance)
            ? static::$instance
            : static::$instance = new static;
    }

    /**
     * Forget this singleton's instance if it exists
     */
    final public static function forgetInstance()
    {
        static::$instance = null;
    }

    /**
     * Constructor.
     */
    final protected function __construct()
    {
        $this->init();
    }

    /**
     * Initialize the singleton free from constructor parameters.
     */
    protected function init() {}

    public function __clone()
    {
        trigger_error('Cloning '.__CLASS__.' is not allowed.', E_USER_ERROR);
    }

    public function __wakeup()
    {
        trigger_error('Unserializing '.__CLASS__.' is not allowed.', E_USER_ERROR);
    }
}
