<?php

use Phalcon\DI\FactoryDefault;
use Phalcon\Session\Adapter\Files as SessionAdapter;
use Phalcon\Mvc\Router;
use Phalcon\Mvc\Router\Group as RouterGroup;
use Phalcon\Db\Adapter\Pdo\Mysql as DbAdapter;
use Phalcon\Security;
use Phalcon\Mvc\View;
use Phalcon\Mvc\View\Engine\Volt as VoltEngine;

$config = include "config.php";

$loader = new \Phalcon\Loader();

$loader->registerDirs([
    __DIR__ . '/../controllers',
	__DIR__ . '/../models',
])->register();

$loader->registerClasses([
	//"ReactJS" => __DIR__ . '/../library/ReactJS.php',
]);

$loader->register();

/**
 * The FactoryDefault Dependency Injector automatically register the right services providing a full stack framework
 */
$di = new FactoryDefault();

$di->set('config', function() use ($config) {	
	return $config;
});

/**
 * Setting up the view component
 */
$di->set('view', function() use ($config) {
	$view = new View();
	$view->setViewsDir([__DIR__ . '/../views/']);
	$view->registerEngines([".volt" => 'volt']);
	return $view;
});

$di->setShared('volt', function ($view, $di) {
	$volt = new VoltEngine($view, $di);
	$volt->setOptions(["compiledPath" => __DIR__ . "/../cache/volt/"]);
	$compiler = $volt->getCompiler();

	$compiler->addFunction('dump', 'print_r');	

	return $volt;
});

/**
 * Start the session the first time some component request the session service
 */
$di->setShared('session', function () {
    $session = new SessionAdapter(['uniqueId' => 'temp']);
    $session->start();
    return $session;
});

$di->set('db', function() use ($config) {
    $db = new DbAdapter([
        "host" => $config->database->host,
        "username" => $config->database->username,
        "password" => $config->database->password,
        "dbname" => $config->database->name,
        'charset' => 'utf8'
    ]);
    return $db;
});

$di->setShared('react', function() {
    $react = new ReactJS();
    $react->setup(
        file_get_contents(__DIR__ . '/../public/js/react-full.js'),
        file_get_contents(__DIR__ . '/../public/js/babel.min.js')
    );

    return $react;
});