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
        $data = new stdClass();
        $data->users = Users::find(['order' => 'created desc'])->toArray();
        $data->url = "/index/getusers/";
        
        $this->react
            ->prepareJs($this->assets)
            ->getJs(__DIR__ . '/../views/' . $this->getPath() . '.jsx')
            ->endJs('
                function render() {
                    if (typeof Ready !== "undefined") {
                        ReactDOM.render(React.createElement(TableAdvanced, { users: '. json_encode($data->users) .', url: "/index/getusers/" }), document.getElementById("table"));
                        ReactDOM.render(React.createElement(TableAdvanced, { users: '. json_encode($data->users) .', url: "/index/getusers/" }), document.getElementById("table2"));
                    } else {
                        setTimeout(render, 1);
                    }
                }
                setTimeout(render, 1);
            ');

        /*$sources = [];
        foreach ($this->react->config->reactBootstrap as $path) {
            $sources[] = $this->react->loadFile($path);
        }
        $concatenated = implode(";\n", $sources);
        $this->view->content =
            $this->react->loadSources()->getMarkup(
                __DIR__ . '/../views/' . $this->getPath() . '.jsx',
                'TableAdvanced',
                $data,
                $concatenated
            );*/
    }

    public function getUsersAction($page)
    {
        $builder = $this->modelsManager->createBuilder()
            ->from(['u' => 'Users'])
            ->orderBy('u.created desc');

        $paginator = new Paginator([
            "builder" => $builder,
            "limit"=> 4,
            "page" => $page
        ]);

        return $this->response->setJsonContent($paginator->getPaginate());
    }
}