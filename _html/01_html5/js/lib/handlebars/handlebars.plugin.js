// JavaScript Jquery PlugIns Document




/*----------------------------------------------------

・Setup
　→グローバル変数の実装
　→AJAX非同期通信対応

・handlebars
　→handlebarsの設定
　→Json読み出し
　→外部Jsonを元にHTMLに整形

----------------------------------------------------*/




(function ($){


'use strict';


/* Setup
------------------------------------------------------------------------------*/




    /* グローバル変数
    ----------------------------------------*/


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
        ----------------------------------------


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


        ----------------------------------------
        */




/* Setup ここまで
------------------------------------------------------------------------------*/




/* handlebars
------------------------------------------------------------------------------*/




        $.ajaxSetup ({

            cache:  true,
            async:  true

        });


        /* アウトラインでソースを書き出すテスト */
        function testTumblrJson (rootDir){


            var $tumblr_test_raw_template = $('#tumblr-test').html(),
                tumblr_test_template = Handlebars.compile($tumblr_test_raw_template),
                $tumblr_test_placeHolder = $("#test20");

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


                console.log('JSONP success!');


                $.each(data.response.posts, function(i, item) {

                    console.log(data.response.posts[i].type, 'Load success!');

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

                });


                var tumblrhtml = tumblr_test_template(data);
                $tumblr_test_placeHolder.append(tumblrhtml);


            });


        }

        if ($headerNav1st.length || $headerNav1st_none.length){
            testTumblrJson('./');
        }

        else if ($headerNav2nd.length){
            testTumblrJson('../');
        }

        else if ($headerNav3rd.length){
            testTumblrJson('../../');
        }




        /* アウトラインでソースを書き出すテスト */
        function testHandlebarsListJson (rootDir){


            var $list_raw_template = $('#list-input').html(),
                list_template = Handlebars.compile($list_raw_template),
                $list_placeHolder = $("#test16");


            $.get(rootDir + 'ajax/list.json', function(listdata, liststatus, listxhr){

                /* if */
                // Handlebars.registerHelper('if', function(cond, opt){

                //     if (cond){
                //         return opt.fn(this);
                //     }

                // });

                Handlebars.registerHelper('list', function(context, options){

                    return "<ul>" + context.map(function(item){
                        return "<li>" + options.fn(item) + "</li>";
                    }).join("\n") + "</ul>";

                });

                var listhtml = list_template(listdata);
                $list_placeHolder.append(listhtml);

            });


        }

        if ($headerNav1st.length || $headerNav1st_none.length){
            testHandlebarsListJson('./');
        }

        else if ($headerNav2nd.length){
            testHandlebarsListJson('../');
        }

        else if ($headerNav3rd.length){
            testHandlebarsListJson('../../');
        }




        /* アウトラインでソースを書き出すテスト */
        function testHandlebarsJson (rootDir){


            var $test_raw_template = $('#json-test').html(),
                test_template = Handlebars.compile($test_raw_template),
                $test_placeHolder = $("#test17");


            $.get(rootDir + 'ajax/handlebars.json', function(data, status, xhr){

                /* セーブの数がある場合は表示、無ければ非表示 */
                Handlebars.registerHelper('showSavePoint', function(save, opt){

                    var savepoint = '';

                    if (save === '-'){
                        savepoint =  '';
                    }

                    else {
                        savepoint = save + 'S';
                    }

                    return savepoint;

                });


                /* コンディション */
                Handlebars.registerHelper('showCondition', function(cond, opt){

                    var condition = '';

                    if (cond > 80){
                        condition = 'Good';
                    }

                    else if (cond > 10){
                        condition = 'Normal';
                    }

                    else {
                        condition = 'Bad';
                    }

                    return condition;

                });


                /* if */
                Handlebars.registerHelper('if', function(cond, opt){

                    if (cond){
                        return opt.fn(this);
                    }

                });


                var html = test_template(data);
                $test_placeHolder.append(html);

            });


        }

        if ($headerNav1st.length || $headerNav1st_none.length){
            testHandlebarsJson('./');
        }

        else if ($headerNav2nd.length){
            testHandlebarsJson('../');
        }

        else if ($headerNav3rd.length){
            testHandlebarsJson('../../');
        }




        /* インラインでソースを書き出すテスト */
        function testHandlebarsJsonInline (){


            var values = {

                "director": [

                    {
                        "name":           "みはら",
                        "job":            "かんとく",
                        "win":            1687,
                        "lose":           1453,
                        "current_hp":     0,
                        "isLive":         false
                    },
                    {
                        "name":           "つるおか",
                        "job":            "コーチ",
                        "win":            1773,
                        "lose":           1140,
                        "current_hp":     0,
                        "isLive":         false
                    },
                    {
                        "name":           "かわかみ",
                        "job":            "コーチ",
                        "win":            1066,
                        "lose":           739,
                        "current_hp":     0,
                        "isLive":         false
                    },
                    {
                        "name":           "なかにし",
                        "job":            "コーチ",
                        "win":            748,
                        "lose":           811,
                        "current_hp":     40,
                        "isLive":         true
                    },
                    {
                        "name":           "ごんどう",
                        "job":            "コーチ",
                        "win":            219,
                        "lose":           186,
                        "current_hp":     100,
                        "isLive":         true
                    },
                    {
                        "name":           "ふじた",
                        "job":            "コーチ",
                        "win":            516,
                        "lose":           361,
                        "current_hp":     0,
                        "isLive":         false
                    },
                    {
                        "name":           "おおぎ",
                        "job":            "コーチ",
                        "win":            988,
                        "lose":           815,
                        "current_hp":     0,
                        "isLive":         false
                    },
                    {
                        "name":           "こば",
                        "job":            "コーチ",
                        "win":            873,
                        "lose":           791,
                        "current_hp":     100,
                        "isLive":         true
                    }

                ],


                "roster_fielder": [

                    {
                        "name":           "ふくもと",
                        "job":            "ライト",
                        "avg":            291,
                        "hr":             21,
                        "current_hp":     100,
                        "isLive":         true
                    },
                    {
                        "name":           "もりみち",
                        "job":            "セカンド",
                        "avg":            272,
                        "hr":             24,
                        "current_hp":     100,
                        "isLive":         true
                    },
                    {
                        "name":           "ミスタG",
                        "job":            "サード",
                        "avg":            305,
                        "hr":             39,
                        "current_hp":     20,
                        "isLive":         true
                    },
                    {
                        "name":           "おう",
                        "job":            "ファースト",
                        "avg":            301,
                        "hr":             55,
                        "current_hp":     50,
                        "isLive":         true
                    },
                    {
                        "name":           "ラミちゃん",
                        "job":            "レフト",
                        "avg":            301,
                        "hr":             49,
                        "current_hp":     100,
                        "isLive":         true
                    },
                    {
                        "name":           "のむさん",
                        "job":            "キャッチャー",
                        "avg":            277,
                        "hr":             52,
                        "current_hp":     100,
                        "isLive":         true
                    },
                    {
                        "name":           "あきやま",
                        "job":            "センター",
                        "avg":            270,
                        "hr":             43,
                        "current_hp":     60,
                        "isLive":         true
                    },
                    {
                        "name":           "こまだ",
                        "job":            "しめいだしゃ",
                        "avg":            289,
                        "hr":             27,
                        "current_hp":     100,
                        "isLive":         true
                    },
                    {
                        "name":           "たくろう",
                        "job":            "ショート",
                        "avg":            282,
                        "hr":             10,
                        "current_hp":     100,
                        "isLive":         true
                    },
                    {
                        "name":           "ゴジラ",
                        "job":            "ライト",
                        "avg":            282,
                        "hr":             50,
                        "current_hp":     100,
                        "isLive":         true
                    },
                    {
                        "name":           "こくぼ",
                        "job":            "セカンド",
                        "avg":            273,
                        "hr":             44,
                        "current_hp":     100,
                        "isLive":         true
                    },
                    {
                        "name":           "えのもと",
                        "job":            "ファースト",
                        "avg":            298,
                        "hr":             24,
                        "current_hp":     0,
                        "isLive":         false
                    },
                    {
                        "name":           "おちあい",
                        "job":            "サード",
                        "avg":            311,
                        "hr":             52,
                        "current_hp":     60,
                        "isLive":         true
                    },
                    {
                        "name":           "アニキ",
                        "job":            "レフト",
                        "avg":            285,
                        "hr":             40,
                        "current_hp":     60,
                        "isLive":         true
                    },
                    {
                        "name":           "ふるた",
                        "job":            "キャッチャー",
                        "avg":            294,
                        "hr":             30,
                        "current_hp":     80,
                        "isLive":         true
                    },
                    {
                        "name":           "こうじ",
                        "job":            "センター",
                        "avg":            290,
                        "hr":             44,
                        "current_hp":     80,
                        "isLive":         true
                    },
                    {
                        "name":           "かどた",
                        "job":            "しめいだしゃ",
                        "avg":            289,
                        "hr":             44,
                        "current_hp":     100,
                        "isLive":         true
                    },
                    {
                        "name":           "けんじろう",
                        "job":            "ショート",
                        "avg":            285,
                        "hr":             32,
                        "current_hp":     100,
                        "isLive":         true
                    }
                ],

                roster_pitcher: [

                    {
                        "name":           "かねやん",
                        "job":            "せんぱつ",
                        "win":            31,
                        "lose":           14,
                        "save":           "-",
                        "era":            1.31,
                        "current_hp":     40,
                        "isLive":         true
                    },
                    {
                        "name":           "こやま",
                        "job":            "せんぱつ",
                        "win":            30,
                        "lose":           12,
                        "save":           "-",
                        "era":            2.47,
                        "current_hp":     40,
                        "isLive":         true
                    },
                    {
                        "name":           "よねだ",
                        "job":            "せんぱつ",
                        "win":            25,
                        "lose":           17,
                        "save":           "-",
                        "era":            3.19,
                        "current_hp":     50,
                        "isLive":         true
                    },
                    {
                        "name":           "すずき",
                        "job":            "せんぱつ",
                        "win":            25,
                        "lose":           10,
                        "save":           0,
                        "era":            2.02,
                        "current_hp":     80,
                        "isLive":         true
                    },
                    {
                        "name":           "てつわんI",
                        "job":            "せんぱつ",
                        "win":            42,
                        "lose":           14,
                        "save":           "-",
                        "era":            1.69,
                        "current_hp":     0,
                        "isLive":         false
                    },
                    {
                        "name":           "サンデC",
                        "job":            "せんぱつ",
                        "win":            21,
                        "lose":           11,
                        "save":           4,
                        "era":            1.82,
                        "current_hp":     100,
                        "isLive":         true
                    },
                    {
                        "name":           "やまだ",
                        "job":            "リリーフ",
                        "win":            26,
                        "lose":           7,
                        "save":           5,
                        "era":            2.39,
                        "current_hp":     70,
                        "isLive":         true
                    },
                    {
                        "name":           "ひがしお",
                        "job":            "リリーフ",
                        "win":            23,
                        "lose":           15,
                        "save":           7,
                        "era":            2.38,
                        "current_hp":     100,
                        "isLive":         true
                    },
                    {
                        "name":           "やまもとまさ",
                        "job":            "リリーフ",
                        "win":            19,
                        "lose":           8,
                        "save":           0,
                        "era":            3.49,
                        "current_hp":     100,
                        "isLive":         true
                    },
                    {
                        "name":           "えなつ",
                        "job":            "リリーフ",
                        "win":            25,
                        "lose":           12,
                        "save":           "-",
                        "era":            2.13,
                        "current_hp":     40,
                        "isLive":         true
                    },
                    {
                        "name":           "たかつ",
                        "job":            "リリーフ",
                        "win":            0,
                        "lose":           4,
                        "save":           37,
                        "era":            2.61,
                        "current_hp":     100,
                        "isLive":         true
                    },
                    {
                        "name":           "だいまじん",
                        "job":            "リリーフ",
                        "win":            1,
                        "lose":           1,
                        "save":           45,
                        "era":            0.64,
                        "current_hp":     100,
                        "isLive":         true
                    }

                ]

            };


            var $raw_template = $('#input').html();
            var template = Handlebars.compile($raw_template);

            /* セーブの数がある場合は表示、無ければ非表示 */
            Handlebars.registerHelper('showSavePoint', function(save, opt){

                var savepoint = '';

                if (save === '-'){
                    savepoint =  '';
                }

                else {
                    savepoint = save + 'セーブ';
                }

                return savepoint;

            });


            /* コンディション */
            Handlebars.registerHelper('showCondition', function(cond, opt){

                var condition = '';

                if (cond > 80){
                    condition = 'すごくげんき';
                }

                else if (cond > 10){
                    condition = 'げんき';
                }

                else {
                    condition = 'ひんし';
                }

                return condition;

            });


            /* if */
            Handlebars.registerHelper('if', function(cond, opt){

                if (cond){
                    return opt.fn(this);
                }

            });


            $('#test18').html(template(values));


        }


        testHandlebarsJsonInline();




/* handlebars ここまで
------------------------------------------------------------------------------*/




}(jQuery));