<?php
/**
 * Created by PhpStorm.
 * User: Volkogon_A
 * Date: 24.01.2017
 * Time: 11:33
 */

class ReactJs
{
    private $reactSource, $babelSource, $mode, $v8js, $assets;
    public $config;

    function __construct($mode = 'development') {
        $this->mode = $mode;
        $this->config = include "ReactJs.config.php";
        $this->v8js = class_exists("V8Js");
    }

    public function loadFile($path) {
        return file_get_contents($path);
    }

    private function loadReactSource() {
        $this->reactSource = $this->loadFile($this->config->react->path);
    }

    private function loadBabelSource() {
        $this->babelSource = $this->loadFile($this->config->babel->path);
    }

    public function loadSources() {
        $this->loadReactSource();
        $this->loadBabelSource();
        return $this;
    }

    private function scriptUrl($path, $ext = ".js") {
        $dir = pathinfo(pathinfo($path, PATHINFO_DIRNAME), PATHINFO_FILENAME);
        return $this->config->target->url . $dir . "/" .  pathinfo($path, PATHINFO_FILENAME) . $ext;
    }

    private function scriptPath($path, $ext = ".js") {
        $dir = pathinfo(pathinfo($path, PATHINFO_DIRNAME), PATHINFO_FILENAME);
        return $this->config->target->path . $dir . "/" . pathinfo($path, PATHINFO_FILENAME) . $ext;
    }

    private function makeFolder($path) {
        if (!is_dir(dirname($path))) {
            mkdir(dirname($path) . '/', 0777, true);
        }
    }

    private function writeFile($path, $content) {
        file_put_contents($path, $content);
    }

    public function prepareJs(\Phalcon\Assets\Manager $assets) {
        $this->assets = $assets;

        foreach($this->config->setup[$this->mode] as $url) {
            $this->assets->addJs($url);
        }
        return $this;
    }

    public function getJs($scriptJSX) {
        $scriptJS = $this->scriptPath($scriptJSX);
        $urlJS = $this->scriptUrl($scriptJSX);

        switch ($this->mode) {
            case 'development':
                if ($this->v8js) {
                    $this->loadSources();
                    $jsxSource = $this->loadFile($scriptJSX);
                    $script = $this->transpile($jsxSource);
                    $this->makeFolder($scriptJS);
                    $this->writeFile($scriptJS, $script);
                    $this->assets->addJs($urlJS);
                } else {
                    copy($scriptJSX, $this->scriptPath($scriptJSX, '.jsx'));
                    $this->assets->addJs($this->config->babel->localUrl);
                    $this->assets->addJs($this->scriptUrl($scriptJSX, '.jsx'), null, null, ['type' => 'text/babel']);
                }
                break;
            case 'production':
            default:
                if (is_file($scriptJS)) {
                    $this->assets->addJs($urlJS);
                } else {
                    copy($scriptJSX, $this->scriptPath($scriptJSX, '.jsx'));
                    $this->assets->addJs($this->config->babel->remoteUrl);
                    $this->assets->addJs($this->scriptUrl($scriptJSX, '.jsx'), null, null, ['type' => 'text/babel']);
                }
                break;
        }
        return $this;
    }

    public function endJs($str) {
        $this->assets->collection("after-footer")
            ->addInlineJs($str, null, ['type' => 'text/javascript'])
            ->addFilter(new Phalcon\Assets\Filters\Jsmin());
    }

    public function transpile($jsxSource) {
        $v8 = new \V8Js();
        $react = [];
        $react[] = $this->reactSource;
        $react[] = $this->babelSource;
        $v8->input = $jsxSource;
        $react[] = "var result = Babel.transform(PHP.input, {presets: ['react', 'es2015']}).code; result;";
        $react[] = ';';
        $concatenated = implode(";\n", $react);
        return $v8->executeString($concatenated);
    }

    public function getMarkup($scriptJSX, $component, $data = null, $sources = "") {
        if ($this->v8js) {
            $v8 = new \V8Js();
            $react = [];
            $react[] = "var console = {warn: function(){}, error: print};";
            $react[] = "var global = global || this, self = self || this, window = window || this;";
            $react[] = $this->reactSource;
            $react[] = "var React = global.React, ReactDOM = global.ReactDOM, ReactDOMServer = global.ReactDOMServer;";
            $react[] = $sources;
            $react[] = $this->transpile($this->loadFile($scriptJSX));
            $react[] = sprintf("var result = ReactDOMServer.renderToString(React.createElement(%s, %s)); result", $component, json_encode($data));
            $react[] = ';';
            $concatenated = implode(";\n", $react);
            return $v8->executeString($concatenated);
        }
        return "";
    }
}