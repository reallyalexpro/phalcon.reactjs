<?php

/**
 * Created by PhpStorm.
 * User: Volkogon_A
 * Date: 16.01.2017
 * Time: 15:28
 */
class AboutController extends ControllerBase
{
    /**
     * @React
     */
    public function indexAction() {
        $app_source = file_get_contents(__DIR__ . '/../views/index/index.jsx');

        echo $this->generateReactMarkup($app_source, 'Page');

        $this->view->disable();
    }
}