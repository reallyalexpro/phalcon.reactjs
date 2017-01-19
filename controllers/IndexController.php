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
        $this->prepareReact()->insertReact();
    }

    public function getUsersAction($page) {

        $builder = $this->modelsManager->createBuilder()
            ->from(['u' => 'Users'])
            ->orderBy('u.created desc');

        $paginator = new Paginator([
            "builder" => $builder,
            "limit"=> 1,
            "page" => $page
        ]);

        return $this->response->setJsonContent($paginator->getPaginate());
    }
}