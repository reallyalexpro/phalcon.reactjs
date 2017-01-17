<?php

use Phalcon\Mvc\Controller;
use Phalcon\Mvc\View;
use Phalcon\Mvc\View\Simple as SimpleView;
use Phalcon\Mvc\Dispatcher;

class ControllerBase extends Controller
{
    protected function initialize()
    {
        $this->tag->prependTitle('Phalcon.ReactJs');
        //$this->view->setTemplateAfter('main');
    }
	
	public function beforeExecuteRoute(Dispatcher $dispatcher) {
        $annotations = $this->annotations->getMethod(
            $dispatcher->getControllerClass(),
            $dispatcher->getActiveMethod()
        );

        $asset = $this->assets;
        $asset->collection("footer");
        $reactCol = $asset->collection("react");

        if ($annotations->has("React")) {
            $scriptJSX = file_get_contents(__DIR__ . '/../views/' . $dispatcher->getControllerName() . '/' . $dispatcher->getActionName() . '.jsx');
            $scriptJS = __DIR__ . '/../public/js/react/' . $dispatcher->getControllerName() . '/' . $dispatcher->getActionName() . '.js';
            $urlJS = '/js/react/' . $dispatcher->getControllerName() . '/' . $dispatcher->getActionName() . '.js';

            $asset->addJs('//cdn.jsdelivr.net/g/react@15.4.2(react.min.js+react-dom.min.js+react-dom-server.min.js)')
                ->addJs('//cdnjs.cloudflare.com/ajax/libs/react-bootstrap/0.30.7/react-bootstrap.min.js')
                ->addJs('/js/init.react-bootstrap.js');

            switch ($this->config->mode) {
                case 'development':
                    if (class_exists("V8Js")) {
                        $this->generateReactJsFile($scriptJSX, $scriptJS);
                        $reactCol->addJs($urlJS);
                    } else {
                        $asset->collection("footer")
                            ->addInlineJs($scriptJSX, null, ['type' => 'text/babel'])
                            ->addFilter(new Phalcon\Assets\Filters\Jsmin());
                        $asset->addJs('//cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.1/babel.min.js');
                    }
                    break;
                case 'production':
                default:
                    if (is_file($scriptJS)) {
                        $reactCol->addJs($urlJS);
                    } else {
                        $asset->collection("footer")
                            ->addInlineJs($scriptJSX, null, ['type' => 'text/babel'])
                            ->addFilter(new Phalcon\Assets\Filters\Jsmin());
                        $asset->addJs('//cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.1/babel.min.js');
                    }
                    break;
            }
        }
	}

	private function generateReactJsFile($scriptIn, $scriptOut) {
        $v8 = new \V8Js();
        $v8->executeString(file_get_contents(__DIR__ . '/babel.min.js'));
        $v8->executeString(file_get_contents(__DIR__ . '/react.js'));
        $v8->input = $scriptIn;
        $result = $v8->executeString("var result = Babel.transform(PHP.input, {presets: ['react']}).code; result;");

        if(!is_dir(dirname($scriptOut))) {
            mkdir(dirname($scriptOut).'/', 0777, TRUE);
        }

        file_put_contents($scriptOut, $result);

        return $result;
    }

    protected function generateReactMarkup($scriptIn, $component) {
        $react_source = file_get_contents(__DIR__ . '/react.js');
        $babel_source = file_get_contents(__DIR__ . '/babel.min.js');
        $v8 = new \V8Js();
        $v8->executeString($babel_source);
        $v8->executeString($react_source);
        $v8->input = $scriptIn;
        $result = $v8->executeString("var result = Babel.transform(PHP.input, {presets: ['react']}).code; result;");

        $result .= ";\n" . file_get_contents(__DIR__ . '/react-bootstrap.min.js');
        $result .= ";\n var ReactBootstrap = global.ReactBootstrap;";
        $result .= ";\n" . file_get_contents(__DIR__ . '/init.react-bootstrap.js');


        $rjs = new \ReactJS($react_source, $result);
        $rjs->setComponent($component, null);

        return $rjs->getMarkup();

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

    protected function disableLevels() {
        $this->view->disableLevel(View::LEVEL_BEFORE_TEMPLATE);
        $this->view->disableLevel(View::LEVEL_LAYOUT);
        $this->view->disableLevel(View::LEVEL_AFTER_TEMPLATE);
        $this->view->disableLevel(View::LEVEL_MAIN_LAYOUT);
    }
}
