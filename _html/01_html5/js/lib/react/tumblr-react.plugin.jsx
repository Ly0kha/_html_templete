// JavaScript Jquery PlugIns Document




/*----------------------------------------------------

・React Test
　→React動作で必要な実装

----------------------------------------------------*/




(function ($){




/* Setup
------------------------------------------------------------------------------*/




    /* グローバル変数
    ----------------------------------------------------*/


    // ウィンドウのサイズ判定 //
    var self                = this,


    // ウィンドウのサイズ判定 //
        $win                = $(window),

        $winWidth           = $win.width(),
        $winHeight          = $win.height(),
        $winOuterWidth      = $win.outerWidth(),
        $winOuterHeight     = $win.outerHeight(),
        $winInnerWidth      = $win.innerWidth(),
        $winInnerHeight     = $win.innerHeight(),


    // ディレクトリの判定 //
        rootDir             = location.href.split('/'),
        currentDir          = rootDir[rootDir.length -2],


    // 端末ユーザーエージェントの判定 //
        userAgent           = navigator.userAgent,
        userAgentSP         = userAgent.indexOf('iPhone') > 0 || userAgent.indexOf('iPad') > 0 || userAgent.indexOf('iPod') > 0 || userAgent.indexOf('Android') > 0 || userAgent.indexOf('BlackBerry') > 0 || userAgent.indexOf('windows Phone') > 0 || userAgent.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(userAgent),

    // ヘッダーの判定 //
        $header             = $('header'),
        $headerNav1st_none  = $('header#header-navi-1st-none'),
        $headerNav1st       = $('header#header-navi-1st'),
        $headerNav2nd       = $('header#header-navi-2nd'),
        $headerNav3rd       = $('header#header-navi-3rd'),


    // フッターの判定 //
        $footer             = $('footer');




        /* ユーザーエージェント一覧
        ----------------------------------------------------

        //　iOS
        userAgent.indexOf('iPhone') > 0
        userAgent.indexOf('iPad') > 0
        userAgent.indexOf('iPod') > 0

        //　Android
        userAgent.indexOf('Android') > 0

        //　BlackBerry
        userAgent.indexOf('BlackBerry') > 0

        //　Windows Phone
        userAgent.indexOf('windows Phone') > 0

        //　NOKIA
        userAgent.indexOf('NOKIA') > 0

        //　Firefox OS
        /Mobile.*Firefox/.test(userAgent)

        //　IE
        userAgent.match(/MSIE/) 　////　vr.11 or high
        userAgent.match(/Trident/) ////　vr.10 or less

        ----------------------------------------------------
        */




    $.ajaxSetup ({

        cache: true,
        async: true

    });




/* AJAX Setup ここまで
------------------------------------------------------------------------------*/




    // tutorial1.js
    var CommentBox = React.createClass({

        render: function() {
            return (
                <p className="commentBox">
                    Hello, world! I am a CommentBox.
                </p>
            );
        }

    });

    ReactDOM.render(
        <CommentBox />,
        document.getElementById('content01')
    );




    /* Kerning
    ----------------------------------------------------*/


    /*Attention
    ----------------------------------------------------

    ※カーニングは半角英数には対応不可
    ※数字、記号、約物は全角のみカーニングに対応
    ※詳しい対応文字はajax/kerning.jsonを確認

    ----------------------------------------------------
    */




    function kerningDir(rootDir){

        /* JSONデータ読み込み - 非同期通信するためgetJSONで読み出すこと - */
        return $.getJSON(rootDir + 'ajax/kerning.json', function(data){


            /* 中にテキストが入るタグの判定 divは含まれない */
            var $tag = $('p, h1, h2, h3, h4, h5, h6, .carousel-caption, dl.news dt, dl.news dd, dl.column dt, dl.column dd, dl#form-layout-jp dt, dl#form-layout-en dt, ul.list li, ol.list li, ul.suggest-menu li, ul.form-accept li, th, td, a, address');

            /* JSONのデータを基にカーニングを実行 */
            $tag.kerning({
                'data': data
            });


        });

    }


    if ($headerNav1st.length || $headerNav1st_none.length){
        kerningDir('./');
    }

    else if ($headerNav2nd.length){
        kerningDir('../');
    }

    else if ($headerNav3rd.length){
        kerningDir('../../');
    }




})(jQuery);