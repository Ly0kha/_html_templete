    // tutorial21.js
    var ListBox = React.createClass({

        var domain = 'kik888.tumblr.com';

        // https://www.tumblr.com/oauth/apps にて登録
        var api_key = 'DxAdNEP9PrL03Eq1H2duB0FHcqNETXBwAXbRVpxB1fjuBHmDUC';

        $.ajax({
            url:  'http://api.tumblr.com/v2/blog/' + domain + '/posts?api_key=' + api_key,
            dataType: 'jsonp'
        }).done(function(evt) {
            var img = new Image();
            var ms = 200;

            try {
                $('#post').fadeIn(ms);
                $('#post-ttl').text(evt.response.posts[0].title);
                $('#post-body').html(evt.response.posts[0].body);
                $('#post-footer').text(evt.response.posts[0].date);
                $('#post-tags').text('Tagged: ' + evt.response.posts[0].tags + '.');

                $('#post-link').attr({
                    href: evt.response.posts[0].post_url,
                    target: '_blank'
                });
            } catch(err) {
                console.log(err);
            }

        });

    });



    ReactDOM.render(
        <ListBox />,
        document.getElementById('content02')
    );



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
