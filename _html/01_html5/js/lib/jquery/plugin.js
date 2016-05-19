// JavaScript Jquery PlugIns Document


/* --------------------------

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
　→Cookieを利用した言語切替実装

・SNSAPI
　→Twitter、FacebookなどのSNS API

・Device
　→PC版とのレイアウトや挙動の切替、SPの特定端末における挙動対策等

--------------------------*/




$(function() {


/* Common UI
--------------------------*/


	/* グローバル変数
	--------------------*/
	var window_width = $(window).width();
	var window_height = $(window).height();
	var window_outer_width = $(window).outerWidth();
	var window_outer_height = $(window).outerHeight();
	var window_inner_width = $(window).innerWidth();
	var window_inner_height = $(window).innerHeight();

	var user_agent = navigator.userAgent;


	// ウィンドウ自体の幅と高さを計測し、使っているブラウザのユーザーエージェントを判定
	$(window).on('load resize', function() {

		var window_width = $(window).width();
		var window_height = $(window).height();
		$('#test01').html('ウィンドウ幅' + '&nbsp;:&nbsp;' + window_width);
		$('#test02').html('ウィンドウ高さ' + '&nbsp;:&nbsp;' + window_height);
		$('#test03').html('ユーザーエージェント' + '&nbsp;:&nbsp;' + '<br />' + user_agent);

	});


	/* test IE判定実装
	--------------------*/
	// IEであるか否かの判定
	// var isIE = false; // IEか否か
	// var version = null; // IEのバージョン

	// if(user_agent.match(/MSIE/) || user_agent.match(/Trident/) ) {

	//		isIE = true;
	//		version = user_agent.match(/(MSIE\s|rv:)([\d\.]+)/)[2];
	//		location.href='http://www.yahoo.co.jp/'

	// }


	/* test btn-hover実装
	--------------------*/
	if (user_agent.indexOf('iPhone') > 0 || user_agent.indexOf('iPad') > 0 || user_agent.indexOf('iPod') > 0 || user_agent.indexOf('Android') > 0 || user_agent.indexOf('BlackBerry') > 0 || user_agent.indexOf('windows Phone') > 0 || user_agent.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(user_agent)) {

	}

	else {

		var rootDir = location.href.split('/');
		var currentDir = rootDir[rootDir.length -2];
		var relativeFirstDir = ('include/')
		var relativeSecondDir = ('../include/')

		if ($('header#navi-1st').length) {

			$.ajax ({
				url: relativeFirstDir + 'btn.html',
				cache: true, // キャッシュを利用 //
				async: true, // 非同期で読み込む //
				processData: false,
				}).done(function(html) {
					html = html.replace(/\{\$root\}/g, relativeFirstDir);
					$('#hover').append(html);
			});

		}

		else {

			$.ajax ({
				url: relativeSecondDir + 'btn.html',
				cache: true, // キャッシュを利用 //
				async: true, // 非同期で読み込む //
				processData: false,
				}).done(function(html) {
					html = html.replace(/\{\$root\}/g, relativeSecondDir);
					$('#hover').append(html);
			});

		}

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


	/* Jsonテスト
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

		var dt_column_width = $('dl#column dt').outerWidth(); // dtの幅 //
		var dt_news_width = $('dl.news dt').outerWidth(); // dtの幅 //
		$('dl#column dd').css('margin-left', dt_column_width + 20 + 'px'); // 可変部分の高さを適用 //
		$('dl.news dd').css('margin-left', dt_news_width  + 'px'); // 可変部分の高さを適用 //

	};

	adjust();

	$(window).on('load resize', function() {
		adjust();
	})


	/* PageScroll
	--------------------*/

	$('a[rel=scroll]').on('click', function() {

			var href = $(this).attr("href"),
			target = $(href === "#" || href === "" ? 'html' : href);
			target.velocity( 'scroll', { duration: 500, easing: 'easeOutExpo' });
			return false;

	});


	/* Slider
	--------------------*/
	if (user_agent.indexOf('iPhone') > 0 || user_agent.indexOf('iPad') > 0 || user_agent.indexOf('iPod') > 0 || user_agent.indexOf('Android') > 0 || user_agent.indexOf('BlackBerry') > 0 || user_agent.indexOf('windows Phone') > 0 || user_agent.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(user_agent) || $('#carousel-example-generic').children().hasClass('item')) {

		// Slider-Config //
		$('.carousel').carousel({
			interval: 6000
		});

		// Slider-Swipe -forSP-//
		var carousel = $('.carousel');
		var hammer = new Hammer(carousel[0]);

		//左にスワイプしたら次の画像に切り替え
		hammer.on('swipeleft', function() { carousel.carousel('next'); });
		//右にスワイプしたら前の画像に切り替え
		hammer.on('swiperight', function() { carousel.carousel('prev'); });

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


	/* WindowClose
	--------------------*/
	function quitBox(cmd) {

		if ( cmd=='quit' ){
			open(location, '_self').close();
		}
		return false;

	}


	/* MouseOver
	--------------------*/
	function mouseOver(i) {

		var imgArr = i ;

		switch (imgArr) {
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

	if (user_agent.indexOf('iPhone') > 0 || user_agent.indexOf('iPad') > 0 || user_agent.indexOf('iPod') > 0 || user_agent.indexOf('Android') > 0 || user_agent.indexOf('BlackBerry') > 0 || user_agent.indexOf('windows Phone') > 0 || user_agent.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(user_agent)) {

	}

	else {

		$('img.mouseover').mouseover(function() {
			mouseOver('on')
		});

		$('img.mouseover').mouseout(function() {
			mouseOver('off')
		});

	}



	/* TargetBlank
	   for IE8
	--------------------*/
	$('.blank').on('click', function() {

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

	var tag = $('p, h1, h2, h3, h4, h5, h6, dt, dd, th, td, ul.list li, ol.list li, ul.form-accept li, a')
	$(tag).kerning('ajax/kerning.json');


	/* Centering
	--------------------*/
	$(window).on('load resize', function() {

		// min_height = 400;
		var $box = $('.bgLogin.box.center');
		var padding = parseInt($box.css('padding-top')) + parseInt($box.css('padding-bottom'));
		var margin = 50;
		var min_height = $box.height() + padding + $('footer').height() + margin;

		if( window_inner_height < min_height ) {
			window_inner_height = min_height
			$('.centerParentWrapper').css('position', 'relative');
		}

		else {
			$('.centerParentWrapper').css('position', 'fixed');
		}

		$('.centerParentWrapper').css({
			"height" : window_inner_height + "px"
		});

		$('.centerParentWrapper').css({
			"height" : window_inner_height - 30 + "px"
		});

		if (window_inner_width < 768) {
			$('.bgProduct').css({
				"width" : window_inner_width - 30 + "px"
			});
		}

		else {
			$('.bgProduct').css({
				"width" : 750 + "px"
			});
		}

	}).trigger('resize');




/* Lightbox
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
			/* グローバル変数 */
			var window_width = $(window).width();
			var window_height = $(window).height();
			var document_height = $(document).height();
			var lightbox_width = $('.bg-lightbox').width();
			var lightbox_height = $('.bg-lightbox').height();

			if (user_agent.indexOf('iPhone') > 0 || user_agent.indexOf('iPad') > 0 || user_agent.indexOf('iPod') > 0 || user_agent.indexOf('Android') > 0 || user_agent.indexOf('BlackBerry') > 0 || user_agent.indexOf('windows Phone') > 0 || user_agent.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(user_agent)) {

				$('#lb-overlay').css({
					'width' : window_width,
					'height' : window_height + 100 + 'px'
				});

				$('.lb-wrapper').css({
					'zoom' : 0.6,
					'font-size' : 1 + 'em'
				});

			}

			else {

				$('#lb-overlay').css({
					'width' : window_width,
					'height' : window_height
				});

			}

			// 傾けてもライトボックスの背景をドキュメントの高さに合わせる //
			$(window).on('load resize', function() {

				/* グローバル変数 */
				var document_height = $(document).height();
				var lightbox_width = $('.bg-lightbox').width();
				var lightbox_height = $('.bg-lightbox').height();

				if (user_agent.indexOf('iPhone') > 0 || user_agent.indexOf('iPad') > 0 || user_agent.indexOf('iPod') > 0 || user_agent.indexOf('Android') > 0 || user_agent.indexOf('BlackBerry') > 0 || user_agent.indexOf('windows Phone') > 0 || user_agent.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(user_agent)) {

					$('#lb-overlay').css({
						'width' : window_width,
						'height' : window_height + 100 + 'px'
					});

					$('.lb-wrapper').css({
						'zoom' : 0.6,
						'font-size' : 1 + 'em'
					});

				}

				else {

					$('#lb-overlay').css({
						'width' : window_width,
						'height' : window_height
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
			/* グローバル変数 */
			var document_height = $(document).height();
			var lightbox_width = $('.bg-lightbox').width();
			var lightbox_height = $('.bg-lightbox').height();

			if (user_agent.indexOf('iPhone') > 0 || user_agent.indexOf('iPad') > 0 || user_agent.indexOf('iPod') > 0 || user_agent.indexOf('Android') > 0 || user_agent.indexOf('BlackBerry') > 0 || user_agent.indexOf('windows Phone') > 0 || user_agent.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(user_agent)) {

				$('#lb-overlay').css({
					'width' : window_width,
					'height' : window_height + 100 + 'px'
				});

				$('.lb-wrapper').css({
					'zoom' : 0.6,
					'font-size' : 1 + 'em'
				});

			}

			else {

				$('#lb-overlay').css({
					'width' : window_width,
					'height' : window_height
				});

			}

			// 傾けてもライトボックスの背景をドキュメントの高さに合わせる //
			$(window).on('load resize', function() {

				/* グローバル変数 */
				var window_width = $(window).width();
				var window_height = $(window).height();
				var document_height = $(document).height();
				var lightbox_width = $('.bg-lightbox').width();
				var lightbox_height = $('.bg-lightbox').height();

				if (user_agent.indexOf('iPhone') > 0 || user_agent.indexOf('iPad') > 0 || user_agent.indexOf('iPod') > 0 || user_agent.indexOf('Android') > 0 || user_agent.indexOf('BlackBerry') > 0 || user_agent.indexOf('windows Phone') > 0 || user_agent.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(user_agent)) {

					$('#lb-overlay').css({
						'width' : window_width,
						'height' : window_height + 100 + 'px'
					});

					$('.lb-wrapper').css({
						'zoom' : 0.6,
						'font-size' : 1 + 'em'
					});

				}

				else {

					$('#lb-overlay').css({
						'width' : window_width,
						'height' : window_height
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




/* Validate
--------------------------*/


	// Submitを押したときの判定 Jp:日本語  //
	$('input#btn-confirm-ja:submit').on('click', function() {

		$('#inquiry-form-jp').validate({

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


		// エラーが出た箇所へ飛ぶ -for SP- //
		var scldurat = 500;

		function validateScrollJp(i) {

			var caseArr = i ;

			switch (caseArr) {
				case 'inquiry-list-jp' :
					target = $('#inquiry-list-jp');
					target.velocity( 'scroll', { duration: scldurat, easing: 'easeOutExpo' });
					return false;
					break;

				case 'inquiry-companyName-jp' :
					target = $('#inquiry-companyName-jp');
					target.velocity( 'scroll', { duration: scldurat, easing: 'easeOutExpo' });
					return false;
					break;

				case 'inquiry-nameJa-jp' :
					target = $('#inquiry-nameJa-jp');
					target.velocity( 'scroll', { duration: scldurat, easing: 'easeOutExpo' });
					return false;
					break;

				case 'inquiry-nameEn-jp' :
					target = $('#inquiry-nameEn-jp');
					target.velocity( 'scroll', { duration: scldurat, easing: 'easeOutExpo' });
					return false;
					break;

				case 'inquiry-mail-jp' :
					target = $('#inquiry-mail-jp');
					target.velocity( 'scroll', { duration: scldurat, easing: 'easeOutExpo' });
					return false;
					break;

				case 'inquiry-text-jp' :
					target = $('#inquiry-text-jp');
					target.velocity( 'scroll', { duration: scldurat, easing: 'easeOutExpo' });
					return false;
					break;

			}

		}


		if (user_agent.indexOf('iPhone') > 0 || user_agent.indexOf('iPad') > 0 || user_agent.indexOf('iPod') > 0 || user_agent.indexOf('Android') > 0 || user_agent.indexOf('BlackBerry') > 0 || user_agent.indexOf('windows Phone') > 0 || user_agent.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(user_agent)) {

			if ($('input#form-inquiryList-jp').val() === '') {
				validateScrollJp('inquiry-list-jp');
			}

			else if ($('input#form-inquiryCompanyName-jp').val() === '') {
				validateScrollJp('inquiry-companyName-jp');
			}

			else if ($('input#form-inquiryNameJa-jp').val() === '') {
				validateScrollJp('inquiry-nameJa-jp');
			}

			else if ($('input#form-inquiryNameEn-jp').val() === '') {
				validateScrollJp('inquiry-nameEn-jp');
			}

			else if ($('input#form-inquiryMail-jp').val() === '') {
				validateScrollJp('inquiry-mail-jp');
			}

			else if ($('textarea#form-inquiryText-jp').val() === '') {
				validateScrollJp('inquiry-text-jp');
			}

		}



	});


	// Submitを押したときの判定 En:英語  //
	$('input#btn-confirm-en:submit').on('click', function() {

		$('#inquiry-form-en').validate({

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


		// エラーが出た箇所へ飛ぶ -for SP- //
		var scldurat = 500;

		function validateScrollEn(i) {

			var caseArr = i ;

			switch (caseArr) {
				case 'inquiry-list-en' :
					target = $('#inquiry-list-en');
					target.velocity( 'scroll', { duration: scldurat, easing: 'easeOutExpo' });
					return false;
					break;

				case 'inquiry-companyName-en' :
					target = $('#inquiry-companyName-en');
					target.velocity( 'scroll', { duration: scldurat, easing: 'easeOutExpo' });
					return false;
					break;

				case 'inquiry-nameEn-en' :
					target = $('#inquiry-nameEn-en');
					target.velocity( 'scroll', { duration: scldurat, easing: 'easeOutExpo' });
					return false;
					break;

				case 'inquiry-mail-en' :
					target = $('#inquiry-mail-en');
					target.velocity( 'scroll', { duration: scldurat, easing: 'easeOutExpo' });
					return false;
					break;

				case 'inquiry-text-en' :
					target = $('#inquiry-text-en');
					target.velocity( 'scroll', { duration: scldurat, easing: 'easeOutExpo' });
					return false;
					break;

			}

		}


		if (user_agent.indexOf('iPhone') > 0 || user_agent.indexOf('iPad') > 0 || user_agent.indexOf('iPod') > 0 || user_agent.indexOf('Android') > 0 || user_agent.indexOf('BlackBerry') > 0 || user_agent.indexOf('windows Phone') > 0 || user_agent.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(user_agent)) {

			if ($('input#form-inquiryList-en').val() === '') {
				validateScrollEn('inquiry-list-en');
			}

			else if ($('input#form-inquiryCompanyName-en').val() === '') {
				validateScrollEn('inquiry-companyName-en');
			}

			else if ($('input#form-inquiryNameEn-en').val() === '') {
				validateScrollEn('inquiry-nameEn-en');
			}

			else if ($('input#form-inquiryMail-en').val() === '') {
				validateScrollEn('inquiry-mail-en');
			}

			else if ($('textarea#form-inquiryText-en').val() === '') {
				validateScrollEn('inquiry-text-en');
			}

		}


	});




/* MailForm
--------------------------*/


	// Resetを押したときの判定 //
	$('input#btn-reset-ja, input#btn-reset-en').on('click', function() {

		// バリデート注意文言を消す -日本語- //
		$('label.error').html('').hide();

		// サジェスト部分の注意文言及び[input type='hidden']内の値を消す -共通- //
		$('p#form-inquiryListDisplay-jp, p#form-inquiryListDisplay-en').html('');
		$('input#form-inquiryList-jp, input#form-inquiryList-en').val('');

		// [input type='text'][textarea]内の値を消す -共通- //
		$('input:text, input:checked, textarea').val('');

		// 同意するボタン内の値を消す -共通- //
		$('#accept-ja, #accept-en').attr('checked', false);

		// 同意ボタンにチェックが入っているか否かでのリセット、確認ボタンの判定 //
		if ($('#accept-ja:checked, #accept-en:checked').length === 0) {

			$('#btn-reset-ja').attr('id','btn-reset-off-ja').attr('disabled', true);
			$('#btn-reset-en').attr('id','btn-reset-off-en').attr('disabled', true);
			$('#btn-confirm-ja').attr('id','btn-confirm-off-ja').attr('disabled', true);
			$('#btn-confirm-en').attr('id','btn-confirm-off-en').attr('disabled', true);

		}

		// リセットボタン押したらページトップへ飛ぶ -for SP- //
		var scldurat = 500;

		if (user_agent.indexOf('iPhone') > 0 || user_agent.indexOf('iPad') > 0 || user_agent.indexOf('iPod') > 0 || user_agent.indexOf('Android') > 0 || user_agent.indexOf('BlackBerry') > 0 || user_agent.indexOf('windows Phone') > 0 || user_agent.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(user_agent)){

			target = $('#form');
			target.velocity( 'scroll', { duration: scldurat, easing: 'easeOutExpo' });
			return false;

		}

	});


	// 同意ボタンを押したときのリセット、確認ボタンの判定 //
	/*  default */
			$('#btn-reset-ja').attr('id', 'btn-reset-off-ja').attr('disabled', true);
			$('#btn-reset-en').attr('id', 'btn-reset-off-en').attr('disabled', true);
			$('#btn-confirm-ja').attr('id', 'btn-confirm-off-ja').attr('disabled', true);
			$('#btn-confirm-en').attr('id', 'btn-confirm-off-en').attr('disabled', true);

	/*  accept */
	$('#accept-ja,#accept-en').click(function() {

		if ($('#accept-ja:checked,#accept-en:checked').length === 1) {

			$('#btn-reset-off-ja').attr('id', 'btn-reset-ja').attr('disabled', false);
			$('#btn-reset-off-en').attr('id', 'btn-reset-en').attr('disabled', false);
			$('#btn-confirm-off-ja').attr('id', 'btn-confirm-ja').attr('disabled', false);
			$('#btn-confirm-off-en').attr('id', 'btn-confirm-en').attr('disabled', false);

		}

		else {

			$('#btn-reset-ja').attr('id', 'btn-reset-off-ja').attr('disabled', true);
			$('#btn-reset-en').attr('id', 'btn-reset-off-en').attr('disabled', true);
			$('#btn-confirm-ja').attr('id', 'btn-confirm-off-ja').attr('disabled', true);
			$('#btn-confirm-en').attr('id', 'btn-confirm-off-en').attr('disabled', true);

		}

	}).css('cursor','pointer');


	// 戻るボタンを押したときの判定 //
	$('input#btn-formback-ja, input#btn-formback-en').on('click', function() {
		location.href='index.html'
	});


	// SPとPCでとび先を変える //
	$(window).on('load', function() {

		// -for SP- //
		if (user_agent.indexOf('iPhone') > 0 || user_agent.indexOf('iPad') > 0 || user_agent.indexOf('iPod') > 0 || user_agent.indexOf('Android') > 0 || user_agent.indexOf('BlackBerry') > 0 || user_agent.indexOf('windows Phone') > 0 || user_agent.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(user_agent)) {

			$('.policy').on('click', function() {
				// location.href='../sitepolicy/index.html'
				// window.open('../sitepolicy/index.html', '_blank');
				return false;
			});

		}

		// -for PC-  //
		else {

			$('.policy').on('click', function() {
				// location.href='../../#/sitepolicy/'
				// window.open('../../#/sitepolicy/', '_blank');
				return false;
			});

		}

	});




/* Suggest
--------------------------*/


	// Suggest En:英語、Jp:日本語  //
	// サジェスト外がクリッカブルになる為のサジェストクリアゾーン -初期設定: hidden- //
	$('.suggest-clear').hide();

	$(window).on('load resize', function() {

		// サジェストを出す -forSP- //
		if (user_agent.indexOf('iPhone') > 0 || user_agent.indexOf('iPad') > 0 || user_agent.indexOf('iPod') > 0 || user_agent.indexOf('Android') > 0 || user_agent.indexOf('BlackBerry') > 0 || user_agent.indexOf('windows Phone') > 0 || user_agent.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(user_agent)) {

			$('#form-inquiryListDisplay-jp, #form-inquiryListDisplay-en').on({

				// タッチがサジェストの上に乗った時の判定 //
				'click':function() {

					$('#suggest-jp, #suggest-en').fadeIn();

					// サジェストクリアゾーンを出す //
					$('.suggest-clear').show();

					// サジェストクリアゾーンが全面に出るように設定 //
					var window_width = $(window).width();
					var window_height = $(window).height();
					$('.suggest-clear').css({
						'width': window_width,
						'height': window_height,
					});

				}

			});

			$('.suggest-clear').on({

				// タッチがサジェストクリアゾーンの上に乗った時の判定 //
				'click':function() {
					$('#suggest-jp, #suggest-en').fadeOut();
					$('.suggest-clear').hide();
				}

			});

		}


		// サジェストを出す -for PC- //
		else {

			// マウスカーソルがセレクターの上に乗ったらサジェストを出す//
			$('.suggest-pc').on({

				// マウスカーソルがサジェストの上に乗った時の判定 //
				'mouseenter':function() {
					$('#suggest-jp, #suggest-en').fadeIn();
				},
				// マウスカーソルがサジェストの上から外れた時の判定 //
				'mouseleave':function() {
					$('#suggest-jp, #suggest-en').fadeOut();
				}

			});

		}

		// セレクター内のテキストをクリックした時の判定  //
		$('#suggest-jp, #suggest-en').on('click', function() {

			$('#suggest-jp, #suggest-en').fadeOut();
			$('.suggest-clear').hide();

		});

	});


	// サジェスト内のお問い合わせ事項テキストを値として読み込む  //
	var suggestBusinessJp = $('#menu-jp1').text();
	var suggestRecruitJp  = $('#menu-jp2').text();
	var suggestCreativeJp = $('#menu-jp3').text();
	var suggestPersonalJp = $('#menu-jp4').text();
	var suggestOtherJp    = $('#menu-jp5').text();

	var suggestBusinessEn = $('#menu-en1').text();
	var suggestRecruitEn  = $('#menu-en2').text();
	var suggestCreativeEn = $('#menu-en3').text();
	var suggestPersonalEn = $('#menu-en4').text();
	var suggestOtherEn    = $('#menu-en5').text();


	// テキストの値をinput#inquiryListへ与える  //
	$('#menu-jp1, #menu-en1').mouseover(function() {

		$('#form-inquiryList-jp').val(suggestBusinessJp);
		$('#form-inquiryListDisplay-jp').html(suggestBusinessJp);
		$('#form-inquiryList-en').val(suggestBusinessEn);
		$('#form-inquiryListDisplay-en').html(suggestBusinessEn);

	});

	$('#menu-jp2, #menu-en2').mouseover(function() {

		$('#form-inquiryList-jp').val(suggestRecruitJp);
		$('#form-inquiryListDisplay-jp').html(suggestRecruitJp);
		$('#form-inquiryList-en').val(suggestRecruitEn);
		$('#form-inquiryListDisplay-en').html(suggestRecruitEn);

	});

	$('#menu-jp3, #menu-en3').mouseover(function() {

		$('#form-inquiryList-jp').val(suggestCreativeJp);
		$('#form-inquiryListDisplay-jp').html(suggestCreativeJp);
		$('#form-inquiryList-en').val(suggestCreativeEn);
		$('#form-inquiryListDisplay-en').html(suggestCreativeEn);

	});

	$('#menu-jp4, #menu-en4').mouseover(function() {

		$('#form-inquiryList-jp').val(suggestPersonalJp);
		$('#form-inquiryListDisplay-jp').html(suggestPersonalJp);
		$('#form-inquiryList-en').val(suggestPersonalEn);
		$('#form-inquiryListDisplay-en').html(suggestPersonalEn);

	});

	$('#menu-jp5, #menu-en5').mouseover(function() {

		$('#form-inquiryList-jp').val(suggestOtherJp);
		$('#form-inquiryListDisplay-jp').html(suggestOtherJp);
		$('#form-inquiryList-en').val(suggestOtherEn);
		$('#form-inquiryListDisplay-en').html(suggestOtherEn);

	});




/* LanguageChange
--------------------------*/


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


	// 2.グローバルナビから言語判定をとり、そこから日本語表示か英語表示か切り替える -for PC- //
	function showLanguagePC(i) {

		var langArr = i ;

		switch (langArr) {

			case 'ja' :
				/* Cookie判定 */
				$.cookie('lang', langArr, { expires: 365 , path: '/' });
				$.removeCookie('lang_en', { path: '/' });

				/* IDを切り替え */
				$('#ja').fadeIn().show();
				$('#en').fadeOut().hide();
				break;

			case 'en' :
				/* Cookie判定 */
				$.cookie('lang', langArr, { expires: 365 , path: '/' });
				$.removeCookie('lang_ja', { path: '/' });

				/* IDを切り替え */
				$('#en').fadeIn().show();
				$('#ja').fadeOut().hide();
				break;

			default :
				/* Cookie判定 */
				$.cookie('lang', langArr, { expires: 365 , path: '/' });
				$.removeCookie('lang_en', { path: '/' });

				/* IDを切り替え */
				$('#ja').fadeIn().show();
				$('#en').fadeOut().hide();
				break;

		}

	}


	// 2.グローバルナビから言語判定をとり、そこから日本語表示か英語表示か切り替える -for SP-//
	function showLanguageSP(i) {

		var langArr = i ;

		switch (langArr){

			case 'ja' :
				/* Cookie判定 */
				$.cookie('lang_ja', langArr, { expires: 365 , path: '/' });
				$.removeCookie('lang_en', { path: '/' });

				/* IDを切り替え */
				$('#ja').fadeIn().show();
				$('#en').fadeOut().hide();

				/* Classを切り替え */
				$('.language-list li.btn-ja').removeClass('btn-ja').addClass('btn-ja-active');
				$('.language-list li.btn-en-active').removeClass('btn-en-active').addClass('btn-en');
				break;

			case 'en' :
				/* Cookie判定 */
				$.cookie('lang_en', langArr , { expires: 365 , path: '/' });
				$.removeCookie('lang_ja', { path: '/' });

				/* IDを切り替え */
				$('#en').fadeIn().show();
				$('#ja').fadeOut().hide();

				/* Classを切り替え */
				$('.language-list li.btn-en').removeClass('btn-en').addClass('btn-en-active');
				$('.language-list li.btn-ja-active').removeClass('btn-ja-active').addClass('btn-ja');
				break;

			default :
				/* Cookie判定 */
				$.cookie('lang_ja', langArr, { expires: 365 , path: '/' });
				$.removeCookie('lang_en', { path: '/' });

				/* IDを切り替え */
				$('#ja').fadeIn().show();
				$('#en').fadeOut().hide();

				/* Classを切り替え */
				$('.language-list li.btn-ja').removeClass('btn-ja').addClass('btn-ja-active');
				$('.language-list li.btn-en-active').removeClass('btn-en-active').addClass('btn-en');
				break;

		}

	}


	// 3.デフォルトの表示 -lang:PC版、lang_ja / lang_en:SP版- //
	var lang_ja = $.cookie('lang_ja');
	var lang_en = $.cookie('lang_en');

	if (lang_ja) {
		showLanguagePC('ja');
		showLanguageSP('ja');
	}

	else if (lang_en) {
		showLanguagePC('en');
		showLanguageSP('en');
	}

	else {
		showLanguagePC();
		showLanguageSP();
	}


	// 4.切り替えた時の表示 -SP版- //
	$('#jaBtn').on('click', function() {
		showLanguagePC('ja');
	});

	$('#enBtn').on('click', function() {
		showLanguageSP('en');
	});




/* SNSAPI
--------------------------*/


	// Twitter-Facebook //
	function popupLink(type, _self) {

		var href,
			windowname;

		if (type === 'twitter') {
			href = 'http://twitter.com/share?original_referer=http://wwww.test.jp/&textテキストが入ります。&url=http://wwww.test.jp/';
			windowname = 'twitterwindow';
		}

		else if (type === 'facebook') {
			href = 'http://www.facebook.com/share.php?u=http://www.test.jp/';
			windowname = 'facebookwindow';
		}

		window.open(href, windowname, 'width=550, height=450,personalbar=0,toolbar=0,scrollbars=1,resizable=1');
		return false;

	}




/* Device
--------------------------*/


	// 1.SP版とPC版でレイアウトを変える  //
	// ブレークポイントの設定 //
	$(window).setBreakpoints({

		distinct: true,
		breakpoints: [ 1, 945 ]

	});


	// ブレークポイント945の時 //
	$(window).on('enterBreakpoint945', function() {


		// PC用画像ソースフォルダに切り替える //
		$('.img-response').each(function() {
			$(this).attr('src', $(this).attr('src').replace('sp', 'pc'));
		});

		$('#form-layoutJp').each(function() {
			$(this).attr('class', $(this).attr('class').replace('sp', 'pc'));
			$('.colon').show();
			$('dl.form-pc dd').css('width', 400 + 'px' );
		});

		$('#suggest').each(function() {
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
			$('.colon').hide();
			$('dl.form-sp dd').css('width', 400 / 400 * 100 + '%' );
		});

		$('#suggest').each(function() {
			$(this).attr('class', $(this).attr('class').replace('pc', 'sp'));
		});

	});


	// 2.Android対策 -横向きで微妙にずれる- //
	var portraitWidth,landscapeWidth;

	$(window).on('load resize', function() {

		// iPhone, iPadなど //
		if ((user_agent.indexOf('iPhone') > 0 && user_agent.indexOf('iPad') == -1) || user_agent.indexOf('iPod') > 0) {
			$('html').css('zoom' , 1 );
		}

		// Android //
		else if (user_agent.indexOf('Android') > 0) {

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
					}

				}, false);

			}

		}

	}).trigger('resize');


});