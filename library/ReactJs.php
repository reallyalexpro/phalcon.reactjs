<?php
/**
 * Created by PhpStorm.
 * User: Volkogon_A
 * Date: 24.01.2017
 * Time: 11:33
 */

class ReactJs
{
    private $reactSource, $babelSource, $config, $mode, $v8js, $assets;

    function __construct($mode = 'development') {
        $this->mode = $mode;
        $this->config = include "ReactJs.config.php";
        $this->v8js = class_exists("V8Js");
    }

    private function loadFile($path) {
        return file_get_contents($path);
    }

    private function loadSources() {
        $this->reactSource = $this->loadFile($this->config->react->path);
        $this->babelSource = $this->loadFile($this->config->babel->path);
    }

    private function scriptUrl($path) {
        $dir = pathinfo(pathinfo($path, PATHINFO_DIRNAME), PATHINFO_FILENAME);
        return $this->config->target->url . $dir . "/" .  pathinfo($path, PATHINFO_FILENAME) . '.js';
    }

    private function scriptPath($path) {
        $dir = pathinfo(pathinfo($path, PATHINFO_DIRNAME), PATHINFO_FILENAME);
        return $this->config->target->path . $dir . "/" . pathinfo($path, PATHINFO_FILENAME) . '.js';
    }

    private function makeFolder($path) {
        if (!is_dir(dirname($path))) {
            mkdir(dirname($path) . '/', 0777, true);
        }
    }

    private function writeFile($path, $content) {
        file_put_contents($path, $content);
    }

    public function prepare(\Phalcon\Assets\Manager $assets) {
        $this->assets = $assets;

        foreach($this->config->setup[$this->mode] as $url) {
            $this->assets->addJs($url);
        }
        return $this;
    }

    public function insertJs($scriptJSX) {
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
                    $jsxSource = $this->loadFile($scriptJSX);
                    $this->assets->collection("footer")
                        ->addInlineJs($jsxSource, null, ['type' => 'text/babel'])
                        ->addFilter(new Phalcon\Assets\Filters\Jsmin());
                    $this->assets->addJs($this->config->babel->localUrl);
                }
                break;
            case 'production':
            default:
                if (is_file($scriptJS)) {
                    $this->assets->addJs($urlJS);
                } else {
                    $jsxSource = $this->loadFile($scriptJSX);
                    $this->assets->collection("footer")
                        ->addInlineJs($jsxSource, null, ['type' => 'text/babel'])
                        ->addFilter(new Phalcon\Assets\Filters\Jsmin());
                    $this->assets->addJs($this->config->babel->remoteUrl);
                }
                break;
        }
        return $this;
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
}