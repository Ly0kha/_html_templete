// JavaScript Jquery PlugIns Document




/*----------------------------------------------------

・Setup
　→グローバル変数の実装
　→AJAX非同期通信対応

・Tumblr
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

        cache:  true,
        async:  true

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
    var domain = 'kik888.tumblr.com',
        apiKey = 'DxAdNEP9PrL03Eq1H2duB0FHcqNETXBwAXbRVpxB1fjuBHmDUC',
        apiUrl = 'http://api.tumblr.com/v2/blog/' + domain + '/posts?api_key=' + apiKey + '&jsonp=?&limit=10';


    // Jsonをajaxで読み込む //
    $.ajax ({

        type:       'GET',
        url:        apiUrl,
        dataType:   'jsonp'

    }).done(function(data){


        console.log('ajax success!');


        $.each(data.response.posts, function(i, item) {

            console.log(data.response.posts[i].type);

            /* 引っ張ってくる情報 */
            var dateData    = data.response.posts[i].date,
                title       = data.response.posts[i].title,
                link        = data.response.posts[i].post_url,
                type        = data.response.posts[i].type,
                tags        = data.response.posts[i].tags,
                images      = data.response.posts[i].photos[0].alt_sizes[0].url,
                caption     = data.response.posts[i].caption;


            /* 日付け表示を変える */
            var date        = moment(dateData).format('YYYY.M.D');

            var captionHtml = function(item){

                return '<div class="box mb-40"><div class="box mb-20"><img src="' + images + '" /></div><time class="block mb-20">' + date + '</time>' + caption + '</div>';

            }

            $('#test19').append(captionHtml).fadeIn();

        });


    });


    // JsonをgetJSONで読み込む //
    $.getJSON('http://api.tumblr.com/v2/blog/' + domain + '/posts?api_key=' + apiKey + '&jsonp=?'　+　'&limit=20', function (data){


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