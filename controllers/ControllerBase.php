<?php

use Phalcon\Mvc\Controller;
use Phalcon\Mvc\View;

class ControllerBase extends Controller
{
    private $footer, $afterFooter, $react_source, $babel_source;

    protected function initialize()
    {
        $this->tag->prependTitle('Phalcon.ReactJs');
        $this->footer = $this->assets->collection("footer");
        $this->afterFooter = $this->assets->collection("after-footer");
    }

    protected function getPath()
    {
        return $this->dispatcher->getControllerName() . '/' . $this->dispatcher->getActionName();
    }

    public function hasJs() {
        $scriptJS = __DIR__ . '/../public/js/react/' . $this->getPath() . '.js';
        return file_exists($scriptJS);
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
        $this->react_source = file_get_contents(__DIR__ . '/../public/js/react-full.js');
        $this->babel_source = file_get_contents(__DIR__ . '/../public/js/babel.min.js');

        if ($this->config->mode == "development") {
            $this->assets
                ->addJs('/js/react-full.js')
                ->addJs('/js/react-bootstrap.min.js');
        } else {
            $this->assets
                ->addJs('//cdn.jsdelivr.net/g/react@15.4.2(react.min.js+react-dom.min.js+react-dom-server.min.js)')
                ->addJs('//cdnjs.cloudflare.com/ajax/libs/react-bootstrap/0.30.7/react-bootstrap.min.js');
        }
        $this->assets->addJs('/js/init.react-bootstrap.js');
        return $this;
    }

    public function transpile($reactSource, $babelSource, $jsxSource)
    {
        $v8 = new \V8Js();
        $react = [];
        $react[] = $reactSource;
        $react[] = $babelSource;
        $v8->input = $jsxSource;
        $react[] = "var result = Babel.transform(PHP.input, {presets: ['react', 'es2015']}).code; result;";
        $react[] = ';';
        $concatenated = implode(";\n", $react);
        return $v8->executeString($concatenated);
    }

    public function insertReact()
    {
        $babel_url_int = '/js/babel.min.js';
        $babel_url_ext = 'https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.1/babel.min.js';

        $scriptJSX = file_get_contents(__DIR__ . '/../views/' . $this->getPath() . '.jsx');
        $scriptJS = __DIR__ . '/../public/js/react/' . $this->getPath() . '.js';
        $urlJS = '/js/react/' . $this->getPath() . '.js';

        switch ($this->config->mode) {
            case 'development':
                if (class_exists("V8Js")) {
                    $script = $this->transpile($this->react_source, $this->babel_source, $scriptJSX);
                    if (!is_dir(dirname($scriptJS))) {
                        mkdir(dirname($scriptJS) . '/', 0777, true);
                    }
                    file_put_contents($scriptJS, $script);
                    $this->assets->addJs($urlJS);
                } else {
                    $this->footer
                        ->addInlineJs($scriptJSX, null, ['type' => 'text/babel'])
                        ->addFilter(new Phalcon\Assets\Filters\Jsmin());
                    $this->assets->addJs($babel_url_int);
                }
                break;
            case 'production':
            default:
                if (is_file($scriptJS)) {
                    $this->assets->addJs($urlJS);
                } else {
                    $this->footer
                        ->addInlineJs($scriptJSX, null, ['type' => 'text/babel'])
                        ->addFilter(new Phalcon\Assets\Filters\Jsmin());
                    $this->assets->addJs($babel_url_ext);
                }
                break;
        }
        return $this;
    }

    public function endReact($str) {
        $this->afterFooter
            ->addInlineJs($str, null, ['type' => 'text/javascript'])
            ->addFilter(new Phalcon\Assets\Filters\Jsmin());
    }
}
