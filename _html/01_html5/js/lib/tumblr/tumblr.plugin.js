// JavaScript Jquery PlugIns Document




/*----------------------------------------------------

・Setup
　→TumblrのAPI設定
　→TumblrのJson読み出し
　→Jsonを元にHTMLに整形

・Function
　→画像をフルサイズにリサイズ
　→スライドする為の設定とカスタマイズ

----------------------------------------------------*/




(function ($){


'use strict';


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
        ua_sp               = userAgent.indexOf('iPhone') > 0 || userAgent.indexOf('iPad') > 0 || userAgent.indexOf('iPod') > 0 || userAgent.indexOf('Android') > 0 || userAgent.indexOf('BlackBerry') > 0 || userAgent.indexOf('windows Phone') > 0 || userAgent.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(userAgent),

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


    function getScript(rootDir){

        $.getScript(rootDir + 'js/lib/jquery/jquery.validate.min.js');
        $.getScript(rootDir + 'js/lib/jquery/jquery.validate.japlugin.js');
        $.getScript(rootDir + 'js/lib/jquery/jquery.kerning.min.js');
        $.getScript(rootDir + 'js/lib/jquery/jquery.colorbox.min.js');
        $.getScript(rootDir + 'js/lib/jquery/jquery.heightLine.min.js');
        $.getScript(rootDir + 'js/lib/jquery/moment.min.js');

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




    /* Tumblr
    ----------------------------------------------------*/


    // Tumblrの情報を取得 //
    var url = 'kik888.tumblr.com',
        key = 'DxAdNEP9PrL03Eq1H2duB0FHcqNETXBwAXbRVpxB1fjuBHmDUC';


    // JsonをAJAXで読み込む //
    $.getJSON('http://api.tumblr.com/v2/blog/' + url + '/posts?api_key=' + key + '&jsonp=?'　+　'&limit=20', function (data){


        $.each(data, function (index, val){


                $.each(val, function (k_post, v_post){


                    if (k_post == 'posts'){


                        for (var kp in v_post){

                            /* 引っ張ってくる情報 */
                            var data        = v_post[kp].date,
                                link        = v_post[kp].post_url,
                                type        = v_post[kp].type;


                            /* 日付け表示を変える */
                            var date        = moment(data).format('YYYY.M.D');
                                // date        = new Date(data),
                                // strDate = date.toLocaleDateString();


                            /* テキスト */
                            if (type == 'text'){

                                var title   = v_post[kp].title,
                                    content = v_post[kp].body;

                                $('.tumblr-test').append('<div class="post-' + type + '"><h1>' + title + '</h1>' + content + '</div>')

                            }


                            /* リンク */
                            else if (type == 'link'){

                                var link_ol = v_post[kp].url,
                                    title   = v_post[kp].title;

                                $('#tumblr-test').append('<div class="post-' + type + '"><a href="' + link_ol + '">' + title + '</a></div>')

                            }


                            /* 画像 */
                            else if (type == 'photo'){

                                $.each(v_post[kp].photos, function (k_photo, v_photo){

                                    $.each(v_photo, function (k, v){
                                        if (k == 'original_size'){

                                            for (var n in v){
                                                if (n == 'url'){

                                                    var image = v[n],
                                                        caption = v_post[kp].caption;

                                                    var bgHtml = function (index){

                                                        return '<div class="post-' + type + ' item text-color-white" style="background-image:url( ' + image + ' ); background-position: 50％ 50％;"><div class="box pd-20"><time class="block mb-40">' + date + '</time>' + caption + '<div class="post-cover">';

                                                    }


                                                    // $('#tumblr-test').append('<div class="post-' + type + '"><ul><li>' + data + '</li><li><a href="' + link + '">link</a></li></ul><img src="' + image + '"></div>');

                                                    // $('#tumblr-test').append('<li class="post-' + type + ' float-l"><a href="' + link + '"><img src=" ' + image + '"></a></li>');

                                                    // $('#tumblr-test').append('<li class="post-' + type + ' float-l"><a href="' + link + '"><img src=" ' + image + ' " class="post-img"></a></li>');


                                                    $('.carousel-inner').append(bgHtml).fadeIn();
                                                    $('.post-' + type + ':first').addClass('active');

                                                }
                                            }

                                        }
                                    });


                                });

                            }


                            /* 動画 */
                            else if (type == 'video'){

                                var caption = v_post[kp].caption;

                                $.each(v_post[kp].player, function (k_play, v_play){

                                    /* 動画のサイズ (0:幅250px 1:幅400px 2:幅500px) */
                                    if (k_play == 1){
                                        $.each(v_play, function (k, v){

                                            if (k == 'embed_code'){

                                                // $('#tumblr-test').append('<div class="post-' + type + '">' + v + '<ul><li><a href="' + link + '">link</a></li><li>' + caption + '</li></ul></div>');

                                                $('#tumblr-test').append('<li class="post-' + type + ' float-l"><div class="box thumb"><a href="' + link + '">' + v + '</a></div></li>');

                                            }

                                        });
                                    }

                                });

                            }


                        }




                    }


                });


        });




    });




/* Setup ここまで
------------------------------------------------------------------------------*/




/* Function
------------------------------------------------------------------------------*/




    // 読み込んだ背景画像をフルサイズ / スライダーに設定 //
    function bgSize(){

        /* 背景画像を全画面に */
        var $coverWidth            = $win.width(),
            $coverHeight           = $win.height() + 80;

        $('.post-cover, .post-photo').css({
            'width':    $coverWidth,
            'height':   $coverHeight,
        });

        /* スライダーのクラスを設定 */
        var $bgslider = $('#bg-slider');

        /* スライダーの設定 */
        $bgslider.carousel({
            interval: 10000
        });

    }


    // 読み込んだら実行 //
    bgSize();


    // リサイズしたら実行//
    $win.on('load resize', function(){
       bgSize();
    });


    // 遅延ロード //
    setTimeout(function(){
        $('#bg-slider').fadeIn();
    },1000);




/* Function ここまで
------------------------------------------------------------------------------*/




}(jQuery));