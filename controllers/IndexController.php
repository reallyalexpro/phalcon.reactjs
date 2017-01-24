<?php

use Phalcon\Mvc\View;
use Phalcon\Paginator\Adapter\QueryBuilder as Paginator;

class IndexController extends ControllerBase
{
    public function initialize()
    {
        $this->tag->setTitle(' - Welcome');                
        parent::initialize();
    }

    public function indexAction()
    {
        $this->react->prepare($this->assets)->insertJs(__DIR__ . '/../views/' . $this->getPath() . '.jsx');
    }

    public function getUsersAction($page) {

        $builder = $this->modelsManager->createBuilder()
            ->from(['u' => 'Users'])
            ->orderBy('u.created desc');

        $paginator = new Paginator([
            "builder" => $builder,
            "limit"=> 5,
            "page" => $page
        ]);

        return $this->response->setJsonContent($paginator->getPaginate());
    }
}