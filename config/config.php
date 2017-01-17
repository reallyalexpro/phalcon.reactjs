<?php

return new \Phalcon\Config([
	'database' => [
		'adapter'  => 'Mysql',
		'host'     => 'localhost',
		'username' => 'root',
		'password' => '',
		'name'     => 'phalcon',
	],
    'mode' => 'development' //development or production
]);