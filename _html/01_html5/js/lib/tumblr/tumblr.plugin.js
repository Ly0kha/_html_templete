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




var GLOBAL = GLOBAL || self;




window.onload = (function(global) {




/* Setup
------------------------------------------------------------------------------*/




    // Tumblrの情報を取得 //
    url = "kik888.tumblr.com";
    key = "DxAdNEP9PrL03Eq1H2duB0FHcqNETXBwAXbRVpxB1fjuBHmDUC";




    // JsonをAJAXで読み込む //
    $.getJSON("http://api.tumblr.com/v2/blog/" + url + "/posts?api_key=" + key + "&jsonp=?"　+　"&limit=10", function (data) {


        $.each(data, function (index, val) {


                $.each(val, function (k_post, v_post) {


                    if (k_post == 'posts') {




                        for (var kp in v_post) {


                            var data = v_post[kp].date,
                                link = v_post[kp].post_url,
                                type = v_post[kp].type;


                            /* テキスト */
                            if (type == 'text') {

                                var title   = v_post[kp].title,
                                    content = v_post[kp].body;

                                $('#tumblr-test').append('<div class="post-' + type + '"><h1>' + title + '</h1>' + content + '</div>')

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

                                                    var image = v[n];

                                                    function bgHtml(index) {

                                                        return '<div class="post-' + type + ' item" style="background-image:url( ' + image + ' ); background-position: 50％ 50％;"><div class="post-cover">';

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




/* Function
------------------------------------------------------------------------------*/




    // 読み込んだ背景画像をフルサイズ / スライダーに設定 //
    function bgSize() {

        /* 背景画像を全画面に */
        var window_width            = $(window).width();
        var window_height           = $(window).height() + 80;

        $('.post-cover, .post-photo').css({
            'width':  window_width,
            'height':  window_height,
        });

        /* スライダーのクラスを設定 */
        var bgslider = $('#bg-slider');

        /* スライダーの設定 */
        bgslider.carousel({
            interval: 8000
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
    },3000);




})((this || 0).self || global);