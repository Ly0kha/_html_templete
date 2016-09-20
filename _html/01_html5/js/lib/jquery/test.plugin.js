// JavaScript Jquery PlugIns Document




/*----------------------------------------------------

・Setup
　→グローバル変数の実装
　→AJAX非同期通信対応

・TEST
　→グローバル変数の実装
　→AJAX非同期通信対応

----------------------------------------------------*/




(function ($){


'use strict';


/* AJAX Setup
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

        cache:                      true,
        async:                      true

    });


    function getScript(rootDir){

        $.getScript(rootDir + 'js/lib/jquery/jquery.validate.min.js');
        $.getScript(rootDir + 'js/lib/jquery/jquery.validate.japlugin.js');
        $.getScript(rootDir + 'js/lib/jquery/jquery.kerning.min.js');
        $.getScript(rootDir + 'js/lib/jquery/jquery.heightLine.min.js');

    }


    if ($headerNav1st.length || $headerNav1st_none.length){
        getScript('./');
    }

    else if ($headerNav2nd.length){
        getScript('../');
    }

    else if ($headerNav3rd.length){
        getScript('../../');
    }




/* AJAX Setup ここまで
------------------------------------------------------------------------------*/




/* 【TEST】
------------------------------------------------------------------------------*/




    /* 【TEST】 window判定実装
       ウィンドウ自体の幅と高さを計測し、使っているブラウザのユーザーエージェントを判定
    ----------------------------------------*/


    function testUserStatusDecision(){

        var $winWidth               = $win.width(),
            $winHeight              = $win.height();

        $('#test01').html('ウィンドウ幅' + '&nbsp;:&nbsp;' + $winWidth);
        $('#test02').html('ウィンドウ高さ' + '&nbsp;:&nbsp;' + $winHeight);
        $('#test03').html('ユーザーエージェント' + '&nbsp;:&nbsp;' + '<br />' + userAgent);
        $('#test04').html('現在のディレクトリ' + '&nbsp;:&nbsp;' + currentDir);

    }


    $win.on('load resize', function(){
        testUserStatusDecision();
    });




    /*【TEST】 ユーザーエージェントコンソールログ
    ----------------------------------------*/


    if(userAgentSP){
        console.log('SP');
    }

    else {
        console.log('PC');
    }




    /*【TEST】 IE判定実装
    ----------------------------------------*/


    /* IEか否か */
    var isIE                        = false,

    /* IEのバージョン */
        version                     = null;

    /* IEであるか否かの判定 */
    if (userAgent.match(/MSIE/) || userAgent.match(/Trident/)){
        isIE                        = true;
        version                     = userAgent.match(/(MSIE\s|rv:)([\d\.]+)/)[2];
        version                     = parseInt(version);
        console.log('IE : Ver:', version);
    }




    /*【TEST】 Chrome判定実装
    ----------------------------------------*/


    /* Chromeか否か */
    var isChrome                    = false,

    /* Chromeのバージョン */
        version                     = null;

    /* IEであるか否かの判定 */
    if (userAgent.match(/Chrome/)){
        isChrome                    = true;
        version                     = userAgent.match(/(Chrome)([\0-9\.]+)/)[2];
        // version                  = parseInt(version);
        console.log('Chrome : Ver:', version);
    }

    $('#test03b').html('Chrome Ver:' + version);




    /* 【TEST】 Cookie読み込み
    ----------------------------------------*/
    function cookiePC (){
        var $cookiePCAdd            = $.cookie('PC', '1', { expires: 365 , path: '/' }),
            $cookieSPRemove         = $.removeCookie('SP', { path: '/' });
    }

    function cookieSP (){
        var $cookieSPAdd            = $.cookie('SP', '2', { expires: 365 , path: '/' }),
            $cookiePCRemove         = $.removeCookie('PC', { path: '/' });
    }

    if(userAgentSP){
        cookieSP();
        $('#test03b').html('Cookie : SP');
        console.log('Cookie : SP');
    }

    else {
        cookiePC();
        $('#test03b').html('Cookie : PC');
        console.log('Cookie : PC');
    }




    /* 【TEST】 Json読み込み
    ----------------------------------------*/


    function testJsonSelect(rootDir){

        return $.getJSON(rootDir + 'ajax/text.json', function(data){

            var items               = [];
            $.each(data, function(key, val){
                items.push('<li id=' + key + '>' + val + '</li>');
            });

            $('<ul/>',{
                'class':            'my-new-list',
                html:               items.join('')
            }).appendTo('#test05');

        });

    }


    if ($headerNav1st.length || $headerNav1st_none.length){
        testJsonSelect('./');
    }

    else if ($headerNav2nd.length){
        testJsonSelect('../');
    }

    else if ($headerNav3rd.length){
        testJsonSelect('../../');
    }




    /*【TEST】 btn-hover実装
    ----------------------------------------*/


    function btnHoverSelect(rootDir){

        return $.ajax ({

                type:               'GET',
                url:                rootDir + 'include/btn.html',

            }).done(function(btn){

                btn                 = btn.replace(/\{\$root\}/g, rootDir);
                $('#hover').append(btn);

        });

    }


    if (userAgentSP){

    }

    else if ($headerNav1st.length || $headerNav1st_none.length){
        btnHoverSelect('./');
    }

    else if ($headerNav2nd.length){
        btnHoverSelect('../');
    }

    else if ($headerNav3rd.length){
        btnHoverSelect('../../');
    }

    else {

    }




}(jQuery));