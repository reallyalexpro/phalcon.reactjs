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
	
    /**    
    * @React
    */
    public function indexAction()
    {        

    }

    public function getUsersAction($page) {

        $builder = $this->modelsManager->createBuilder()
            ->from(['u' => 'Users'])
            ->orderBy('u.created desc');

        $paginator = new Paginator([
            "builder" => $builder,
            "limit"=> 3,
            "page" => $page
        ]);

        return $this->response->setJsonContent($paginator->getPaginate());
    }
}