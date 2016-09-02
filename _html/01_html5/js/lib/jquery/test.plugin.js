// JavaScript Jquery PlugIns Document




/*----------------------------------------------------

・Setup
　→グローバル変数の実装
　→AJAX非同期通信対応

・TEST
　→グローバル変数の実装
　→AJAX非同期通信対応

----------------------------------------------------*/




var GLOBAL = GLOBAL || self;




(function(global){


"use strict";


/* AJAX Setup
------------------------------------------------------------------------------*/




    /* グローバル変数
    ----------------------------------------------------*/


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

        var window_width    = $(window).width();
        var window_height   = $(window).height();

        $('#test01').html('ウィンドウ幅' + '&nbsp;:&nbsp;' + window_width);
        $('#test02').html('ウィンドウ高さ' + '&nbsp;:&nbsp;' + window_height);
        $('#test03').html('ユーザーエージェント' + '&nbsp;:&nbsp;' + '<br />' + user_agent);
        $('#test04').html('現在のディレクトリ' + '&nbsp;:&nbsp;' + currentDir);

    }


    $(window).on('load resize', function(){
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
    var isIE        = false;

    /* IEのバージョン */
    var version     = null;

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
    var isChrome    = false;

    /* Chromeのバージョン */
    var version     = null;

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
        var cookiePCAdd = $.cookie('PC', '1', { expires: 365 , path: '/' });
        var cookieSPRemove = $.removeCookie('SP', { path: '/' });
    }

    function cookieSP (){
        var cookieSPAdd = $.cookie('SP', '2', { expires: 365 , path: '/' });
        var cookiePCRemove = $.removeCookie('PC', { path: '/' });
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




})((this || 0).self || global);