<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        {{ get_title() }}
        {{ stylesheet_link('//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css') }}		
        <link href="https://fonts.googleapis.com/css?family=Marck+Script|PT+Sans" rel="stylesheet">
        <link href="/css/font/stylesheet.css" rel="stylesheet">
        {{ stylesheet_link('//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css') }}
        {#{ stylesheet_link('//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css') }#}
        {#{ stylesheet_link('//cdn.jsdelivr.net/g/select2@4.0.3(css/select2.min.css),bootstrap.daterangepicker@2.1.19(daterangepicker.css),jquery.fileupload@9.9.0(css/jquery.fileupload.css)') }#}
        {#{ stylesheet_link('//gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css') }#}
				
		{{ assets.outputCss() }}
        
        {#{ stylesheet_link('/inc/adminlte/css/AdminLTE.css', false) }}		
        {{ stylesheet_link('/inc/adminlte/css/skins/skin-black.min.css', false) }}
        {{ stylesheet_link('/inc/hideShowPassword/css/example.wink.css', false) }}
        {{ stylesheet_link('/inc/icheck/skins/minimal/minimal.css', false) }}			
        {{ stylesheet_link('/css/admin.css', false) }#}

        <!--[if lt IE 9]>
        <script>
        (function(){
          var ef = function(){};
          window.console = window.console || {log:ef,warn:ef,error:ef,dir:ef};
        }());
        </script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.2/html5shiv-printshiv.min.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-shim.js"></script>
        <script src="//cdnjs.cloudflare.com/ajax/libs/es5-shim/3.4.0/es5-sham.js"></script>
        <![endif]-->

        <meta http-equiv="X-UA-Compatible" content="IE=edge">		
        <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">    

        <style> 
            body {
                /*font-family: 'bonzairegular';*/
            }
            .page-header h1 {
                font-size: 5em;
                text-transform: uppercase;
            }
            nav {
                font-size: 2em;
            }
            .menu .container, .menu .navbar-collapse {
                padding-left: 0;
                padding-right: 0;
            }
            .menu .navbar-nav {
                margin: 0;
            }
            .menu .navbar-nav.navbar-right {
                margin-right: 30px;
            }
            .menu .navbar-toggle {
                margin-right: 30px;
            }
            .menu .container > .navbar-collapse {
                margin-left: 0;
                margin-right: 0;
                overflow-x: hidden;
            }
            .dataTable {
                position: relative;
            }
            .wait {
                z-index: 2000;
                position: absolute;
                text-align: center;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(255,255,255,.7);
            }
            .wait i {
                position: absolute;
                top: 40%;
                left: 50%;
                color: gray;
                font-size: 2.3em;
            }
        </style>
    </head>
    <body class="hold-transition skin-black sidebar-mini">

        <div class="page-header"><h1><div class="container"><div class="row"><div class="col-xs-3"><a href="/"><img src="/img/logo.svg" class="img-responsive" height="150"></a></div><div class="text-center col-xs-9">Site template</div></div></div></h1></div>
        <div class="container">
            {{ content() }}
        </div>

        {{ javascript_include('//cdn.jsdelivr.net/g/jquery@2.2.0,bootstrap@3.3.6') }}

        {{ assets.outputJs() }}
        
        {{ assets.outputInlineJs("footer") }}
        {{ assets.outputInlineJs("after-footer") }}

    </body>
</html>