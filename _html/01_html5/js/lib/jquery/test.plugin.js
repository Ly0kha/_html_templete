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
    var self                    = this,


    // ウィンドウのサイズ判定 //
        $win = $(window),

        window_width            = $win.width(),
        window_height           = $win.height(),
        window_outer_width      = $win.outerWidth(),
        window_outer_height     = $win.outerHeight(),
        window_inner_width      = $win.innerWidth(),
        window_inner_height     = $win.innerHeight(),


    // ディレクトリの判定 //
        rootDir                 = location.href.split('/'),
        currentDir              = rootDir[rootDir.length -2],


    // 端末ユーザーエージェントの判定 //
        user_agent              = navigator.userAgent,
        ua_sp                   = user_agent.indexOf('iPhone') > 0 || user_agent.indexOf('iPad') > 0 || user_agent.indexOf('iPod') > 0 || user_agent.indexOf('Android') > 0 || user_agent.indexOf('BlackBerry') > 0 || user_agent.indexOf('windows Phone') > 0 || user_agent.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(user_agent),

    // ヘッダーの判定 //
        header                  = $('header'),
        header_navi_1st_none    = $('header#header-navi-1st-none'),
        header_navi_1st         = $('header#header-navi-1st'),
        header_navi_2nd         = $('header#header-navi-2nd'),
        header_navi_3rd         = $('header#header-navi-3rd'),


    // フッターの判定 //
        footer                  = $('footer'),
        footer_navi_1st         = $('footer#footer-navi-1st'),
        footer_navi_2nd         = $('footer#footer-navi-2nd'),
        footer_navi_3rd         = $('footer#footer-navi-3rd');




        /* ユーザーエージェント一覧
        ----------------------------------------------------


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


        ----------------------------------------------------
        */




    $.ajaxSetup ({

        cache: true,
        async: true

    });


    function getScript(rootDir){

        $.getScript(rootDir + 'js/lib/jquery/jquery.validate.min.js');
        $.getScript(rootDir + 'js/lib/jquery/jquery.validate.japlugin.js');
        $.getScript(rootDir + 'js/lib/jquery/jquery.kerning.min.js');
        $.getScript(rootDir + 'js/lib/jquery/jquery.heightLine.min.js');

    }


    if (header_navi_1st.length || header_navi_1st_none.length){
        getScript('./');
    }

    else if (header_navi_2nd.length){
        getScript('../');
    }

    else if (header_navi_3rd.length){
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

        var window_width    = $win.width(),
            window_height   = $win.height();

        $('#test01').html('ウィンドウ幅' + '&nbsp;:&nbsp;' + window_width);
        $('#test02').html('ウィンドウ高さ' + '&nbsp;:&nbsp;' + window_height);
        $('#test03').html('ユーザーエージェント' + '&nbsp;:&nbsp;' + '<br />' + user_agent);
        $('#test04').html('現在のディレクトリ' + '&nbsp;:&nbsp;' + currentDir);

    }


    $win.on('load resize', function(){
        testUserStatusDecision();
    });




    /*【TEST】 ユーザーエージェントコンソールログ
    ----------------------------------------*/


    if(ua_sp){
        console.log('SP');
    }

    else {
        console.log('PC');
    }




    /*【TEST】 IE判定実装
    ----------------------------------------*/


    /* IEか否か */
    var isIE        = false,

    /* IEのバージョン */
        version     = null;

    /* IEであるか否かの判定 */
    if (user_agent.match(/MSIE/) || user_agent.match(/Trident/)){
        isIE        = true;
        version     = user_agent.match(/(MSIE\s|rv:)([\d\.]+)/)[2];
        version     = parseInt(version);
        console.log('IE : Ver:', version);
    }




    /*【TEST】 Chrome判定実装
    ----------------------------------------*/


    /* Chromeか否か */
    var isChrome    = false,

    /* Chromeのバージョン */
        version     = null;

    /* IEであるか否かの判定 */
    if (user_agent.match(/Chrome/)){
        isChrome    = true;
        version     = user_agent.match(/(Chrome)([\0-9\.]+)/)[2];
        // version     = parseInt(version);
        console.log('Chrome : Ver:', version);
    }

    $('#test03b').html('Chrome Ver:' + version);




    /* 【TEST】 Cookie読み込み
    ----------------------------------------*/
    function cookiePC (){
        var cookiePCAdd = $.cookie('PC', '1', { expires: 365 , path: '/' }),
            cookieSPRemove = $.removeCookie('SP', { path: '/' });
    }

    function cookieSP (){
        var cookieSPAdd = $.cookie('SP', '2', { expires: 365 , path: '/' }),
            cookiePCRemove = $.removeCookie('PC', { path: '/' });
    }

    if(ua_sp){
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

            var items = [];
            $.each(data, function(key, val){
                items.push('<li id=' + key + '>' + val + '</li>');
            });

            $('<ul/>',{
                'class':    'my-new-list',
                html:       items.join('')
            }).appendTo('#test05');

        });

    }


    if (header_navi_1st.length || header_navi_1st_none.length){
        testJsonSelect('./');
    }

    else if (header_navi_2nd.length){
        testJsonSelect('../');
    }

    else if (header_navi_3rd.length){
        testJsonSelect('../../');
    }




    /*【TEST】 btn-hover実装
    ----------------------------------------*/


    function btnHoverSelect(rootDir){

        return $.ajax ({

                type:   'GET',
                url:    rootDir + 'include/btn.html',

            }).done(function(btn){

                btn = btn.replace(/\{\$root\}/g, rootDir);
                $('#hover').append(btn);

        });

    }


    if (ua_sp){

    }

    else if (header_navi_1st.length || header_navi_1st_none.length){
        btnHoverSelect('./');
    }

    else if (header_navi_2nd.length){
        btnHoverSelect('../');
    }

    else if (header_navi_3rd.length){
        btnHoverSelect('../../');
    }

    else {

    }




}(jQuery));