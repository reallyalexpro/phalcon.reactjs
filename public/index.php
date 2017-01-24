<?php

use Phalcon\Mvc\Application;

error_reporting(E_ALL);

try {    
	define('VENDOR_PATH', realpath('..') . '/' . 'vendor');

	//require_once VENDOR_PATH . '/autoload.php';

    /**
     * Load application services
     */
    require __DIR__ . '/../config/services.php';

    $application = new Application($di);	
	
    echo $application->handle()->getContent();
} catch (Exception $e){
    echo $e->getMessage();
}
