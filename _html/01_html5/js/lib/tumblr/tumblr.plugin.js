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




(function($) {




    /* Setup
    ------------------------------------------------------------------------------*/


        "use strict";


        // Tumblrの情報を取得 //
        url = "kik888.tumblr.com";
        key = "DxAdNEP9PrL03Eq1H2duB0FHcqNETXBwAXbRVpxB1fjuBHmDUC";




        // JsonをAJAXで読み込む //
        $.getJSON("http://api.tumblr.com/v2/blog/" + url + "/posts?api_key=" + key + "&jsonp=?"　+　"&limit=10", function (data) {


            $.each(data, function (index, val) {


                    $.each(val, function (k_post, v_post) {


                        if (k_post == 'posts') {




                            for (var kp in v_post) {

                                /* 引っ張ってくる情報 */
                                var data    = v_post[kp].date,
                                    link    = v_post[kp].post_url,
                                    type    = v_post[kp].type;


                                /* 日付け表示を変える */
                                date = new Date(data);
                                strDate = date.toLocaleDateString();


                                /* テキスト */
                                if (type == 'text') {

                                    var title   = v_post[kp].title,
                                        content = v_post[kp].body;

                                    $('.tumblr-test').append('<div class="post-' + type + '"><h1>' + title + '</h1>' + content + '</div>')

                                }


                                /* リンク */
                                else if (type == 'link') {

                                    var link_ol = v_post[kp].url,
                                        title   = v_post[kp].title;

                                    $('#tumblr-test').append('<div class="post-' + type + '"><a href="' + link_ol + '">' + title + '</a></div>')

                                }


                                /* 画像 */
                                else if (type == 'photo') {

                                    $.each(v_post[kp].photos, function (k_photo, v_photo) {

                                        $.each(v_photo, function (k, v) {
                                            if (k == 'original_size') {

                                                for (var n in v) {
                                                    if (n == 'url') {

                                                        var image = v[n],
                                                            caption = v_post[kp].caption;

                                                        function bgHtml(index) {

                                                            return '<div class="post-' + type + ' item text-color-white" style="background-image:url( ' + image + ' ); background-position: 50％ 50％;"><div class="box pd-20"><time class="block mb-40">' + strDate + '</time>' + caption + '<div class="post-cover">';

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
                                else if (type == 'video') {

                                    var caption = v_post[kp].caption;

                                    $.each(v_post[kp].player, function (k_play, v_play) {

                                        /* 動画のサイズ (0:幅250px 1:幅400px 2:幅500px) */
                                        if (k_play == 1) {
                                            $.each(v_play, function (k, v) {

                                                if (k == 'embed_code') {

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
        function bgSize() {

            /* 背景画像を全画面に */
            var window_width            = $(window).width();
            var window_height           = $(window).height() + 80;

            $('.post-cover, .post-photo').css({
                'width':    window_width,
                'height':   window_height,
            });

            /* スライダーのクラスを設定 */
            var bgslider = $('#bg-slider');

            /* スライダーの設定 */
            bgslider.carousel({
                interval: 10000
            });

        }


        // 読み込んだら実行 //
        bgSize();


        // リサイズしたら実行 //
        $(window).on('load resize', function() {
           bgSize();
        });


        // 遅延ロード //
        setTimeout(function() {
            $('#bg-slider').fadeIn();
        },1000);


        // // ローディング状況を取得する要素を指定 //
        // var $preload = $('img');


        // // 指定要素のsrcを格納するための配列 //
        // var obj_srcs = [];


        //  // .eachを使って、指定した要素を順番に参照していきsrcを配列に格納 //
        // $preload.each(function(){
        //     obj_srcs.push($(this).attr('src'));
        // });


        // var loader = new $.ImgLoader({
        //     srcs:       obj_srcs,
        //     pipesize:   1, // 同時にロードを行う要素の数。これだと3つごとに読み込み完了となる //
        //     delay:      1000, // 次のロード開始までの遅延時間を指定する //
        //     useXHR2:    true,
        //     timeout:    20000
        // });


        // // progressはローディングの進捗ごとに発生します //
        // loader.on('progress', function(progressInfo){
        //     // progressInfo.loadedRatioで進捗状況を0〜1で取得できます //
        //     console.log(progressInfo.loadedRatio);
        // });


        // // ファイルのロードが完了するごとに行う処理です //
        // loader.on('itemload', function($img){
        //     // 処理を記述 //
        //     console.log('アイテム読み込んだ');
        // });


        // //全てのロードが完了した際に行う処理です //
        // loader.on('allload', function($img){
        //     // 処理を記述 //
        //     console.log('全部読み込んだ');
        // });


        // // ローダーを起動します //
        // loader.load();


        // // ちなみに全てのロードを中断する場合は下記が用意されています //
        // loader.kill();




    /* Function ここまで
    ------------------------------------------------------------------------------*/




})(jQuery);