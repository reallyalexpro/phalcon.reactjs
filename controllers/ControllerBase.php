<?php

use Phalcon\Mvc\Controller;
use Phalcon\Mvc\View;

class ControllerBase extends Controller
{
    private $footer, $afterFooter, $react_source, $babel_source;

    protected function initialize()
    {
        $this->tag->prependTitle('Phalcon.ReactJs');
        $this->assets->collection("footer");
        $this->assets->collection("after-footer");
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
}
