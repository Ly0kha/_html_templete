// JavaScript Jquery PlugIns Document




/*----------------------------------------------------

・React Test
　→React動作で必要な実装

----------------------------------------------------*/




(function ($){




/* Setup
------------------------------------------------------------------------------*/




    /* グローバル変数
    ----------------------------------------*/


    // ウィンドウのサイズ判定 //
    var self                    = this;


    // ウィンドウのサイズ判定 //
    var window_width            = $(window).width();
    var window_height           = $(window).height();
    var window_outer_width      = $(window).outerWidth();
    var window_outer_height     = $(window).outerHeight();
    var window_inner_width      = $(window).innerWidth();
    var window_inner_height     = $(window).innerHeight();


    // ディレクトリの判定 //
    var rootDir                 = location.href.split('/');
    var currentDir              = rootDir[rootDir.length -2];


    // 端末ユーザーエージェントの判定 //
    var user_agent              = navigator.userAgent;
    var ua_sp                   = user_agent.indexOf('iPhone') > 0 || user_agent.indexOf('iPad') > 0 || user_agent.indexOf('iPod') > 0 || user_agent.indexOf('Android') > 0 || user_agent.indexOf('BlackBerry') > 0 || user_agent.indexOf('windows Phone') > 0 || user_agent.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(user_agent);


    // ヘッダーの判定 //
    var header                  = $('header');
    var header_navi_1st_none    = $('header#header-navi-1st-none');
    var header_navi_1st         = $('header#header-navi-1st');
    var header_navi_2nd         = $('header#header-navi-2nd');
    var header_navi_3rd         = $('header#header-navi-3rd');


    // フッターの判定 //
    var footer                  = $('footer');
    var footer_navi_1st         = $('footer#footer-navi-1st');
    var footer_navi_2nd         = $('footer#footer-navi-2nd');
    var footer_navi_3rd         = $('footer#footer-navi-3rd');




        /* ユーザーエージェント一覧
        ----------------------------------------


        //　iOS
        user_agent.indexOf('iPhone') > 0
        user_agent.indexOf('iPad') > 0
        user_agent.indexOf('iPod') > 0

        //　Android
        user_agent.indexOf('Android') > 0

        //　BlackBerry
        user_agent.indexOf('BlackBerry') > 0

        //　Windows Phone
        user_agent.indexOf('windows Phone') > 0

        //　NOKIA
        user_agent.indexOf('NOKIA') > 0

        //　Firefox OS
        /Mobile.*Firefox/.test(user_agent)

        //　IE
        user_agent.match(/MSIE/) 　////　vr.11 or high
        user_agent.match(/Trident/) ////　vr.10 or less


        ----------------------------------------
        */




    $.ajaxSetup ({

        cache: true,
        async: true

    });


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
            var tag = $('p, h1, h2, h3, h4, h5, h6, .carousel-caption, dl.news dt, dl.news dd, dl.column dt, dl.column dd, dl#form-layout-jp dt, dl#form-layout-en dt, ul.list li, ol.list li, ul.suggest-menu li, ul.form-accept li, th, td, a, address');

            /* JSONのデータを基にカーニングを実行 */
            tag.kerning({
                'data': data
            });


        });

    }


    if (header_navi_1st.length || header_navi_1st_none.length){
        kerningDir('./');
    }

    else if (header_navi_2nd.length){
        kerningDir('../');
    }

    else if (header_navi_3rd.length){
        kerningDir('../../');
    }




})(jQuery);