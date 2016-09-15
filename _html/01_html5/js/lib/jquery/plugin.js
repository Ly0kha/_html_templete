// JavaScript Jquery PlugIns Document




/*----------------------------------------------------

・Setup
　→グローバル変数の実装
　→AJAX非同期通信対応

・Common UI
　→UI動作で必要な実装

・Lightbox
　→モーダルウィンドウの実装

・Validate
　→メールのバリデート実装

・MailForm
　→メールフォームのレイアウト、挙動に関わる実装

・Suggest
　→検索からサジェストを出す実装

・LanguageChange
　→Cookieを利用した言語切替や判定の実装

・SNSAPI
　→Twitter、FacebookなどのSNS API処理の実装

・Kerning / Centering Adjust
　→カーニングやセンタリングの実装

・Device Adjust
　→PC版とのレイアウトや挙動の切替、SPの特定端末における挙動対策、等

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




/* AJAX Setup ここまで
------------------------------------------------------------------------------*/




/* Common UI
------------------------------------------------------------------------------*/




    /* header / footer共通化
    ----------------------------------------------------*/


    function headerSelect(rootDir){

        return $.ajax ({

                type:   'GET',
                url:    rootDir + 'include/header.html'

            }).done(function(html){

                html = html.replace(/\{\$root\}/g, rootDir);
                $header.append(html);

        });

    }


    function footerSelect(rootDir){

        return $.ajax ({

                type:   'GET',
                url:    rootDir + 'include/footer.html'

            }).done(function(html){

                html = html.replace(/\{\$root\}/g, rootDir);
                $footer.append(html);

        });

    }


    if ($headerNav1st.length){
        headerSelect('./');
        footerSelect('./');
    }

    else if ($headerNav2nd.length){
        headerSelect('../');
        footerSelect('../');
    }

    else if ($headerNav3rd.length){
        headerSelect('../../');
        footerSelect('../../');
    }

    else if ($headerNav1st_none.length){

    }




    /* dt adjust -- 定義タグで表組する場合
    ----------------------------------------------------*/


    // dtの幅を定義して、dtに応じてddのマージンを調整しdt,ddでの表組を作る //
    function dtAdjust(){

        /* dtの幅 */
        var $dtColumnWidth   = $('dl.column dt').width(),
            $dtNewsWidth     = $('dl.news dt').width();

        /* 可変部分の高さを適用 */
        $('dl.column dd').css('margin-left', $dtColumnWidth + 20 + 'px');
        $('dl.news dd').css('margin-left', $dtNewsWidth  + 'px');

    }


    // DOM 読み込み / リサイズ //
    $win.on('load resize', function(){
        dtAdjust();
    });




    /* PageScroll -- ページスクロール
    ----------------------------------------------------*/


    // ページスクロール //
    function pagescroll(){

        return $.getScript('//cdnjs.cloudflare.com/ajax/libs/velocity/1.2.3/velocity.min.js', function(){

            $('a[rel=scroll]').on('click', function(){

                /* リンクの判定 */
                var $href        = $(this).attr('href'),
                    $target      = $($href === "#" || $href === "" ? 'html' : $href);

                /* アンカーリンクへスクロール */
                $target.velocity('scroll', {
                    offset:     -50,
                    duration:   2000,
                    easing:     'easeInOutQuart'
                });
                return false;

            });

        });

    }


    pagescroll();




    /* Slider -- スライダー
    ----------------------------------------------------*/


    // スライダーのクラスを設定 //
    var $carouselslider = $('#carousel-slider');

    $carouselslider.carousel({
        interval: 8000
    });


    // スライダーにタッチスワイプを実装する -SP- //
    function carouselSliderFlick(){

        var $carousel = new Hammer($carouselslider[0]);

        /* 左にスワイプしたら次の画像に切り替え */
        $carousel.on('swipeleft', function(){
            $carouselslider.carousel('next');
        });

        /* 右にスワイプしたら前の画像に切り替え */
        $carousel.on('swiperight', function(){
            $carouselslider.carousel('prev');
        });

    }


    // ソースにスライダー用のid名が含まれていたらタッチスワイプを発火する -SP- //
    if ($carouselslider.length){
        carouselSliderFlick();
    }




    /* Tabs -- タブ
    ----------------------------------------------------*/


    $('#tabs').tabs({

        collapsible:    false,
        show:           { effect: 'fadeIn', duration: 800 },
        fx:             { height: 'toggle', opacity: 'toggle', duration: 300 }

    });




    /* WindowClose -- 別窓を閉じる
    ----------------------------------------------------*/


    function quitBox(cmd){

        if (cmd=='quit'){
            open(location, '_self').close();
        }
        return false;

    }




    /* MouseOver -- マウスオーバー
    ----------------------------------------------------*/


    // マウスオーバー時の挙動を設定 //
    function mouseOver(i){

        var imgArr = i ;

        switch (imgArr){

            case 'on' :

                $('img.img-mouseover').each(function(){
                    $(this).prop('src', $(this).prop('src').replace('_off', '_on'));
                });
                break;

            case 'off' :

                $('img.img-mouseover').each(function(){
                    $(this).prop('src', $(this).prop('src').replace('_on', '_off'));
                });
                break;

            default :

                break;

        }

    }


    // PCのみ発火 //
    if (ua_sp){

        $('img.img-mouseover').on({

            'mouseenter': function(){
                mouseOver();
            },

            'mouseleave': function(){
                mouseOver();
            }

        });

    }

    else {

        $('img.img-mouseover').on({

            'mouseenter': function(){
                mouseOver('on');
            },

            'mouseleave': function(){
                mouseOver('off');
            }

        });

    }




    /* TargetBlank
       for IE8 -- target="_blank" を class="blank" で動かす
    ----------------------------------------------------*/


    // クリックしたらアンカーリンクをブランクで動作 //
    $('.blank').on('click', function(){

        /* リンクの判定 */
        var $href = $(this).attr('href');

        window.open($href, '_blank');
        return false;

    });




/* Common UI ここまで
------------------------------------------------------------------------------*/




/* Lightbox
------------------------------------------------------------------------------*/




    // ライトボックス(colorbox)の実行スクリプト //
    function colorbox(rootDir){

        $.getScript(rootDir + 'js/lib/jquery/jquery.colorbox.min.js', function(){

            /* 用途別colorbox実行スクリプト */
            $('.group1').colorbox({

                rel:            'group1',
                transition:     'fade',
                slideshow:      false,

                fixed:          true,
                maxWidth:       '90%',
                maxHeight:      '90%',
                reposition:     true,
                opacity:        '0.3',

                retinaImage:    false,
                retinaUrl:      false

            });

            $('.group2').colorbox({

                rel:            'group2',
                transition:     'fade',
                slideshow:      false,

                fixed:          true,
                maxWidth:       '90%',
                maxHeight:      '90%',
                reposition:     true,
                opacity:        '0.3',

                retinaImage:    false,
                retinaUrl:      false

            });

            /* オプション */
            $('.ajax').colorbox();

            $('.youtube').colorbox({

                iframe:         true,
                innerWidth:     640,
                innerHeight:    390

            });

            $('.vimeo').colorbox({

                iframe:         true,
                innerWidth:     500,
                innerHeight:    409

            });

            $('.iframe').colorbox({

                iframe:         true,
                width:          '80%',
                height:         '80%'

            });

            $('.inline').colorbox({

                inline:         true,
                width:          '50%'

            });

            $('.callbacks').colorbox({

                onOpen:     function(){
                    alert('onOpen: colorbox is about to open');
                },
                onLoad:     function(){
                    alert('onLoad: colorbox has started to load the targeted content');
                },
                onComplete: function(){
                    alert('onComplete: colorbox has displayed the loaded content');
                },
                onCleanup:  function(){
                    alert('onCleanup: colorbox has begun the close process');
                },
                onClosed:   function(){
                    alert('onClosed: colorbox has completely closed');
                }

            });

            $('.non-retina').colorbox({

                rel:            'group5',
                transition:     'none'

            });

            $('.retina').colorbox({

                rel:            'group5',
                transition:     'none',
                retinaImage:    true,
                retinaUrl:      true

            });

            /* inlineで呼び出すcolorbox実行スクリプト例 */
            $('#click').on('click', function(){

                $('#click').css({

                    'background-color': '#f00',
                    'color':            '#fff',
                    'cursor':           'inherit'

                }).text("Open this window again and this message will still be here.");
                return false;

            });

        });

    }


    if ($headerNav1st.length || $headerNav1st_none.length){
        colorbox('./');
    }

    else if ($headerNav2nd.length){
        colorbox('../');
    }

    else if ($headerNav3rd.length){
        colorbox('../../');
    }




/* Lightbox ここまで
------------------------------------------------------------------------------*/




/* Form
------------------------------------------------------------------------------*/




    /* Validate -- バリデートの制御
    ----------------------------------------------------*/




        // Submitを押したときのバリデート判定 Jp:日本語  //
        $('input#btn-confirm-on-ja').on('click', function(){

            /* エラー判定 */
            $('#inquiry-form-jp').validate({

                ignore: '.ignore',
                rules: {

                    inquiryListJp : {
                        required:   true
                    },
                    inquiryCompanyNameJp : {
                        required:   true
                    },
                    inquiryNameJaJp : {
                        required:   true,
                        kana:       true
                    },
                    inquiryNameEnJp : {
                        required:   true,
                        alphabet:   true
                    },
                    inquiryMailJp : {
                        required:   true,
                        alphabet:   true,
                        email:      true
                    },
                    inquiryTextJp : {
                        required:   true
                    }

                },
                messages: {

                    inquiryListJp : {
                        required:   '※お問い合わせ内容をお選び下さい。'
                    },
                    inquiryCompanyNameJp : {
                        required:   '※必須項目です。'
                    },
                    inquiryNameJaJp : {
                        required:   '※必須項目です。',
                        kana:       '※全角文字で入力して下さい。'
                    },
                    inquiryNameEnJp : {
                        required:   '※必須項目です。',
                        alphabet:   '※半角英数で入力して下さい。'
                    },
                    inquiryMailJp : {
                        required:   '※必須項目です',
                        alphabet:   '※半角英数で入力して下さい。',
                        email:      '※メールアドレスを入力してください。'
                    },
                    inquiryTextJp : {
                        required:   '※必須項目です。'
                    }

                }

            });


            /* エラーが出た箇所へ飛ぶ */
            function validateScrollJp(i){

                var caseArr = i ;

                switch (caseArr){

                    case 'inquiry-list-jp' :

                        /* アンカーの判定 */
                        var $target = $('#inquiry-list-jp');

                        /* アンカーリンクへスクロール */
                        $target.velocity('scroll', {
                            duration:   500,
                            easing:     'easeOutExpo'
                        });
                        return false;
                        break;

                    case 'inquiry-companyName-jp' :

                        /* アンカーの判定 */
                        var $target = $('#inquiry-companyName-jp');

                        /* アンカーリンクへスクロール */
                        $target.velocity('scroll', {
                            duration:   500,
                            easing:     'easeOutExpo'
                        });
                        return false;
                        break;

                    case 'inquiry-nameJa-jp' :

                        /* アンカーの判定 */
                        var $target = $('#inquiry-nameJa-jp');

                        /* アンカーリンクへスクロール */
                        $target.velocity('scroll', {
                            duration:   500,
                            easing:     'easeOutExpo'
                        });
                        return false;
                        break;

                    case 'inquiry-nameEn-jp' :

                        /* アンカーの判定 */
                        var $target = $('#inquiry-nameEn-jp');

                        /* アンカーリンクへスクロール */
                        $target.velocity('scroll', {
                            duration:   500,
                            easing:     'easeOutExpo'
                        });
                        return false;
                        break;

                    case 'inquiry-mail-jp' :

                        /* アンカーの判定 */
                        var $target = $('#inquiry-mail-jp');

                        /* アンカーリンクへスクロール */
                        $target.velocity('scroll', {
                            duration:   500,
                            easing:     'easeOutExpo'
                        });
                        return false;
                        break;

                    case 'inquiry-text-jp' :

                        /* アンカーの判定 */
                        var $target = $('#inquiry-text-jp');

                        /* アンカーリンクへスクロール */
                        $target.velocity('scroll', {
                            duration:   500,
                            easing:     'easeOutExpo'
                        });
                        return false;
                        break;

                }

            }


            if ($('input#form-inquiryList-jp').val() === ''){
                validateScrollJp('inquiry-list-jp');
            }

            else if ($('input#form-inquiryCompanyName-jp').val() === ''){
                validateScrollJp('inquiry-companyName-jp');
            }

            else if ($('input#form-inquiryNameJa-jp').val() === ''){
                validateScrollJp('inquiry-nameJa-jp');
            }

            else if ($('input#form-inquiryNameEn-jp').val() === ''){
                validateScrollJp('inquiry-nameEn-jp');
            }

            else if ($('input#form-inquiryMail-jp').val() === ''){
                validateScrollJp('inquiry-mail-jp');
            }

            else if ($('textarea#form-inquiryText-jp').val() === ''){
                validateScrollJp('inquiry-text-jp');
            }

        });


        // Submitを押したときのバリデート判定 En:英語  //
        $('input#btn-confirm-on-en').on('click', function(){

            /* エラー判定 */
            $('#inquiry-form-en').validate({

                ignore: '.ignore',
                rules: {

                    inquiryListEn : {
                        required:   true
                    },
                    inquiryCompanyNameEn : {
                        required:   true
                    },
                    inquiryNameEnEn : {
                        required:   true,
                        alphabet:   true
                    },
                    inquiryMailEn : {
                        required:   true,
                        alphabet:   true,
                        email:      true
                    },
                    inquiryTextEn : {
                        required:   true
                    }

                },
                messages: {

                    inquiryListEn : {
                        required:   '*Please select.'
                    },
                    inquiryCompanyNameEn : {
                        required:   '*Please enter your company name.'
                    },
                    inquiryNameEnEn : {
                        required:   '*Please enter your name.'
                    },
                    inquiryMailEn : {
                        required:   '*Please enter your e-mail address.',
                        alphabet:   '*Please enter the alphabet.',
                        email:      '*Your e-mail address is incorrect.'
                    },
                    inquiryTextEn : {
                        required:   '*Please enter xxx.'
                    }

                }

            });


            /* エラーが出た箇所へ飛ぶ */
            function validateScrollEn(i){

                var caseArr = i ;

                switch (caseArr){

                    case 'inquiry-list-en' :

                        /* アンカーの判定 */
                        var $target = $('#inquiry-list-en');

                        /* アンカーリンクへスクロール */
                        $target.velocity('scroll', {
                            duration:   500,
                            easing:     'easeOutExpo'
                        });
                        return false;
                        break;

                    case 'inquiry-companyName-en' :

                        /* アンカーの判定 */
                        var $target = $('#inquiry-companyName-en');

                        /* アンカーリンクへスクロール */
                        $target.velocity('scroll', {
                            duration:   500,
                            easing:     'easeOutExpo'
                        });
                        return false;
                        break;

                    case 'inquiry-nameEn-en' :

                        /* アンカーの判定 */
                        var $target = $('#inquiry-nameEn-en');

                        /* アンカーリンクへスクロール */
                        $target.velocity('scroll', {
                            duration:   500,
                            easing:     'easeOutExpo'
                        });
                        return false;
                        break;

                    case 'inquiry-mail-en' :

                        /* アンカーの判定 */
                        var $target = $('#inquiry-mail-en');

                        /* アンカーリンクへスクロール */
                        $target.velocity('scroll', {
                            duration:   500,
                            easing:     'easeOutExpo'
                        });
                        return false;
                        break;

                    case 'inquiry-text-en' :

                        /* アンカーの判定 */
                        var $target = $('#inquiry-text-en');

                        /* アンカーリンクへスクロール */
                        $target.velocity('scroll', {
                            duration:   500,
                            easing:     'easeOutExpo'
                        });
                        return false;
                        break;

                }

            }


            if ($('input#form-inquiryList-en').val() === ''){
                validateScrollEn('inquiry-list-en');
            }

            else if ($('input#form-inquiryCompanyName-en').val() === ''){
                validateScrollEn('inquiry-companyName-en');
            }

            else if ($('input#form-inquiryNameEn-en').val() === ''){
                validateScrollEn('inquiry-nameEn-en');
            }

            else if ($('input#form-inquiryMail-en').val() === ''){
                validateScrollEn('inquiry-mail-en');
            }

            else if ($('textarea#form-inquiryText-en').val() === ''){
                validateScrollEn('inquiry-text-en');
            }

        });




    /* Validate ここまで
    ----------------------------------------------------*/




    /* MailForm -- 各種ボタン、チェックボックスの制御
    ----------------------------------------------------*/




        // 同意する //
        function mailFormInputAbled(i){

            var caseArr = i ;

            switch (caseArr){

                case 'on' :

                    /* ボタンのdisabledを取る  */
                    $('input#btn-confirm-off-ja').prop('id', 'btn-confirm-on-ja').prop('disabled', false);
                    $('input#btn-confirm-off-en').prop('id', 'btn-confirm-on-en').prop('disabled', false);
                    $('input#btn-reset-off-ja').prop('id', 'btn-reset-on-ja').prop('disabled', false);
                    $('input#btn-reset-off-en').prop('id', 'btn-reset-on-en').prop('disabled', false);
                    return false;
                    break;

                case 'off' :

                    /* ボタンのdisabledを付与する  */
                    $('input#btn-confirm-on-ja').prop('id','btn-confirm-off-ja').prop('disabled', true);
                    $('input#btn-confirm-on-en').prop('id','btn-confirm-off-en').prop('disabled', true);
                    $('input#btn-reset-on-ja').prop('id','btn-reset-off-ja').prop('disabled', true);
                    $('input#btn-reset-on-en').prop('id','btn-reset-off-en').prop('disabled', true);
                    return false;
                    break;

            }

        }


        // 入力内容を消す //
        function mailFormInputReset(){

            /* バリデート注意文言を消す */
            $('label.error').html('').hide();

            /* サジェスト部分の注意文言及び以下の値を消す
                [input type='hidden']
                [input type='text']
                [textarea]                       */
            $('p#form-inquiryListDisplay-jp, p#form-inquiryListDisplay-en').html('');
            $('input#form-inquiryList-jp, input#form-inquiryList-en, input:text, input:checked, textarea').val('');

            /* 同意するボタン内の値を消す */
            $('#accept-ja, #accept-en').prop('checked', false);

            /* 同意ボタンにチェックが入っているか否かでのリセット、確認ボタンの動作 */
            mailFormInputAbled('off');

            /* リセットボタン押したらページトップへ飛ぶ */
            var $target = $('#form');

            $target.velocity('scroll', {
                duration:   500,
                easing:     'easeOutExpo'
            });
            return false;

        }


        // リセットボタンを押したときの動作 //
        $('input#btn-reset-on-ja, input#btn-reset-on-en').on('click', function(){
            mailFormInputReset();
        });


        // 同意ボタンを押したときのリセット、確認ボタンの動作 //
        /*  デフォルト */
        mailFormInputAbled('off');

        /*  同意する */
        $('#accept-ja,#accept-en').on('click', function(){

             /*  同意するにチェックが入っている場合 */
            if ($('#accept-ja:checked,#accept-en:checked').length === 1){
                mailFormInputAbled('on');
            }

            /*  同意するにチェックが入っていない場合 */
            else {
                mailFormInputAbled('off');
            }

        }).css('cursor','pointer');


        // 戻るボタンを押したときの動作 //
        $('input#btn-formback-ja, input#btn-formback-en').on('click', function(){
            location.href='index.html';
        });


        // SPとPCでとび先を変える //
        $win.on('load', function(){

            /* -SP- */
            if (ua_sp){

                $('.policy').on('click', function(){
                    // location.href='../sitepolicy/index.html';
                    // window.open('../sitepolicy/index.html', '_blank');
                    return false;
                });

            }

            /* -PC- */
            else {

                $('.policy').on('click', function(){
                    // location.href='../../#/sitepolicy/';
                    // window.open('../../#/sitepolicy/', '_blank');
                    return false;
                });

            }

        });




    /* MailForm ここまで
    ----------------------------------------------------*/




/* Form ここまで
------------------------------------------------------------------------------*/




/* Suggest
------------------------------------------------------------------------------*/




    // サジェスト -PC- //
    function suggestOnPC(){

        /* マウスカーソルがセレクターの上に乗ったらサジェストを出す */
        $('.suggest-pc').on({

            /* マウスオン */
            'mouseenter': function(){
                $('#suggest-jp, #suggest-en').fadeIn();
            },

            /* マウスアウト */
            'mouseleave': function(){
                $('#suggest-jp, #suggest-en').fadeOut();
            }

        });

    }


    // サジェスト -SP- //
    function suggestOnSP(){

        /* タッチがサジェストの上に乗った時の判定 */
        $('#form-inquiryListDisplay-jp, #form-inquiryListDisplay-en').on('click', function(){

            /* サジェストクリアゾーンを出す */
            $('#suggest-jp, #suggest-en').fadeIn();
            $('.suggest-clear').show();

            /* サジェストクリアゾーンが全面に出るように設定 */
            var $winWidth = $win.width(),
                $winHeight = $win.height();

            $('.suggest-clear').css({
                'width':    $winWidth,
                'height':   $winHeight
            });

        });

        /* タッチがサジェストクリアゾーンの上に乗った時の動作 */
        $('.suggest-clear').on('click', function(){
            $('#suggest-jp, #suggest-en').fadeOut();
            $('.suggest-clear').hide();
        });

    }


    // サジェストオフ -共通- //
    function suggestOff(){

        /* セレクター内のテキストをクリックした時の動作 */
        $('#suggest-jp, #suggest-en').on('click', function(){
            $('#suggest-jp, #suggest-en').fadeOut();
            $('.suggest-clear').hide();
        });

    }


    // サジェスト動作 -En:英語 / Jp:日本語- //
    // サジェスト外がクリッカブルになる為のサジェストクリアゾーン -初期設定: hidden- //
    $('.suggest-clear').hide();

    $win.on('load resize', function(){

        /* サジェストを出す -SP- */
        if (ua_sp){
            suggestOnSP();
        }

        /* サジェストを出す -PC- */
        else {
            suggestOnPC();
        }

        suggestOff();

    });


    // サジェスト内のお問い合わせ事項テキストを値として読み込む  //
    var $suggestBusinessJp   = $('#menu-jp1').text(),
        $suggestRecruitJp    = $('#menu-jp2').text(),
        $suggestCreativeJp   = $('#menu-jp3').text(),
        $suggestPersonalJp   = $('#menu-jp4').text(),
        $suggestOtherJp      = $('#menu-jp5').text(),

        $suggestBusinessEn   = $('#menu-en1').text(),
        $suggestRecruitEn    = $('#menu-en2').text(),
        $suggestCreativeEn   = $('#menu-en3').text(),
        $suggestPersonalEn   = $('#menu-en4').text(),
        $suggestOtherEn      = $('#menu-en5').text();


    function suggestMenu(i){

        var caseArr = i ;

        switch (caseArr){

            case 'menu1' :

                $('#form-inquiryList-jp').val($suggestBusinessJp);
                $('#form-inquiryListDisplay-jp').html($suggestBusinessJp);
                $('#form-inquiryList-en').val($suggestBusinessEn);
                $('#form-inquiryListDisplay-en').html($suggestBusinessEn);
                break;

            case 'menu2' :

                $('#form-inquiryList-jp').val($suggestRecruitJp);
                $('#form-inquiryListDisplay-jp').html($suggestRecruitJp);
                $('#form-inquiryList-en').val($suggestRecruitEn);
                $('#form-inquiryListDisplay-en').html($suggestRecruitEn);
                break;

            case 'menu3' :

                $('#form-inquiryList-jp').val($suggestCreativeJp);
                $('#form-inquiryListDisplay-jp').html($suggestCreativeJp);
                $('#form-inquiryList-en').val($suggestCreativeEn);
                $('#form-inquiryListDisplay-en').html($suggestCreativeEn);
                break;

            case 'menu4' :

                $('#form-inquiryList-jp').val($suggestPersonalJp);
                $('#form-inquiryListDisplay-jp').html($suggestPersonalJp);
                $('#form-inquiryList-en').val($suggestPersonalEn);
                $('#form-inquiryListDisplay-en').html($suggestPersonalEn);
                break;

            case 'menu5' :

                $('#form-inquiryList-jp').val($suggestOtherJp);
                $('#form-inquiryListDisplay-jp').html($suggestOtherJp);
                $('#form-inquiryList-en').val($suggestOtherEn);
                $('#form-inquiryListDisplay-en').html($suggestOtherEn);
                break;

            default :

                break;

        }

    }


    // テキストの値をinput#inquiryListへ与える  //
    $('#menu-jp1, #menu-en1').on('mouseover', function(){
        suggestMenu('menu1');
    });

    $('#menu-jp2, #menu-en2').on('mouseover', function(){
        suggestMenu('menu2');
    });

    $('#menu-jp3, #menu-en3').on('mouseover', function(){
        suggestMenu('menu3');
    });

    $('#menu-jp4, #menu-en4').on('mouseover', function(){
        suggestMenu('menu4');
    });

    $('#menu-jp5, #menu-en5').on('mouseover', function(){
        suggestMenu('menu5');
    });




/* Suggest ここまで
------------------------------------------------------------------------------*/




/* LanguageChange
------------------------------------------------------------------------------*/




    // ブラウザの設定言語から言語判定をとり、そこから日本語表示か英語表示か切り替える //
    function browserLanguage(){

        try {
            return (navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0,2) == 'ja' ? 'ja' : 'en';
        }

        catch(e){
            return undefined;
        }

    }
    var settinglang = browserLanguage();


    // グローバルナビのUIから言語判定をとり、そこから日本語表示か英語表示か切り替える -PC- //
    function showLanguagePC(i){

        var langArr = i ;

        /* コンテンツ判定 */
        var $ja = $('#ja'),
            $en = $('#en');

        switch (langArr){

            case 'ja' :

                /* Cookie判定 */
                $.cookie('lang', langArr, { expires: 365 , path: '/' });
                $.removeCookie('lang_en', { path: '/' });

                /* IDを切り替え */
                $ja.fadeIn().show();
                $en.fadeOut().hide();
                break;

            case 'en' :

                /* Cookie判定 */
                $.cookie('lang', langArr, { expires: 365 , path: '/' });
                $.removeCookie('lang_ja', { path: '/' });

                /* IDを切り替え */
                $en.fadeIn().show();
                $ja.fadeOut().hide();
                break;

            default :

                /* Cookie判定 */
                $.cookie('lang', langArr, { expires: 365 , path: '/' });
                $.removeCookie('lang_en', { path: '/' });

                /* IDを切り替え */
                $ja.fadeIn().show();
                $en.fadeOut().hide();
                break;

        }

    }


    // グローバルナビのUIから言語判定をとり、そこから日本語表示か英語表示か切り替える -SP- //
    function showLanguageSP(i){

        var langArr = i ;

        /* コンテンツ判定 */
        var $ja = $('#ja'),
            $en = $('#en');

        switch (langArr){

            case 'ja' :

                /* Cookie判定 */
                $.cookie('lang_ja', langArr, { expires: 365 , path: '/' });
                $.removeCookie('lang_en', { path: '/' });

                /* IDを切り替え */
                $ja.fadeIn().show();
                $en.fadeOut().hide();

                /* Classを切り替え */
                $('.language-list li.btn-ja').removeClass('btn-ja').addClass('btn-ja-active');
                $('.language-list li.btn-en-active').removeClass('btn-en-active').addClass('btn-en');
                break;

            case 'en' :

                /* Cookie判定 */
                $.cookie('lang_en', langArr , { expires: 365 , path: '/' });
                $.removeCookie('lang_ja', { path: '/' });

                /* IDを切り替え */
                $en.fadeIn().show();
                $ja.fadeOut().hide();

                /* Classを切り替え */
                $('.language-list li.btn-en').removeClass('btn-en').addClass('btn-en-active');
                $('.language-list li.btn-ja-active').removeClass('btn-ja-active').addClass('btn-ja');
                break;

            default :

                /* Cookie判定 */
                $.cookie('lang_ja', langArr, { expires: 365 , path: '/' });
                $.removeCookie('lang_en', { path: '/' });

                /* IDを切り替え */
                $ja.fadeIn().show();
                $en.fadeOut().hide();

                /* Classを切り替え */
                $('.language-list li.btn-ja').removeClass('btn-ja').addClass('btn-ja-active');
                $('.language-list li.btn-en-active').removeClass('btn-en-active').addClass('btn-en');
                break;

        }

    }


    // デフォルトの表示 -lang_ja:和文 / lang_en:英文- //
    var $lang_ja = $.cookie('lang_ja'),
        $lang_en = $.cookie('lang_en');

    if ($lang_ja){
        showLanguagePC('ja');
        showLanguageSP('ja');
    }

    else if ($lang_en){
        showLanguagePC('en');
        showLanguageSP('en');
    }

    else {
        showLanguagePC();
        showLanguageSP();
    }


    // 切り替えた時の表示 //
    $('#jaBtn').on('click', function(){
        showLanguagePC('ja');
        showLanguageSP('ja');
    });

    $('#enBtn').on('click', function(){
        showLanguagePC('en');
        showLanguageSP('en');
    });




/* LanguageChange ここまで
------------------------------------------------------------------------------*/




/* SNSAPI
------------------------------------------------------------------------------*/




    // Twitter-Facebook //
    function popupLink(type, _self){

        var href,
            windowname;

        if (type === 'twitter'){

            href        = 'http://twitter.com/share?original_referer=http://wwww.test.jp/&textテキストが入ります。&url=http://wwww.test.jp/';
            windowname  = 'twitterwindow';

        }

        else if (type === 'facebook'){

            href        = 'http://www.facebook.com/share.php?u=http://www.test.jp/';
            windowname  = 'facebookwindow';

        }

        window.open(href, windowname, 'width=550, height=450,personalbar=0,toolbar=0,scrollbars=1,resizable=1');
        return false;

    }




/* SNSAPI ここまで
------------------------------------------------------------------------------*/




/* Kerning / Centering Adjust
------------------------------------------------------------------------------*/




    /* Kerning -- 和文のカーニング
    ----------------------------------------------------*/


    /*Attention
    ----------------------------------------------------
    ※カーニングは半角英数には対応不可
    ※数字、記号、約物は全角のみカーニングに対応
    ※詳しい対応文字はajax/kerning.jsonを確認
    ----------------------------------------------------
    */


    function kerningDir(rootDir){

        /* JSONデータ読み込み - 非同期通信するためgetJSONで読み出すこと - */
        return $.getJSON(rootDir + 'ajax/kerning.json', function(data){

            /* 中にテキストが入るタグの判定 divは含まれない */
            var $tag = $('p, h1, h2, h3, h4, h5, h6, .carousel-caption, dl.news dt, dl.news dd, dl.column dt, dl.column dd, dl#form-layout-jp dt, dl#form-layout-en dt, ul.list li, ol.list li, ul.suggest-menu li, ul.form-accept li, th, td, a, address');

            /* JSONのデータを基にカーニングを実行 */
            $tag.kerning({
                'data': data
            });

        });

    }


    if ($headerNav1st.length || $headerNav1st_none.length){
        kerningDir('./');
    }

    else if ($headerNav2nd.length){
        kerningDir('../');
    }

    else if ($headerNav3rd.length){
        kerningDir('../../');
    }




    /* Centering -- オブジェクトの縦横センタリング
    ----------------------------------------------------*/


    function centering(){

        var $box      = $('.centerParentWrapper'),
            padding   = parseInt($box.css('padding-top')) + parseInt($box.css('padding-bottom')),
            margin    = 50,
            minHeight = $box.height() + padding + $footer.height() + margin;

        if ($winInnerHeight < minHeight){
            $('#fixed-container').css({
                'position' : 'relative'
            });
        }

        else {
            $('#fixed-container').css({
                'position' : 'fixed'
            });
        }

        $('#fixed-container').css({
            'height' : $winInnerHeight + 'px'
        });

        $('#fixed-container').css({
            'height' : $winInnerHeight - 30 + 'px'
        });

    }


    $win.on('load resize', function(){
        centering();
    }).trigger('resize');




/* Centering / Kerning Adjust ここまで
------------------------------------------------------------------------------*/




/* Device Adjust
------------------------------------------------------------------------------*/



    // ブレークポイント -PCとSPでのファイル・ソースの切り分け- //
    function changeClass(i){

        var classArr  = i;

        switch (classArr){

            case 'pc' :

                /* PC用画像ソースフォルダに切り替える */
                $('.img-response').each(function(){

                    /* ソースをSP用とPC用で切り替える */
                    $(this).prop('src', $(this).prop('src').replace('sp', 'pc'));

                });

                $('body, #suggest, #form-layout-jp').each(function(){

                    /* クラスをSP用とPC用で切り替える */
                    $(this).prop('class', $(this).prop('class').replace('sp', 'pc'));

                    /* レイアウトをSP用とPC用で切り替える */
                    $('.colon').show();
                    $('dl.form-pc dd').css({
                        'width': 400 + 'px'
                    });

                });

                break;

            case 'sp' :

                /* SP用画像ソースフォルダに切り替える */
                $('.img-response').each(function(){

                    /* ソースをSP用とPC用で切り替える */
                    $(this).prop('src', $(this).prop('src').replace('pc', 'sp'));

                });

                $('body, #suggest, #form-layout-jp').each(function(){

                    /* クラスをSP用とPC用で切り替える */
                    $(this).prop('class', $(this).prop('class').replace('pc', 'sp'));

                    /* レイアウトをSP用とPC用で切り替える */
                    $('.colon').hide();
                    $('dl.form-sp dd').css({
                        'width': 400 / 400 * 100 + '%'
                    });

                });

                break;

            default :

                break;

        }

    }


    $win.on('load resize', function() {

        var $resizeWinWidth = $win.width();

        if ($resizeWinWidth > 960){
            changeClass('pc');
        }

        else if ($resizeWinWidth < 960 || ua_sp){
            changeClass('sp');
        }

    });


    // Android対策 -横向きで微妙にずれる- //
    var portraitWidth,
        landscapeWidth;

    $win.on('load resize', function(){

        /* iPhone, iPadなど */
        if ((userAgent.indexOf('iPhone') > 0 && userAgent.indexOf('iPad') == -1) || userAgent.indexOf('iPod') > 0){
            $('html').css({
                'zoom': 1
            });
        }

        /* Android */
        else if (userAgent.indexOf('Android') > 0){

            /* 傾き（ポートレイトかランドスケープか）を判定 */
            if ('object' === typeof window.onorientationchange){

                window.addEventListener('orientationchange', function(){

                    /* ランドスケープ */
                    if (window.innerHeight > window.innerWidth){
                        $('html').css({
                            'zoom': landscapeWidth / 320
                        });
                    }

                    /* ポートレイト */
                    else {
                        $('html').css({
                            'zoom': portraitWidth / 320
                        });
                    }

                }, false);

            }

        }

    }).trigger('resize');




/* Device Adjust ここまで
------------------------------------------------------------------------------*/




}(jQuery));