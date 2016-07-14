// JavaScript Jquery PlugIns Document



var GLOBAL = GLOBAL || self;




window.onload = (function(global) {




    url = "kik888.tumblr.com";
    key = "DxAdNEP9PrL03Eq1H2duB0FHcqNETXBwAXbRVpxB1fjuBHmDUC";

    $.getJSON("http://api.tumblr.com/v2/blog/" + url + "/posts?api_key=" + key + "&jsonp=?"　+　"&limit=50", function (data) {


        $.each(data, function (index, val) {


                $.each(val, function (k_post, v_post) {


                    if (k_post == 'posts') {




                        for (var kp in v_post) {


                            var data = v_post[kp].date,
                                link = v_post[kp].post_url,
                                type = v_post[kp].type;


                            if (type == 'text') {

                                // ブログ
                                var title   = v_post[kp].title,
                                    content = v_post[kp].body;

                                $('#tumblr-test').append('<div class="post-' + type + '"><h1>' + title + '</h1>' + content + '</div>')

                            }


                            else if (type == 'link') {

                                // リンク
                                var link_ol = v_post[kp].url,
                                    title   = v_post[kp].title;

                                $('#tumblr-test').append('<div class="post-' + type + '"><a href="' + link_ol + '">' + title + '</a></div>')

                            }


                            else if (type == 'photo') {

                                // 画像
                                $.each(v_post[kp].photos, function (k_photo, v_photo) {

                                    $.each(v_photo, function (k, v) {
                                        if (k == 'original_size') {

                                            for (var n in v) {
                                                if (n == 'url') {

                                                    var image = v[n];

                                                    // $('#tumblr-test').append('<div class="post-' + type + '"><ul><li>' + data + '</li><li><a href="' + link + '">link</a></li></ul><img src="' + image + '"></div>');

                                                    $('#tumblr-test').append('<li class="post-' + type + ' float-l"><a href="' + link + '"><img src=" ' + image + '" class="thumb"></a></li>');

                                                }
                                            }

                                        }
                                    });


                                });

                            }


                            else if (type == 'video') {

                                // 動画
                                var caption = v_post[kp].caption;
                                $.each(v_post[kp].player, function (k_play, v_play) {

                                    // 動画のサイズ（0:幅250px 1:幅400px 2:幅500px ）
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


})((this || 0).self || global);