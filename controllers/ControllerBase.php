<?php

use Phalcon\Mvc\Controller;
use Phalcon\Mvc\View;
use Phalcon\Mvc\Dispatcher;

class ControllerBase extends Controller
{
    protected function initialize()
    {
        $this->tag->prependTitle('Phalcon.ReactJs');
    }

    protected function getPath()
    {
        return $this->dispatcher->getControllerName() . '/' . $this->dispatcher->getActionName();
    }

    protected function forward($uri)
    {
        $uriParts = explode('/', $uri);
        $params = array_slice($uriParts, 2);
        return $this->dispatcher->forward(
            [
                'controller' => $uriParts[0],
                'action' => $uriParts[1],
                'params' => $params
            ]
        );
    }

    protected function disableLevels()
    {
        $this->view->disableLevel(View::LEVEL_BEFORE_TEMPLATE);
        $this->view->disableLevel(View::LEVEL_LAYOUT);
        $this->view->disableLevel(View::LEVEL_AFTER_TEMPLATE);
        $this->view->disableLevel(View::LEVEL_MAIN_LAYOUT);
    }

    public function prepareReact()
    {
        $this->assets
            ->addJs('//cdn.jsdelivr.net/g/react@15.4.2(react.min.js+react-dom.min.js+react-dom-server.min.js)')
            ->addJs('//cdnjs.cloudflare.com/ajax/libs/react-bootstrap/0.30.7/react-bootstrap.min.js')
            ->addJs('/js/init.react-bootstrap.js');
        return $this;
    }

    public function transpile($reactSource, $babelSource, $jsxSource)
    {
        $v8 = new \V8Js();
        $react = [];
        $react[] = $reactSource;
        $react[] = $babelSource;
        $v8->input = $jsxSource;
        $react[] = "var result = Babel.transform(PHP.input, {presets: ['react']}).code; result;";
        $react[] = ';';
        $concatenated = implode(";\n", $react);
        return $v8->executeString($concatenated);
    }

    public function insertReact()
    {
        $react_source = file_get_contents(__DIR__ . '/../public/js/react-full.js');
        $babel_source = file_get_contents(__DIR__ . '/../public/js/babel.min.js');
        $babel_url = '/js/babel.min.js';

        $scriptJSX = file_get_contents(__DIR__ . '/../views/' . $this->getPath() . '.jsx');
        $scriptJS = __DIR__ . '/../public/js/react/' . $this->getPath() . '.js';
        $urlJS = '/js/react/' . $this->getPath() . '.js';

        switch ($this->config->mode) {
            case 'development':
                if (class_exists("V8Js")) {
                    $script = $this->transpile($react_source, $babel_source, $scriptJSX);
                    if (!is_dir(dirname($scriptJS))) {
                        mkdir(dirname($scriptJS) . '/', 0777, TRUE);
                    }
                    file_put_contents($scriptJS, $script);
                    $this->assets->addJs($urlJS);
                } else {
                    $this->assets->collection("footer")
                        ->addInlineJs($scriptJSX, null, ['type' => 'text/babel'])
                        ->addFilter(new Phalcon\Assets\Filters\Jsmin());
                    $this->assets->addJs($babel_url);
                }
                break;
            case 'production':
            default:
                if (is_file($scriptJS)) {
                    $this->assets->addJs($urlJS);
                } else {
                    $this->assets->collection("footer")
                        ->addInlineJs($scriptJSX, null, ['type' => 'text/babel'])
                        ->addFilter(new Phalcon\Assets\Filters\Jsmin());
                    $this->assets->addJs($babel_url);
                }
                break;
        }
        return $this;
    }
}
