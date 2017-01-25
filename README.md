# phalcon.reactjs
Sample Phalcon project with ReactJs support.

It has 2 modes: development and production.
Uses V8Js (optional) for JSX transpiling on the fly in development mode. 
If V8Js extension is not installed it uses Babel on client.


Client side rendering:
     
    $this->react
        ->prepareJs($this->assets)
        ->getJs(__DIR__ . '/../views/' . $this->getPath() . '.jsx')
        ->endJs('
            setTimeout(function() {                
                ReactDOM.render(React.createElement(TableAdvanced, { url: "/index/getusers/" }), document.getElementById("table"));                    
            }, 1);                        
        ');
    
Server side rendering:    
    
    $sources = [];
    foreach ($this->react->config->reactBootstrap as $path) {
        $sources[] = $this->react->loadFile($path);
    }
    $concatenated = implode(";\n", $sources);
    
    $this->view->content =
        $this->react->getMarkup(
            __DIR__ . '/../views/' . $this->getPath() . '.jsx',
            'Form2',
            null,
            $concatenated
        );