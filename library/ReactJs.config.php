<?php

return new \Phalcon\Config([
    'setup' => [
        'development' => [
            '/js/react-full.js',
            '/js/react-bootstrap.min.js',
            '/js/init.react-bootstrap.js'
        ],
        'production' => [
            '//cdn.jsdelivr.net/g/react@15.4.2(react.min.js+react-dom.min.js+react-dom-server.min.js)',
            '//cdnjs.cloudflare.com/ajax/libs/react-bootstrap/0.30.7/react-bootstrap.min.js',
            '/js/init.react-bootstrap.js'
        ],
    ],
    'babel' => [
        'localUrl' => '/js/babel.min.js',
        'remoteUrl' => 'https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.1/babel.min.js',
        'path' => __DIR__ . '/../public/js/babel.min.js'
    ],
    'react' => [
        'path' => __DIR__ . '/../public/js/react-full.js'
    ],
    'target' => [
        'path' => __DIR__ . '/../public/js/react/',
        'url' => '/js/react/'
    ]
]);