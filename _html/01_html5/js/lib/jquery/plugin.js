// JavaScript Jquery PlugIns Document




/*----------------------------------------------------

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

・Device Adjust
　→PC版とのレイアウトや挙動の切替、SPの特定端末における挙動対策等

----------------------------------------------------*/




$(function() {


	/* Common UI
	------------------------------------------------------------------------------*/




		/* グローバル変数
		----------------------------------------*/


		// ウィンドウのサイズ判定 //
		var window_width = $(window).width();
		var window_height = $(window).height();
		var window_outer_width = $(window).outerWidth();
		var window_outer_height = $(window).outerHeight();
		var window_inner_width = $(window).innerWidth();
		var window_inner_height = $(window).innerHeight();


		// ディレクトリの判定 //
		var rootDir = location.href.split('/');
		var currentDir = rootDir[rootDir.length -2];
		var relativeFirstDir = ('include/');
		var relativeSecondDir = ('../include/');
		var relativeThirdDir = ('../../include/');


		// 端末ユーザーエージェントの判定 //
		var user_agent = navigator.userAgent;




			/* ユーザーエージェント一覧
			----------------------------------------


			//　iOS
			user_agent.indexOf('iPhone') > 0
			user_agent.indexOf('iPad') > 0
			user_agent.indexOf('iPod') > 0

			//　Android
			user_agent.indexOf('Android') > 0

			//　BlackBerry
			user_agent.indexOf('BlackBerry') > 0

			//　Windows Phone
			user_agent.indexOf('windows Phone') > 0

			//　NOKIA
			user_agent.indexOf('NOKIA') > 0

			//　Firefox OS
			/Mobile.*Firefox/.test(user_agent)

			//　IE
			user_agent.match(/MSIE/) 　////　vr.11 or high
			user_agent.match(/Trident/) ////　vr.10 or less


			----------------------------------------
			*/




		/* 【TEST】
		----------------------------------------------------*/




			/* 【TEST】 window判定実装
			   ウィンドウ自体の幅と高さを計測し、使っているブラウザのユーザーエージェントを判定
			----------------------------------------*/


			function testUserStatusDecision() {

				var window_width = $(window).width();
				var window_height = $(window).height();

				$('#test01').html('ウィンドウ幅' + '&nbsp;:&nbsp;' + window_width);
				$('#test02').html('ウィンドウ高さ' + '&nbsp;:&nbsp;' + window_height);
				$('#test03').html('ユーザーエージェント' + '&nbsp;:&nbsp;' + '<br />' + user_agent);
				$('#test04').html('現在のディレクトリ' + '&nbsp;:&nbsp;' + currentDir);

			}

			$(window).on('load resize', function() {
				testUserStatusDecision();
			});




			/*【TEST】 IE判定実装
			----------------------------------------*/


			/* IEか否か */
			var isIE = false;

			/* IEのバージョン */
			var version = null;

			/* IEであるか否かの判定 */
			if(user_agent.match(/MSIE/) || user_agent.match(/Trident/) ) {

				isIE = true;
				version = user_agent.match(/(MSIE\s|rv:)([\d\.]+)/)[2];
			    version = parseInt(version);
				console.log('IE : Ver:', version);

			}




			/* 【TEST】 Json読み込み
			----------------------------------------*/


			function testJsonSelect(rootDir) {

				return $.getJSON(rootDir + 'ajax/text.json', function(data) {

					var items = [];
					$.each(data, function(key, val) {
						items.push('<li id=' + key + '>' + val + '</li>');
					});

					$('<ul/>',{
						'class': 'my-new-list',
						html: items.join('')
					}).appendTo('#test05');

				});

			}


			if ($('header#navi-1st-none').length || $('header#navi-1st').length) {
				testJsonSelect('./');
			}

			else if ($('header#navi-2nd').length) {
				testJsonSelect('../');
			}

			else if ($('header#navi-3rd').length) {
				testJsonSelect('../../');
			}




			/*【TEST】 btn-hover実装
			----------------------------------------*/


			function btnHoverSelect(rootDir) {

				return $.ajax ({

					type: 'GET',
					url: rootDir + 'include/btn.html',
					}).done(function(btn){
						btn = btn.replace(/\{\$root\}/g, rootDir);
						$('#hover').append(btn);
				});

			}


			if (user_agent.indexOf('iPhone') > 0 || user_agent.indexOf('iPad') > 0 || user_agent.indexOf('iPod') > 0 || user_agent.indexOf('Android') > 0 || user_agent.indexOf('BlackBerry') > 0 || user_agent.indexOf('windows Phone') > 0 || user_agent.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(user_agent) ) {
				btnHoverSelect();
			}

			else if ($('header#navi-1st').length) {
				btnHoverSelect('./');
			}

			else if ($('header#navi-2nd').length) {
				btnHoverSelect('../');
			}

			else if ($('header#navi-3rd').length) {
				btnHoverSelect('../../');
			}

			else {
				btnHoverSelect();
			}




		/* 【TEST】ここまで
		----------------------------------------------------*/




		/* Header共通化
		----------------------------------------------------*/


		function headerSelect(rootDir) {

			return $.ajax ({

				type: 'GET',
				url: rootDir + 'include/header.html',
				}).done(function(html){
					html = html.replace(/\{\$root\}/g, rootDir);
					$('header').append(html);

			});

		}


		if ($('header#navi-1st').length) {
			headerSelect('./')
		}

		else if ($('header#navi-2nd').length) {
			headerSelect('../')
		}

		else if ($('header#navi-3rd').length) {
			headerSelect('../../');
		}




		/* dt adjust -- 定義タグで表組する場合
		----------------------------------------------------*/


		// dtの幅を定義して、dtに応じてddのマージンを調整しdt,ddでの表組を作る //
		function dtAdjust() {

			/* dtの幅 */
			var dt_column_width = $('dl#column dt').outerWidth();
			var dt_news_width = $('dl.news dt').outerWidth();

			/* 可変部分の高さを適用 */
			$('dl#column dd').css('margin-left', dt_column_width + 20 + 'px');
			$('dl.news dd').css('margin-left', dt_news_width  + 'px');

		}


		// DOM通常 //
		dtAdjust();


		// DOMリサイズ //
		$(window).on('load resize', function() {
			dtAdjust();
		});




		/* PageScroll
		----------------------------------------------------*/


		$('a[rel=scroll]').on('click', function() {

			// リンクの判定 //
			var href = $(this).attr('href');

			target = $(href === "#" || href === "" ? 'html' : href);
			target.velocity('scroll', {
				duration: 500,
				easing: 'easeOutExpo'
			});
			return false;

		});




		/* Slider
		----------------------------------------------------*/


		// Slider-Config //
		$('#carousel-slider').carousel({
			interval: 8000
		});


		// Slider-Swipe -for SP- //
		function carouselSliderFlick() {

			var carouselslider = $('#carousel-slider');
			var carousel = new Hammer(carouselslider[0]);

			/* 左にスワイプしたら次の画像に切り替え */
			carousel.on('swipeleft', function() {
				carouselslider.carousel('next');
			});

			/* 右にスワイプしたら前の画像に切り替え */
			carousel.on('swiperight', function() {
				carouselslider.carousel('prev');
			});

		}


		if ($('#carousel-slider').length) {
			carouselSliderFlick();
		}




		/* Tabs
		----------------------------------------------------*/


		$('#tabs').tabs({

			collapsible: false,
			show: { effect: 'fadeIn', duration: 800 },
			fx: { height: 'toggle', opacity: 'toggle', duration: 300 }

		});




		/* WindowClose
		----------------------------------------------------*/


		function quitBox(cmd) {

			if (cmd=='quit'){
				open(location, '_self').close();
			}
			return false;

		}




		/* MouseOver
		----------------------------------------------------*/


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

					break;

			}

		}


		if (user_agent.indexOf('iPhone') > 0 || user_agent.indexOf('iPad') > 0 || user_agent.indexOf('iPod') > 0 || user_agent.indexOf('Android') > 0 || user_agent.indexOf('BlackBerry') > 0 || user_agent.indexOf('windows Phone') > 0 || user_agent.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(user_agent)) {

			$('img.mouseover').mouseover(function() {
				mouseOver();
			}).mouseout(function() {
				mouseOver();
			});

		}

		else {

			$('img.mouseover').mouseover(function() {
				mouseOver('on');
			}).mouseout(function() {
				mouseOver('off')
			});

		}




		/* TargetBlank
		   for IE8
		----------------------------------------------------*/


		$('.blank').on('click', function() {

			// リンクの判定 //
			var href = $(this).attr('href');

			window.open(href, '_blank');
			return false;

		});




		/* Kerning
		----------------------------------------------------*/


		/*Attention
		----------------------------------------------------------------------------------------------------

		※約物含めたリンク箇所でのカーニング指定を行うと挙動がおかしくなる
		　→約物を記号化、前後に半角スペースを入れる事で対応
		  例）<a href="javascript:void(0)" class="policy"> &#12300;個人情報の取り扱いについて&#12301; </a>

		----------------------------------------------------------------------------------------------------
		*/


		function kerningDir(rootDir) {

			return $.getJSON(rootDir + 'ajax/kerning.json', function(data) {

				/* 中にテキストが入るタグの判定 */
				var tag = $('p, h1, h2, h3, h4, h5, h6, .carousel-caption, dl.news dt, dl.news dd, dl#column dt, dl#column dd, dl#form-layout-jp dt, dl#form-layout-en dt, ul.list li, ol.list li, ul.suggest-menu li, ul.form-accept li, th, td, a, address')

				$(tag).kerning({
					'data': data
				});

			});

		}


		if ($('header#navi-1st-none').length || $('header#navi-1st').length) {
			kerningDir('./');
		}

		else if ($('header#navi-2nd').length) {
			kerningDir('../');
		}

		else if ($('header#navi-3rd').length) {
			kerningDir('../../');
		}




		/* Centering
		----------------------------------------------------*/


		$(window).on('load resize', function() {

			// min_height = 400;
			var box = $('.centerParentWrapper');
			var padding = parseInt(box.css('padding-top')) + parseInt(box.css('padding-bottom'));
			var margin = 50;
			var min_height = box.height() + padding + $('footer').height() + margin;

			if( window_inner_height < min_height ) {

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
				'height' : window_inner_height + 'px'
			});

			$('#fixed-container').css({
				'height' : window_inner_height - 30 + 'px'
			});

		}).trigger('resize');




	/* Common UI ここまで
	------------------------------------------------------------------------------*/




	/* Lightbox
	------------------------------------------------------------------------------*/




		function colorbox(rootDir) {


			$.getScript(rootDir + 'js/lib/jquery/jquery.colorbox.min.js', function(){


				/* 用途別colorbox実行スクリプト */
				$('.group1').colorbox({

					rel: 'group1',
					transition: 'fade',
					slideshow: false,

					fixed: true,
					maxWidth: '90%',
					maxHeight: '90%',
					reposition: true,
					opacity: '0.3',

					retinaImage: false,
					retinaUrl: false

				});

				$('.group2').colorbox({

					rel: 'group2',
					transition: 'fade',
					slideshow: false,

					fixed: true,
					maxWidth: '90%',
					maxHeight: '90%',
					reposition: true,
					opacity: '0.3',

					retinaImage: false,
					retinaUrl: false

				});

				$('.ajax').colorbox();

				$('.youtube').colorbox({

					iframe: true,
					innerWidth: 640,
					innerHeight: 390

				});

				$('.vimeo').colorbox({

					iframe: true,
					innerWidth: 500,
					innerHeight: 409

				});

				$('.iframe').colorbox({

					iframe: true,
					width: '80%',
					height: '80%'

				});

				$('.inline').colorbox({

					inline: true,
					width: '50%'

				});

				$('.callbacks').colorbox({

					onOpen:function() {
						alert('onOpen: colorbox is about to open');
					},
					onLoad:function() {
						alert('onLoad: colorbox has started to load the targeted content');
					},
					onComplete:function() {
						alert('onComplete: colorbox has displayed the loaded content');
					},
					onCleanup:function() {
						alert('onCleanup: colorbox has begun the close process');
					},
					onClosed:function() {
						alert('onClosed: colorbox has completely closed');
					}

				});

				$('.non-retina').colorbox({

					rel: 'group5',
					transition: 'none'

				})

				$('.retina').colorbox({

					rel: 'group5',
					transition: 'none',
					retinaImage: true,
					retinaUrl: true

				});


				/* inlineで呼び出すcolorbox実行スクリプト例 */
				$('#click').on('click', function() {

					$('#click').css({

						'background-color': '#f00',
						'color': '#fff',
						'cursor': 'inherit'

					}).text("Open this window again and this message will still be here.");
					return false;

				});


			});


		}


		if ($('header#navi-1st-none').length || $('header#navi-1st').length) {
			colorbox('./');
		}

		else if ($('header#navi-2nd').length) {
			colorbox('../');
		}

		else if ($('header#navi-3rd').length) {
			colorbox('../../');
		}




	/* Lightbox ここまで
	------------------------------------------------------------------------------*/




	/* Validate
	------------------------------------------------------------------------------*/




		// Submitを押したときのバリデート判定 Jp:日本語  //
		$('input#btn-confirm-ja:submit').on('click', function() {


			/* エラー判定 */
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
						required: true,
						kana: true
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
						required: '※必須項目です。',
						kana: '※全角文字で入力して下さい。'
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


			/* エラーが出た箇所へ飛ぶ */
			var scldurat = 500;

			function validateScrollJp(i) {

				var caseArr = i ;

				switch (caseArr) {

					case 'inquiry-list-jp' :

						target = $('#inquiry-list-jp');
						target.velocity('scroll', {
							duration: scldurat, easing: 'easeOutExpo'
						});
						return false;
						break;

					case 'inquiry-companyName-jp' :

						target = $('#inquiry-companyName-jp');
						target.velocity('scroll', {
							duration: scldurat, easing: 'easeOutExpo'
						});
						return false;
						break;

					case 'inquiry-nameJa-jp' :

						target = $('#inquiry-nameJa-jp');
						target.velocity('scroll', {
							duration: scldurat, easing: 'easeOutExpo'
						});
						return false;
						break;

					case 'inquiry-nameEn-jp' :

						target = $('#inquiry-nameEn-jp');
						target.velocity('scroll', {
							duration: scldurat, easing: 'easeOutExpo'
						});
						return false;
						break;

					case 'inquiry-mail-jp' :

						target = $('#inquiry-mail-jp');
						target.velocity('scroll', {
							duration: scldurat, easing: 'easeOutExpo'
						});
						return false;
						break;

					case 'inquiry-text-jp' :
						target = $('#inquiry-text-jp');
						target.velocity('scroll', {
							duration: scldurat, easing: 'easeOutExpo'
						});
						return false;
						break;

				}

			}


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

		});


		// Submitを押したときのバリデート判定 En:英語  //
		$('input#btn-confirm-en:submit').on('click', function() {


			/* エラー判定 */
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
						alphabet: true,
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
						required: '*Please enter your company name.'
					},
					inquiryNameEnEn :{
						required: '*Please enter your name.'
					},
					inquiryMailEn :{
						required: '*Please enter your e-mail address.',
						alphabet: '*Please enter the alphabet.',
						email: '*Your e-mail address is incorrect.'
					},
					inquiryTextEn :{
						required: '*Please enter xxx.'
					}

				}

			});


			/* エラーが出た箇所へ飛ぶ */
			var scldurat = 500;

			function validateScrollEn(i) {

				var caseArr = i ;

				switch (caseArr) {

					case 'inquiry-list-en' :

						target = $('#inquiry-list-en');
						target.velocity('scroll', {
							duration: scldurat, easing: 'easeOutExpo'
						});
						return false;
						break;

					case 'inquiry-companyName-en' :

						target = $('#inquiry-companyName-en');
						target.velocity('scroll', {
							duration: scldurat, easing: 'easeOutExpo'
						});
						return false;
						break;

					case 'inquiry-nameEn-en' :

						target = $('#inquiry-nameEn-en');
						target.velocity('scroll', {
							duration: scldurat, easing: 'easeOutExpo'
						});
						return false;
						break;

					case 'inquiry-mail-en' :

						target = $('#inquiry-mail-en');
						target.velocity('scroll', {
							duration: scldurat, easing: 'easeOutExpo'
						});
						return false;
						break;

					case 'inquiry-text-en' :

						target = $('#inquiry-text-en');
						target.velocity('scroll', {
							duration: scldurat, easing: 'easeOutExpo'
						});
						return false;
						break;

				}

			}


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


		});




	/* Validate ここまで
	------------------------------------------------------------------------------*/




	/* MailForm
	------------------------------------------------------------------------------*/




		// 同意する //
		function mailFormInputAbled() {

			$('#btn-reset-off-ja').attr('id', 'btn-reset-ja').attr('disabled', false);
			$('#btn-reset-off-en').attr('id', 'btn-reset-en').attr('disabled', false);
			$('#btn-confirm-off-ja').attr('id', 'btn-confirm-ja').attr('disabled', false);
			$('#btn-confirm-off-en').attr('id', 'btn-confirm-en').attr('disabled', false);

		}


		// 同意しない //
		function mailFormInputDisabled() {

			$('#btn-reset-ja').attr('id','btn-reset-off-ja').attr('disabled', true);
			$('#btn-reset-en').attr('id','btn-reset-off-en').attr('disabled', true);
			$('#btn-confirm-ja').attr('id','btn-confirm-off-ja').attr('disabled', true);
			$('#btn-confirm-en').attr('id','btn-confirm-off-en').attr('disabled', true);

		}


		// 入力内容を消す //
		function mailFormInputReset() {

			/* バリデート注意文言を消す -日本語- */
			$('label.error').html('').hide();

			/* サジェスト部分の注意文言及び[input type='hidden']内の値を消す -共通-*/
			$('p#form-inquiryListDisplay-jp, p#form-inquiryListDisplay-en').html('');
			$('input#form-inquiryList-jp, input#form-inquiryList-en').val('');


			/* [input type='text'][textarea]内の値を消す -共通- */
			$('input:text, input:checked, textarea').val('');


			/* 同意するボタン内の値を消す -共通- */
			$('#accept-ja, #accept-en').attr('checked', false);


			/* 同意ボタンにチェックが入っているか否かでのリセット、確認ボタンの動作 */
			if ($('#accept-ja:checked, #accept-en:checked').length === 0) {
				mailFormInputDisabled();
			}


			/* リセットボタン押したらページトップへ飛ぶ */
			var scldurat = 500;

			target = $('#form');
			target.velocity('scroll', {
				duration: scldurat, easing: 'easeOutExpo'
			});
			return false;

		}


		// Resetを押したときの動作 //
		$('input#btn-reset-ja, input#btn-reset-en').on('click', function() {
			mailFormInputReset();
		});


		// 同意ボタンを押したときのリセット、確認ボタンの動作 //
		/*  default */
		mailFormInputDisabled();

		/*  accept */
		$('#accept-ja,#accept-en').click(function() {

			if ($('#accept-ja:checked,#accept-en:checked').length === 1) {
				mailFormInputAbled();
			}

			else {
				mailFormInputDisabled();
			}

		}).css('cursor','pointer');


		// 戻るボタンを押したときの動作 //
		$('input#btn-formback-ja, input#btn-formback-en').on('click', function() {
			location.href='index.html'
		});


		// SPとPCでとび先を変える //
		$(window).on('load', function() {


			/* -for SP- */
			if (user_agent.indexOf('iPhone') > 0 || user_agent.indexOf('iPad') > 0 || user_agent.indexOf('iPod') > 0 || user_agent.indexOf('Android') > 0 || user_agent.indexOf('BlackBerry') > 0 || user_agent.indexOf('windows Phone') > 0 || user_agent.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(user_agent)) {

				$('.policy').on('click', function() {
					// location.href='../sitepolicy/index.html'
					// window.open('../sitepolicy/index.html', '_blank');
					return false;
				});

			}


			/* -for PC- */
			else {

				$('.policy').on('click', function() {
					// location.href='../../#/sitepolicy/'
					// window.open('../../#/sitepolicy/', '_blank');
					return false;
				});

			}


		});




	/* MailForm ここまで
	------------------------------------------------------------------------------*/




	/* Suggest
	------------------------------------------------------------------------------*/




		// Suggest En:英語、Jp:日本語  //
		/* サジェスト外がクリッカブルになる為のサジェストクリアゾーン -初期設定: hidden- */
		$('.suggest-clear').hide();

		$(window).on('load resize', function() {


			/* サジェストを出す -for SP- */
			if (user_agent.indexOf('iPhone') > 0 || user_agent.indexOf('iPad') > 0 || user_agent.indexOf('iPod') > 0 || user_agent.indexOf('Android') > 0 || user_agent.indexOf('BlackBerry') > 0 || user_agent.indexOf('windows Phone') > 0 || user_agent.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(user_agent)) {


				/* タッチがサジェストの上に乗った時の判定 */
				$('#form-inquiryListDisplay-jp, #form-inquiryListDisplay-en').on('click', function() {

					/* サジェストクリアゾーンを出す */
					$('#suggest-jp, #suggest-en').fadeIn();
					$('.suggest-clear').show();


					/* サジェストクリアゾーンが全面に出るように設定 */
					var window_width = $(window).width();
					var window_height = $(window).height();
					$('.suggest-clear').css({
						'width': window_width,
						'height': window_height,
					});

				});


				/* タッチがサジェストクリアゾーンの上に乗った時の動作 */
				$('.suggest-clear').on('click', function() {
					$('#suggest-jp, #suggest-en').fadeOut();
					$('.suggest-clear').hide();
				});


			}


			/* サジェストを出す -for PC- */
			else {


				/* マウスカーソルがセレクターの上に乗ったらサジェストを出す */
				$('.suggest-pc').on({

					/* マウスオン */
					'mouseenter': function() {
					$('#suggest-jp, #suggest-en').fadeIn();
					},

					/* マウスアウト */
					'mouseleave': function() {
						$('#suggest-jp, #suggest-en').fadeOut();
					}

				});


			}


			/* セレクター内のテキストをクリックした時の動作 */
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


		function suggestMenu(i) {

			var caseArr = i ;

			switch (caseArr) {

				case 'menu1' :

					$('#form-inquiryList-jp').val(suggestBusinessJp);
					$('#form-inquiryListDisplay-jp').html(suggestBusinessJp);
					$('#form-inquiryList-en').val(suggestBusinessEn);
					$('#form-inquiryListDisplay-en').html(suggestBusinessEn);
					break;

				case 'menu2' :

					$('#form-inquiryList-jp').val(suggestRecruitJp);
					$('#form-inquiryListDisplay-jp').html(suggestRecruitJp);
					$('#form-inquiryList-en').val(suggestRecruitEn);
					$('#form-inquiryListDisplay-en').html(suggestRecruitEn);
					break;

				case 'menu3' :

					$('#form-inquiryList-jp').val(suggestCreativeJp);
					$('#form-inquiryListDisplay-jp').html(suggestCreativeJp);
					$('#form-inquiryList-en').val(suggestCreativeEn);
					$('#form-inquiryListDisplay-en').html(suggestCreativeEn);
					break;

				case 'menu4' :

					$('#form-inquiryList-jp').val(suggestPersonalJp);
					$('#form-inquiryListDisplay-jp').html(suggestPersonalJp);
					$('#form-inquiryList-en').val(suggestPersonalEn);
					$('#form-inquiryListDisplay-en').html(suggestPersonalEn);
					break;

				case 'menu5' :

					$('#form-inquiryList-jp').val(suggestOtherJp);
					$('#form-inquiryListDisplay-jp').html(suggestOtherJp);
					$('#form-inquiryList-en').val(suggestOtherEn);
					$('#form-inquiryListDisplay-en').html(suggestOtherEn);
					break;

			}

		}


		// テキストの値をinput#inquiryListへ与える  //
		$('#menu-jp1, #menu-en1').on('mouseover', function() {
			suggestMenu('menu1');
		});

		$('#menu-jp2, #menu-en2').on('mouseover', function() {
			suggestMenu('menu2');
		});

		$('#menu-jp3, #menu-en3').on('mouseover', function() {
			suggestMenu('menu3');
		});

		$('#menu-jp4, #menu-en4').on('mouseover', function() {
			suggestMenu('menu4');
		});

		$('#menu-jp5, #menu-en5').on('mouseover', function() {
			suggestMenu('menu5');
		});




	/* Suggest ここまで
	------------------------------------------------------------------------------*/




	/* LanguageChange
	------------------------------------------------------------------------------*/




		// ブラウザの言語設定から言語判定をとり、そこから日本語表示か英語表示か切り替える //
		function browserLanguage() {

			try {
				return (navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0,2) == 'ja' ? 'ja' : 'en';
			}
			catch(e) {
				return undefined;
			}

		}
		var settinglang = browserLanguage();


		// グローバルナビから言語判定をとり、そこから日本語表示か英語表示か切り替える -for PC- //
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


		// グローバルナビから言語判定をとり、そこから日本語表示か英語表示か切り替える -for SP- //
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


		// デフォルトの表示 - lang_ja:和文 / lang_en:英文- //
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


		// 切り替えた時の表示  -for SP- //
		$('#jaBtn').on('click', function() {
			showLanguagePC('ja');
		});

		$('#enBtn').on('click', function() {
			showLanguageSP('en');
		});




	/* LanguageChange ここまで
	------------------------------------------------------------------------------*/




	/* SNSAPI
	------------------------------------------------------------------------------*/




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




	/* SNSAPI ここまで
	------------------------------------------------------------------------------*/




	/* Device Adjust
	------------------------------------------------------------------------------*/




		// SP版とPC版でレイアウトを変える  //
		/* ブレークポイントの設定 */
		$(window).setBreakpoints({

			distinct: true,
			breakpoints: [ 1, 945 ]

		});


		/* ブレークポイント945の時 */
		$(window).on('enterBreakpoint945', function() {


			/* PC用画像ソースフォルダに切り替える */
			$('.img-response').each(function() {
				$(this).attr('src', $(this).attr('src').replace('sp', 'pc'));
			});

			$('#form-layout-jp').each(function() {
				$(this).attr('class', $(this).attr('class').replace('sp', 'pc'));
				$('.colon').show();
				$('dl.form-pc dd').css({
					'width': 400 + 'px'
				});
			});

			$('#suggest').each(function() {
				$(this).attr('class', $(this).attr('class').replace('sp', 'pc'));
			});


		});


		/* ブレークポイント1の時 */
		$(window).on('enterBreakpoint1', function() {


			/* SP用画像ソースフォルダに切り替える */
			$('.img-response').each(function() {
				$(this).attr('src', $(this).attr('src').replace('pc', 'sp'));
			});

			$('#form-layout-jp').each(function() {
				$(this).attr('class', $(this).attr('class').replace('pc', 'sp'));
				$('.colon').hide();
				$('dl.form-sp dd').css({
					'width': 400 / 400 * 100 + '%'
				});

			});

			$('#suggest').each(function() {
				$(this).attr('class', $(this).attr('class').replace('pc', 'sp'));
			});


		});


		// Android対策 -横向きで微妙にずれる- //
		var portraitWidth,landscapeWidth;

		$(window).on('load resize', function() {


			/* iPhone, iPadなど */
			if ((user_agent.indexOf('iPhone') > 0 && user_agent.indexOf('iPad') == -1) || user_agent.indexOf('iPod') > 0) {

				$('html').css({
					'zoom': 1
				});

			}


			/* Android */
			else if (user_agent.indexOf('Android') > 0) {


				/* 傾き（ポートレイトかランドスケープか）を判定 */
				if ('object' === typeof window.onorientationchange) {


					window.addEventListener('orientationchange', function() {

						/* ランドスケープ */
						if (window.innerHeight > window.innerWidth) {

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




});