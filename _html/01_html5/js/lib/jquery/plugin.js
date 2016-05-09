// JavaScript Jquery PlugIns Document


/* --------------------------

・UI共通プラグイン
　→UI動作で必要な実装

・ライトボックス
　→モーダルウィンドウの実装

・バリデート
　→メールのバリデート実装

・メールフォーム
　→メールフォームのレイアウト、挙動に関わる実装

・サジェスト
　→検索からサジェストを出す実装

・言語切り替え
　→Cookieを利用した言語切替実装

・SNS API
　→Twitter、FacebookなどのSNS API

・特定端末対応
　→PC版とのレイアウトや挙動の切替、SPの特定端末における挙動対策等

--------------------------*/




$(function() {




/* UI共通プラグイン
--------------------------*/




	/* グローバル変数
	--------------------*/
	var ww = $(window).width();
	var wh = $(window).height();
	var wow = $(window).outerWidth();
	var woh = $(window).outerHeight();
	var wiw = $(window).innerWidth();
	var wih = $(window).innerHeight();

	var ua = navigator.userAgent;


	// ウィンドウ自体の幅と高さを計測し、使っているブラウザのユーザーエージェントを判定
	$(window).on('load resize', function() {
		var ww = $(window).width();
		var wh = $(window).height();
		$('#test01').html('ウィンドウ幅' + '&nbsp;:&nbsp;' + ww);
		$('#test02').html('ウィンドウ高さ' + '&nbsp;:&nbsp;' + wh);
		$('#test03').html('ユーザーエージェント' + '&nbsp;:&nbsp;' + ua);
	});


	/* test IE判定実装
	--------------------*/
	// IEであるか否かの判定
	// var isIE = false; // IEか否か
	// var version = null; // IEのバージョン

	// if( ua.match(/MSIE/) || ua.match(/Trident/) ) {
	//		isIE = true;
	//		version = ua.match(/(MSIE\s|rv:)([\d\.]+)/)[2];
	//		location.href='http://www.yahoo.co.jp/'
	// }


	/* test btn-hover実装
	--------------------*/
	if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 || ua.indexOf('BlackBerry') > 0 || ua.indexOf('windows Phone') > 0 || ua.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(ua)){

	}

	else {

		$.ajax ({
			url: 'include/btn.html',
			cache: true, // キャッシュを利用 //
			async: true, // 非同期で読み込む //
			processData: false,
			}).done(function(html) {
				html = html.replace(/\{\$root\}/g, relativeFirstDir);
				$('#hover').append(html);
		});

	}


	/* Header共通化
	--------------------*/
	var rootDir = location.href.split('/');
	var currentDir = rootDir[rootDir.length -2];
	var relativeFirstDir = ('include/')
	var relativeSecondDir = ('../include/')


	$('#test04').html('現在のディレクトリ' + '&nbsp;:&nbsp;' + currentDir)

	if ($('header#navi-1st').length) {

		$.ajax ({
			url: relativeFirstDir + 'header.html',
			cache: true, // キャッシュを利用 //
			async: true, // 非同期で読み込む //
			processData: false,
			}).done(function(html) {
				html = html.replace(/\{\$root\}/g, relativeFirstDir);
				$('header#navi-1st').append(html);
		});

	}

	else {

		$.ajax ({
			url: relativeSecondDir + 'header.html',
			cache: true, // キャッシュを利用 //
			async: true, // 非同期で読み込む //
			processData: false,
			}).done(function(html) {
				html = html.replace(/\{\$root\}/g, relativeSecondDir);
				$('header#navi-2nd').append(html);
		});

	}


	/* jsonテスト
	--------------------*/
	//$(function() {

	//	$.ajax({
	//		dataType: 'json'
	//	});

	//	$.getJSON('ajax/test.json', function( data ) {

	//		var items = [];
	//		$.each( data, function( key, val ) {
	//			items.push('<li id='' + key + ''>' + val + '</li>');
	//		});

	//		$('<ul/>',{
	//			'class': 'my-new-list',
	//			html: items.join('')
	//		}).appendTo('#wrapper');

	//	});

	//});


	/* dt adjust
	--------------------*/
	function adjust(){
		var dtw = $('dl#column dt').outerWidth(); // dtの幅 //
		$('dl#column dd').css('margin-left', dtw + 10 + 'px'); // 可変部分の高さを適用 //
	};

	adjust();

	$(window).on('load resize', function() {
		adjust();
	})


	/* PageScroll
	--------------------*/
	$('a[href*=#top]').on('click', function() {

		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') &&　location.hostname == this.hostname) {

			var target = $(this.hash);
			target = target.length && target;

			if (target.length) {
				var sclpos = 10;
				var scldurat = 500;
				var targetOffset = target.offset().top - sclpos;
				$('html,body')
					.animate({scrollTop: targetOffset}, {duration: scldurat, easing: 'easeOutExpo'});
			}
			return false;

		}

	});


	/* Slider
	--------------------*/
	if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 || ua.indexOf('BlackBerry') > 0 || ua.indexOf('windows Phone') > 0 || ua.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(ua) || $('#carousel-example-generic').children().hasClass('item')){

		// Slider-Config //
		$('.carousel').carousel({
			interval: 6000
		});

		// Slider-Swipe -forSP-//
		$(function() {

			var carousel = $('.carousel');
			var hammer = new Hammer(carousel[0]);
			hammer.on('swipeleft', function(){ carousel.carousel('next'); });   //--- 左にスワイプしたら次の画像に切り替え
			hammer.on('swiperight', function(){ carousel.carousel('prev'); });  //--- 右にスワイプしたら前の画像に切り替え

		});

	}

	else {

		// Slider-Config //
		$('.carousel').carousel({
			interval: 6000
		});

	}


	/* Tabs
	--------------------*/
	$('#tabs').tabs({
		collapsible: false,
		show: { effect: 'fadeIn', duration: 800 },
		fx: { height: 'toggle', opacity: 'toggle', duration: 300 }
	});


	/* Window Close
	--------------------*/
	function quitBox(cmd) {
		if (cmd=='quit'){
			open(location, '_self').close();
		}
		return false;
	}


	/* MouseOver
	--------------------*/
	function mouseOver(i) {

		var imgArr = i ;

		switch (imgArr){
			case 'on' :
				$('img.mouseover').each(function() {
					$(this).attr('src', $(this).attr('src').replace('_off', '_on'));
				});

				break;

			case 'off' :
				$('img.mouseover').each(function() {
					$(this).attr('src', $(this).attr('src').replace('_on', '_off'));
				});

				break;

			default :
				$('img.mouseover').each(function() {
					$(this).attr('src', $(this).attr('src').replace('_off', '_on'));
				});

				break;

		}

	}

	$('img.mouseover').mouseover(function() {
		mouseOver('on')
	});

	$('img.mouseover').mouseout(function() {
		mouseOver('off')
	});


	/* Target-blank
	   for IE8
	--------------------*/
	$('.blank').on('click', function(){
		window.open(this.href, '_blank');
		return false;
	});


	/* Kerning
	--------------------*/
	/*Attention
	※約物含めたリンク箇所でのカーニング指定を行うと挙動がおかしくなる
	　→約物を記号化、前後に半角スペースを入れる事で対応
	  例）<a href="javascript:void(0)" class="policy"> &#12300;個人情報の取り扱いについて&#12301; </a>
	*/

	var tag = $('p, h1, h2, h3, h4, h5, h6, span, dt, dd, th, td, ul.list li, ol.list li, ul.form-accept li, a')
	$(tag).FLAutoKerning();


	/* Centering
	--------------------*/
	$(window).on('load resize', function() {

		// MIN_HEIGHT = 400;
		var $box = $('.bgLogin.box.center');
		var padding = parseInt($box.css('padding-top')) + parseInt($box.css('padding-bottom'));
		var margin = 50;
		var MIN_HEIGHT = $box.height() + padding + $('footer').height() + margin;

		if( wih < MIN_HEIGHT ) {
			wih = MIN_HEIGHT
			$('.centerParentWrapper').css('position', 'relative');
		} else {
			$('.centerParentWrapper').css('position', 'fixed');
		}

		$('.centerParentWrapper').css({
			"height" : wih + "px"
		});

		$('.centerParentWrapper').css({
			"height" : wih - 30 + "px"
		});

		if (wiw < 768) {
			$('.bgProduct').css({
				"width" : wiw - 30 + "px"
			});
		}

		else {
			$('.bgProduct').css({
				"width" : 750 + "px"
			});
		}

	}).trigger('resize');




/* ライトボックス
--------------------------*/


	// 1.lightboxのインクルードファイルを読み込む  //

	if ($('header#navi-1st').length) {

		$.ajax ({
			url: relativeFirstDir + 'lightbox.html',
			cache: true, // キャッシュを利用 //
			async: true, // 非同期で読み込む //
			processData: false,
			}).done(function(html) {
				html = html.replace(/\{\$root\}/g, relativeFirstDir);
				$('.lightbox').append(html);
		});

	}

	else {

		$.ajax ({
			url: relativeSecondDir + 'lightbox.html',
			cache: true, // キャッシュを利用 //
			async: true, // 非同期で読み込む //
			processData: false,
			}).done(function(html) {
				html = html.replace(/\{\$root\}/g, relativeSecondDir);
				$('.lightbox').append(html);
		});

	}


	// 2.lightbox本体を読み込む  //
	// イメージボックスを出す //
	$('a[rel=imagebox]').on('click', function(e) {

		e.preventDefault();

			if ($('#lb-overlay').is(':hidden')) {

				// ライトボックスのオーバーレイを出す //
				$('#lb-overlay, #lb-container').fadeIn();

				// todo: ライトボックスコンテンツを読み込ませる方法と切り分け方 //
				var href = $(this).attr('href');
				$('.bg-lightbox').html('<img src=' + href + '>' ).fadeIn();

				// ライトボックスの背景をドキュメントの高さに合わせる //
				var ww = $(window).width();
				var wh = $(window).height();
				var dh = $(document).height();
				var lw = $('.bg-lightbox').width();
				var lh = $('.bg-lightbox').height();

				if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 || ua.indexOf('BlackBerry') > 0 || ua.indexOf('windows Phone') > 0 || ua.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(ua)){

					$('#lb-overlay').css({
						'width' : ww,
						'height' : wh + 100 + 'px'
					});

					$('.lb-wrapper').css({
						'zoom' : 0.6,
						'font-size' : 1 + 'em'
					});

				}

				else {

					$('#lb-overlay').css({
						'width' : ww,
						'height' : wh
					});

				}


				// 傾けてもライトボックスの背景をドキュメントの高さに合わせる //
				$(window).on('load resize', function() {

					var ww = $(window).width();
					var wh = $(window).height();
					var dh = $(document).height();
					var lw = $('.bg-lightbox').width();
					var lh = $('.bg-lightbox').height();

					if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 || ua.indexOf('BlackBerry') > 0 || ua.indexOf('windows Phone') > 0 || ua.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(ua)){

						$('#lb-overlay').css({
							'width' : ww,
							'height' : wh + 100 + 'px'
						});

						$('.lb-wrapper').css({
							'zoom' : 0.6,
							'font-size' : 1 + 'em'
						});

					}

					else {

						$('#lb-overlay').css({
							'width' : ww,
							'height' : wh
						});

					}

				}).trigger('resize');

			}

			else {
				$('.bg-lightbox').html('').hide();
				// ライトボックスのオーバーレイ、背景を引っ込める //
				$('#lb-overlay, #lb-container').fadeOut();
			}

	});


	// テキストボックスを出す //
	$('a[rel=textbox]').on('click', function(e) {

		e.preventDefault();

		if ($('#lb-overlay').is(':hidden')) {

			// ライトボックスのオーバーレイを出す //
			$('#lb-overlay, #lb-container').fadeIn();

			// todo: ライトボックスコンテンツを読み込ませる方法と切り分け方 //
			var title = $(this).attr('title');
			$('.bg-lightbox').html('<p>' + title + '</p>').fadeIn();

			// ライトボックスの背景をドキュメントの高さに合わせる //
			var dh = $(document).height();
			var lw = $('.bg-lightbox').width();
			var lh = $('.bg-lightbox').height();

			if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 || ua.indexOf('BlackBerry') > 0 || ua.indexOf('windows Phone') > 0 || ua.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(ua)){

				$('#lb-overlay').css({
					'width' : ww,
					'height' : wh + 100 + 'px'
				});

				$('.lb-wrapper').css({
					'zoom' : 0.6,
					'font-size' : 1 + 'em'
				});

			}

			else {

				$('#lb-overlay').css({
					'width' : ww,
					'height' : wh
				});

			}


			// 傾けてもライトボックスの背景をドキュメントの高さに合わせる //
			$(window).on('load resize', function() {

				var ww = $(window).width();
				var wh = $(window).height();
				var dh = $(document).height();
				var lw = $('.bg-lightbox').width();
				var lh = $('.bg-lightbox').height();

				if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 || ua.indexOf('BlackBerry') > 0 || ua.indexOf('windows Phone') > 0 || ua.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(ua)){

					$('#lb-overlay').css({
						'width' : ww,
						'height' : wh + 100 + 'px'
					});

					$('.lb-wrapper').css({
						'zoom' : 0.6,
						'font-size' : 1 + 'em'
					});

				}

				else {

					$('#lb-overlay').css({
						'width' : ww,
						'height' : wh
					});

				}

			}).trigger('resize');

		}

		else {
			$('.bg-lightbox').html('').hide();
			// ライトボックスのオーバーレイ、背景を引っ込める //
			$('#lb-overlay, #lb-container').hide();
		}

	});


	// ライトボックスの背景でクローズする //
	$('#lb-overlay').on('click', function(e) {

		e.preventDefault();

		$('.bg-lightbox').html('').hide();

		$('#lb-overlay').hide();
		$('#lb-overlay').css({
			'width' : '',
			'height' : ''
		});

	});




/* バリデート
--------------------------*/


	// Submitを押したときの判定 Jp:日本語  //
	$('input#btn-confirm-ja:submit').on('click', function() {

		//全角ひらがな･カタカナのみ
		jQuery.validator.addMethod('kana', function(value, element) {
			return this.optional(element) || /^([ァ-ヶーぁ-ん]+)$/.test(value);
			}, '全角ひらがな･カタカナを入力してください'
		);

		//全角ひらがなのみ
		jQuery.validator.addMethod('hiragana', function(value, element) {
			return this.optional(element) || /^([ぁ-ん]+)$/.test(value);
			}, '全角ひらがなを入力してください'
		);

		//半角アルファベット（大文字･小文字）のみ
		jQuery.validator.addMethod('alphabet', function(value, element) {
			return this.optional(element) || /^([a-zA-Z0-9\s\@_\.\-]+)$/.test(value);
			}, '半角英字を入力してください'
		);

		$('#inquiryFormJp').validate({
			ignore: '.ignore',
			rules: {
				inquiryListJp :{
					required: true
				},
				inquiryCompanyNameJp :{
					required: true
				},
				inquiryNameJaJp :{
					required: true
				},
				inquiryNameEnJp :{
					required: true,
					alphabet: true
				},
				inquiryMailJp :{
					required: true,
					alphabet: true,
					email: true
				},
				inquiryTextJp :{
					required: true
				}
			},
			messages: {
				inquiryListJp :{
					required: '※お問い合わせ内容をお選び下さい。'
				},
				inquiryCompanyNameJp :{
					required: '※必須項目です。'
				},
				inquiryNameJaJp :{
					required: '※必須項目です。'
				},
				inquiryNameEnJp :{
					required: '※必須項目です。',
					alphabet: '※半角英数で入力して下さい。'
				},
				inquiryMailJp :{
					required: '※必須項目です',
					alphabet: '※半角英数で入力して下さい。',
					email: '※メールアドレスを入力してください。'
				},
				inquiryTextJp :{
					required: '※必須項目です。'
				}
			}
		});

		var ua = navigator.userAgent;
		var scldurat = 500;


		// エラーが出た箇所へ飛ぶ -forSP- //
		if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 || ua.indexOf('BlackBerry') > 0 || ua.indexOf('windows Phone') > 0 || ua.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(ua)){

			if ($('input#inquiryListJp').val() === ''){

				var inquiryListJp = $('input#inquiryListJp');
				var offset = inquiryListJp.offset();
				var sclpos = 20;
				var targetOffset = inquiryListJp.offset().top + sclpos;

				$('html,body').animate({ scrollTop: offset.top - 20}, {duration: scldurat, easing: 'easeOutExpo'});

			}

			else if ($('input#inquiryCompanyNameJp').val() === ''){

				var inquiryCompanyNameJp = $('input#inquiryCompanyNameJp');
				var offset = inquiryCompanyNameJp.offset();

				$('html,body').animate({ scrollTop: offset.top - 20 }, {duration: scldurat, easing: 'easeOutExpo'});

			}

			else if ($('input#inquiryNameJaJp').val() === ''){

				var inquiryNameJaJp = $('input#inquiryNameJaJp');
				var offset = inquiryNameJaJp.offset();

				$('html,body').animate({ scrollTop: offset.top - 20 }, {duration: scldurat, easing: 'easeOutExpo'});

			}

			else if ($('input#inquiryNameEnJp').val() === ''){

				var inquiryNameEnJp = $('input#inquiryNameEnJp');
				var offset = inquiryNameEnJp.offset();

				$('html,body').animate({ scrollTop: offset.top - 20 }, {duration: scldurat, easing: 'easeOutExpo'});

			}

			else if ($('input#inquiryMailJp').val() === ''){

				var inquiryMailJp = $('input#inquiryMailJp');
				var offset = inquiryMailJp.offset();

				$('html,body').animate({ scrollTop: offset.top - 20 }, {duration: scldurat, easing: 'easeOutExpo'});

			}

			else if ($('textarea#inquiryTextJp').val() === ''){

				var inquiryTextJp = $('input#inquiryTextJp');
				var offset = inquiryTextJp.offset();

				$('html,body').animate({ scrollTop: offset.top - 20 }, {duration: scldurat, easing: 'easeOutExpo'});

			}

		}

	});


	// Submitを押したときの判定 En:英語  //
	$('input#btn-confirm-en:submit').on('click', function() {

		$('#inquiryFormEn').validate({
			ignore: '.ignore',
			rules: {
				inquiryListEn :{
					required: true
				},
				inquiryCompanyNameEn :{
					required: true
				},
				inquiryNameEnEn :{
					required: true,
					alphabet: true
				},
				inquiryMailEn :{
					required: true,
					email: true
				},
				inquiryTextEn :{
					required: true
				}
			},
			messages: {
				inquiryListEn :{
					required: '*Please select.'
				},
				inquiryCompanyNameEn :{
					required: '*Please enter xxx.'
				},
				inquiryNameEnEn :{
					required: '*Please enter xxx.'
				},
				inquiryMailEn :{
					required: '*Please enter xxx.',
					email: '*Your e-mail address is incorrect.'
				},
				inquiryTextEn :{
					required: '*Please enter xxx.'
				}
			}
		});


		// エラーが出た箇所へ飛ぶ -forSP- //
		var scldurat = 500;

		if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 || ua.indexOf('BlackBerry') > 0 || ua.indexOf('windows Phone') > 0 || ua.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(ua)){

			if ($('input#inquiryListEn').val() === ''){

				var inquiryListEn = $('input#inquiryListEn');
				var offset = inquiryListEn.offset();
				var sclpos = 20;
				var targetOffset = inquiryListEn.offset().top + sclpos;

				$('html,body').animate({ scrollTop: offset.top - 20}, {duration: scldurat, easing: 'easeOutExpo'});

			}

			else if ($('input#inquiryCompanyNameEn').val() === ''){

				var inquiryCompanyNameEn = $('input#inquiryCompanyNameEn');
				var offset = inquiryCompanyNameEn.offset();

				$('html,body').animate({ scrollTop: offset.top - 20 }, {duration: scldurat, easing: 'easeOutExpo'});

			}

			else if ($('input#inquiryNameEn').val() === ''){

				var inquiryNameEn = $('input#inquiryNameEn');
				var offset = inquiryNameEn.offset();

				$('html,body').animate({ scrollTop: offset.top - 20 }, {duration: scldurat, easing: 'easeOutExpo'});

			}

			else if ($('input#inquiryMailEn').val() === ''){

				var inquiryMailEn = $('input#inquiryMailEn');
				var offset = inquiryMailEn.offset();

				$('html,body').animate({ scrollTop: offset.top - 20 }, {duration: scldurat, easing: 'easeOutExpo'});

			}

			else if ($('textarea#inquiryTextEn').val() === ''){

				var inquiryTextEn = $('input#inquiryTextEn');
				var offset = inquiryTextEn.offset();

				$('html,body').animate({ scrollTop: offset.top - 20 }, {duration: scldurat, easing: 'easeOutExpo'});

			}

		}

	});




/* メールフォーム
--------------------------*/


	// Resetを押したときの判定 //
	$('input#btn-reset-ja,input#btn-reset-en').on('click', function() {

		// バリデート注意文言を消す -日本語- //
		$('label.error').html('').hide();

		// サジェスト部分の注意文言及び[input type='hidden']内の値を消す -共通- //
		$('p#inquiryListDisplayJp,p#inquiryListDisplayEn').html('');
		$('input#inquiryListJp,input#inquiryListEn').val('');

		// [input type='text'][textarea]内の値を消す -共通- //
		$('input:text,input:checked,textarea').val('');

		// 同意するボタン内の値を消す -共通- //
		$('#accept-ja,#accept-en').attr('checked', false);

		// 同意ボタンにチェックが入っているか否かでのリセット、確認ボタンの判定 //
		if ($('#accept-ja:checked,#accept-en:checked').length === 0) {

			$('#btn-reset-ja').attr('id','btn-reset-off-ja').attr('disabled', true);
			$('#btn-reset-en').attr('id','btn-reset-off-en').attr('disabled', true);
			$('#btn-confirm-ja').attr('id','btn-confirm-off-ja').attr('disabled', true);
			$('#btn-confirm-en').attr('id','btn-confirm-off-en').attr('disabled', true);

		}

		// リセットボタン押したらページトップへ飛ぶ -forSP- //
		var scldurat = 500;

		if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 || ua.indexOf('BlackBerry') > 0 || ua.indexOf('windows Phone') > 0 || ua.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(ua)){
			$('html,body').animate({ scrollTop: 0 }, 'fast');
		}

	});


	// 同意ボタンを押したときのリセット、確認ボタンの判定 //
	/*  default */
			$('#btn-reset-ja').attr('id','btn-reset-off-ja').attr('disabled', true);
			$('#btn-reset-en').attr('id','btn-reset-off-en').attr('disabled', true);
			$('#btn-confirm-ja').attr('id','btn-confirm-off-ja').attr('disabled', true);
			$('#btn-confirm-en').attr('id','btn-confirm-off-en').attr('disabled', true);

	/*  accept */
	$('#accept-ja,#accept-en').click(function() {

		if ($('#accept-ja:checked,#accept-en:checked').length === 1) {

			$('#btn-reset-off-ja').attr('id','btn-reset-ja').attr('disabled', false);
			$('#btn-reset-off-en').attr('id','btn-reset-en').attr('disabled', false);
			$('#btn-confirm-off-ja').attr('id','btn-confirm-ja').attr('disabled', false);
			$('#btn-confirm-off-en').attr('id','btn-confirm-en').attr('disabled', false);

		}

		else {

			$('#btn-reset-ja').attr('id','btn-reset-off-ja').attr('disabled', true);
			$('#btn-reset-en').attr('id','btn-reset-off-en').attr('disabled', true);
			$('#btn-confirm-ja').attr('id','btn-confirm-off-ja').attr('disabled', true);
			$('#btn-confirm-en').attr('id','btn-confirm-off-en').attr('disabled', true);

		}

	}).css('cursor','pointer');

	// 戻るボタンを押したときの判定 //
	$('input#btn-formback-ja,input#btn-formback-en').on('click', function() {
		location.href='index.html'
	});


	// SPとPCでとび先を変える //
	$(window).load(function() {

		// -forSP- //
		if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 || ua.indexOf('BlackBerry') > 0 || ua.indexOf('windows Phone') > 0 || ua.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(ua)){

			$('.policy').on('click', function() {
				// location.href='../sitepolicy/index.html'
				// window.open('../sitepolicy/index.html', '_blank');
				return false;
			});

		}

		// -forPC-  //
		else {

			$('.policy').on('click', function() {
				// location.href='../../#/sitepolicy/'
				// window.open('../../#/sitepolicy/', '_blank');
				return false;
			});

		}

	});


	// windowをリサイズした時にコロンを取る //
	$(window).on('load resize', function() {

		// -forSP- //
		if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 || ua.indexOf('BlackBerry') > 0 || ua.indexOf('windows Phone') > 0 || ua.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(ua)){

			// なし  //

		}

		// -forPC- //
		else {

			// ウィンドウサイズを精査  //
			var ww = $(window).width();
			//$('#test').html(ww);　デバッグ用

			// ウィンドウサイズが960px以下になったら  //
			if(ww < 960) {
				$('.colon').hide();
				$('dl.form-pc dd, dl.form-sp dd').css('width', 400 / 400 * 100 + '%' );
			}

			// ウィンドウサイズが960px以上になったら  //
			else {
				$('.colon').show();
				$('dl.form-pc dd').css('width', 400 + 'px' );
			}

		}

	});




/* サジェスト
--------------------------*/


	// Suggest En:英語、Jp:日本語  //

	// サジェスト外がクリッカブルになる為のサジェストクリアゾーン -初期設定: hidden- //
	$('.suggestClear').hide();

	$(window).on('load resize', function() {


		// サジェストを出す -forSP- //
		if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 || ua.indexOf('BlackBerry') > 0 || ua.indexOf('windows Phone') > 0 || ua.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(ua)){

			$('#inquiryListDisplayJp,#inquiryListDisplayEn').on({

				// タッチがサジェストの上に乗った時の判定 //
				'click':function() {

					$('#suggestJp,#suggestEn').fadeIn();

					// サジェストクリアゾーンを出す //
					$('.suggestClear').show();

					// サジェストクリアゾーンが全面に出るように設定 //
					var ww = $(window).width();
					var wh = $(window).height();
					$('.suggestClear').css({
						'width': ww,
						'height': wh,
					});

				}

			});

			$('.suggestClear').on({
				// タッチがサジェストクリアゾーンの上に乗った時の判定 //
				'click':function() {
					$('#suggestJp,#suggestEn').fadeOut();
					$('.suggestClear').hide();
				}
			});

		}


		// サジェストを出す -forPC- //
		else {

			// マウスカーソルがセレクターの上に乗ったらサジェストを出す//
			$('.suggest-pc').on({
				// マウスカーソルがサジェストの上に乗った時の判定 //
				'mouseenter':function() {
					$('#suggestJp,#suggestEn').fadeIn();
				},
				// マウスカーソルがサジェストの上から外れた時の判定 //
				'mouseleave':function() {
					$('#suggestJp,#suggestEn').fadeOut();
				}
			});

		}

		// セレクター内のテキストをクリックした時の判定  //
		$('#suggestJp,#suggestEn').on('click', function() {
			$('#suggestJp,#suggestEn').fadeOut();
			$('.suggestClear').hide();
		});

	});


	// サジェスト内のお問い合わせ事項テキストを値として読み込む  //
	var suggestBusinessJp = $('#menuJp0').text();
	var suggestRecruitJp  = $('#menuJp1').text();
	var suggestCreativeJp = $('#menuJp2').text();
	var suggestPersonalJp = $('#menuJp3').text();
	var suggestOtherJp    = $('#menuJp4').text();

	var suggestBusinessEn = $('#menuEn0').text();
	var suggestRecruitEn  = $('#menuEn1').text();
	var suggestCreativeEn = $('#menuEn2').text();
	var suggestPersonalEn = $('#menuEn3').text();
	var suggestOtherEn    = $('#menuEn4').text();


	// テキストの値をinput#inquiryListへ与える  //
	$('#menuJp0,#menuEn0').mouseover(function() {

		$('#inquiryListJp').val(suggestBusinessJp);
		$('#inquiryListDisplayJp').html(suggestBusinessJp);
		$('#inquiryListEn').val(suggestBusinessEn);
		$('#inquiryListDisplayEn').html(suggestBusinessEn);

	});

	$('#menuJp1,#menuEn1').mouseover(function() {

		$('#inquiryListJp').val(suggestRecruitJp);
		$('#inquiryListDisplayJp').html(suggestRecruitJp);
		$('#inquiryListEn').val(suggestRecruitEn);
		$('#inquiryListDisplayEn').html(suggestRecruitEn);

	});

	$('#menuJp2,#menuEn2').mouseover(function() {

		$('#inquiryListJp').val(suggestCreativeJp);
		$('#inquiryListDisplayJp').html(suggestCreativeJp);
		$('#inquiryListEn').val(suggestCreativeEn);
		$('#inquiryListDisplayEn').html(suggestCreativeEn);

	});

	$('#menuJp3,#menuEn3').mouseover(function() {

		$('#inquiryListJp').val(suggestPersonalJp);
		$('#inquiryListDisplayJp').html(suggestPersonalJp);
		$('#inquiryListEn').val(suggestPersonalEn);
		$('#inquiryListDisplayEn').html(suggestPersonalEn);

	});

	$('#menuJp4,#menuEn4').mouseover(function() {

		$('#inquiryListJp').val(suggestOtherJp);
		$('#inquiryListDisplayJp').html(suggestOtherJp);
		$('#inquiryListEn').val(suggestOtherEn);
		$('#inquiryListDisplayEn').html(suggestOtherEn);

	});




/* 言語切り替え
--------------------------*/


	// Language Change //

	// 1.ブラウザの言語設定から言語判定をとり、そこから日本語表示か英語表示か切り替える //
	function browserLanguage() {
		try {
			return (navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0,2) == 'ja' ? 'ja' : 'en';
		}
		catch(e) {
			return undefined;
		}
	}

	var settinglang = browserLanguage();


	// 2.グローバルナビから言語判定をとり、そこから日本語表示か英語表示か切り替える -forSP-//
	function showLanguageSP(i) {

		var langArr = i ;

		switch (langArr){
			case 'ja' :
				$.cookie('lang_ja', langArr, { expires: 365 , path: '/' });
				$.removeCookie('lang_en', { path: '/' });

				$('#ja').fadeIn().show();
				$('#en').fadeOut().hide();
				$('.language-list li.btn-ja').removeClass('btn-ja').addClass('btn-ja-active');
				$('.language-list li.btn-en-active').removeClass('btn-en-active').addClass('btn-en');

				break;

			case 'en' :
				$.cookie('lang_en', langArr , { expires: 365 , path: '/' });
				$.removeCookie('lang_ja', { path: '/' });

				$('#en').fadeIn().show();
				$('#ja').fadeOut().hide();
				$('.language-list li.btn-en').removeClass('btn-en').addClass('btn-en-active');
				$('.language-list li.btn-ja-active').removeClass('btn-ja-active').addClass('btn-ja');

				break;

			default :
				$.cookie('lang_ja', langArr, { expires: 365 , path: '/' });
				$.removeCookie('lang_en', { path: '/' });

				$('#ja').fadeIn().show();
				$('#en').fadeOut().hide();
				$('.language-list li.btn-ja').removeClass('btn-ja').addClass('btn-ja-active');
				$('.language-list li.btn-en-active').removeClass('btn-en-active').addClass('btn-en');

				break;

		}

	}


	// 2.グローバルナビから言語判定をとり、そこから日本語表示か英語表示か切り替える -forPC- //
	function showLanguagePC(i) {

		var langArr = i ;

		switch (langArr) {
			case 'ja' :
				$.cookie('lang', langArr, { expires: 365 , path: '/' });
				$.removeCookie('lang_en', { path: '/' });

				$('#ja').fadeIn().show();
				$('#en').fadeOut().hide();

				break;

			case 'en' :
				$.cookie('lang', langArr, { expires: 365 , path: '/' });
				$.removeCookie('lang_ja', { path: '/' });

				$('#en').fadeIn().show();
				$('#ja').fadeOut().hide();

				break;

			default :
				$.cookie('lang', langArr, { expires: 365 , path: '/' });
				$.removeCookie('lang_en', { path: '/' });

				$('#ja').fadeIn().show();
				$('#en').fadeOut().hide();

				break;

		}

	}


	// 3.デフォルトの表示 -lang:PC版、lang_ja / lang_en:SP版- //
	$(function() {

		var lang_ja = $.cookie('lang_ja');
		var lang_en = $.cookie('lang_en');
		var lang = $.cookie('lang');

		if (lang_ja) {
			showLanguageSP('ja');
		}

		else if (lang_en) {
			showLanguageSP('en');
		}

		else if (lang === 'ja') {
			showLanguagePC('ja');
		}

		else if (lang === 'en') {
			showLanguagePC('en');
		}

		else {
			showLanguageSP('ja');
		}

	});


	// 4.切り替えた時の表示 -SP版- //
	$('#jaBtn').on('click', function() {
		showLanguageSP('ja');
	});

	$('#enBtn').on('click', function() {
		showLanguageSP('en');
	});




/* SNS API
--------------------------*/


	// Twitter-Facebook //
	function popupLink(type, _self) {

		var href,
			windowname;

		if (type === 'twitter') {
			href = 'http://twitter.com/share?original_referer=http://www.test.jp/&textテキストが入ります。&url=http://www.test.jp/';
			windowname = 'twitterwindow';
		}

		else if (type === 'facebook') {
			href = 'http://www.facebook.com/share.php?u=http://www.test.jp/';
			windowname = 'facebookwindow';
		}

		window.open(href, windowname, 'width=550, height=450,personalbar=0,toolbar=0,scrollbars=1,resizable=1');
		return false;

	}




/* 特定端末対応
--------------------------*/

	// 1.SP版とPC版でレイアウトを変える  //
	// ブレークポイントの設定 //
	$(window).setBreakpoints({
		distinct: true,
		breakpoints: [ 1, 960 ]
	});


	// ブレークポイント1124の時 //
	$(window).on('enterBreakpoint960', function() {

		// PC用画像ソースフォルダに切り替える //
		$('.img-response').each(function() {
			$(this).attr('src', $(this).attr('src').replace('sp', 'pc'));
		});

		$('#form-layoutJp').each(function() {
			$(this).attr('class', $(this).attr('class').replace('sp', 'pc'));
		});

	});


	// ブレークポイント1の時 //
	$(window).on('enterBreakpoint1', function() {

		// SP用画像ソースフォルダに切り替える //
		$('.img-response').each(function() {
			$(this).attr('src', $(this).attr('src').replace('pc', 'sp'));
		});

		$('#form-layoutJp').each(function() {
			$(this).attr('class', $(this).attr('class').replace('pc', 'sp'));
		});

	});


	// 2.Android対策 -横向きで微妙にずれる- //
	var portraitWidth,landscapeWidth;

	$(window).on('load resize', function() {


		// iPhone, iPadなど //
		if ((ua.indexOf('iPhone') > 0 && ua.indexOf('iPad') == -1) || ua.indexOf('iPod') > 0) {
			$('html').css('zoom' , 1 );
		}

		// Android //
		else if (ua.indexOf('Android') > 0) {

			// Android時の傾き（ポートレイトかランドスケープか）を判定
			if ('object' === typeof window.onorientationchange) {

				window.addEventListener('orientationchange', function () {
					if (window.innerHeight > window.innerWidth) {
						// ポートレイト（ランドスケープ）
						$('html').css('zoom' , landscapeWidth / 320 );
					}

					else {
						// ランドスケープ（ポートレイト）
						$('html').css('zoom' , portraitWidth / 320 );
					};
				}, false);

			}

		}


	}).trigger('resize');




});