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




    // Tumblrの情報を取得 //
    var domain = 'kik888.tumblr.com',
        api_key = 'DxAdNEP9PrL03Eq1H2duB0FHcqNETXBwAXbRVpxB1fjuBHmDUC';


    // JsonをAJAXで読み込む //
    $.getJSON('http://api.tumblr.com/v2/blog/' + domain + '/posts?api_key=' + api_key + '&jsonp=?'　+　'&limit=20', function (data){



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


                                                    $('#tumblr-test').append('<li class="post-graphic-' + type + ' float-l"><a href="' + link + '"><img src=" ' + image + ' " class="post-img"></a><time class="block mb-40">' + date + '</time>' + caption + '</li>');


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




/* Function ここまで
------------------------------------------------------------------------------*/




}(jQuery));