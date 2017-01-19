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

        $this->assets->collection("footer")
            ->addInlineJs(';
                    var mountNode = document.getElementById("table");
                    const table = React.createElement(TableAdvanced, {url: "/index/getusers/"}, null);
                    ReactDOM.render(table, mountNode);
            ');
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