# JavaScript Jquery PlugIns Document

### --------------------------

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

--------------------------
###

$ ->

	### UI共通プラグイン
	--------------------------
	###

	###グローバル変数
	--------------------
	###

	window_width = $(window).width()
	window_height = $(window).height()
	window_outer_width = $(window).outerWidth()
	window_outer_height = $(window).outerHeight()
	window_inner_width = $(window).innerWidth()
	window_inner_height = $(window).innerHeight()
	userAgent = navigator.userAgent
	# ウィンドウ自体の幅と高さを計測し、使っているブラウザのユーザーエージェントを判定

	###jsonテスト
	--------------------
	###

	#$(function() {
	#	$.ajax({
	#		dataType: 'json'
	#	});
	#	$.getJSON('ajax/test.json', function( data ) {
	#		var items = [];
	#		$.each( data, function( key, val ) {
	#			items.push('<li id='' + key + ''>' + val + '</li>');
	#		});
	#		$('<ul/>',{
	#			'class': 'my-new-list',
	#			html: items.join('')
	#		}).appendTo('#wrapper');
	#	});
	#});

	###dt adjust
	--------------------
	###

	adjust = ->
		dt_column_width = $('dl#column dt').outerWidth()
		# dtの幅 //
		dt_news_width = $('dl.news dt').outerWidth()
		# dtの幅 //
		$('dl#column dd').css 'margin-left', dt_column_width + 20 + 'px'
		# 可変部分の高さを適用 //
		$('dl.news dd').css 'margin-left', dt_news_width + 'px'
		# 可変部分の高さを適用 //
		return

	###Window Close
	--------------------
	###

	quitBox = (cmd) ->
		if cmd == 'quit'
			open(location, '_self').close()
		false

	###MouseOver
	--------------------
	###

	mouseOver = (i) ->
		imgArr = i
		switch imgArr
			when 'on'
				$('img.mouseover').each ->
					$(this).attr 'src', $(this).attr('src').replace('_off', '_on')
					return
			when 'off'
				$('img.mouseover').each ->
					$(this).attr 'src', $(this).attr('src').replace('_on', '_off')
					return
			else
				$('img.mouseover').each ->
					$(this).attr 'src', $(this).attr('src').replace('_off', '_on')
					return
				break
		return

	### 言語切り替え
	--------------------------
	###

	# Language Change //
	# 1.ブラウザの言語設定から言語判定をとり、そこから日本語表示か英語表示か切り替える //

	browserLanguage = ->
		try
			if eturn(navigator.browserLanguage or navigator.language or navigator.userLanguage).substr(0, 2) == 'ja' then 'ja' else 'en'
		catch e
			return undefined
		return

	# 2.グローバルナビから言語判定をとり、そこから日本語表示か英語表示か切り替える -forSP-//

	showLanguageSP = (i) ->
		langArr = i
		switch langArr
			when 'ja'
				$.cookie 'lang_ja', langArr,
					expires: 365
					path: '/'
				$.removeCookie 'lang_en', path: '/'
				$('#ja').fadeIn().show()
				$('#en').fadeOut().hide()
				$('.language-list li.btn-ja').removeClass('btn-ja').addClass 'btn-ja-active'
				$('.language-list li.btn-en-active').removeClass('btn-en-active').addClass 'btn-en'
			when 'en'
				$.cookie 'lang_en', langArr,
					expires: 365
					path: '/'
				$.removeCookie 'lang_ja', path: '/'
				$('#en').fadeIn().show()
				$('#ja').fadeOut().hide()
				$('.language-list li.btn-en').removeClass('btn-en').addClass 'btn-en-active'
				$('.language-list li.btn-ja-active').removeClass('btn-ja-active').addClass 'btn-ja'
			else
				$.cookie 'lang_ja', langArr,
					expires: 365
					path: '/'
				$.removeCookie 'lang_en', path: '/'
				$('#ja').fadeIn().show()
				$('#en').fadeOut().hide()
				$('.language-list li.btn-ja').removeClass('btn-ja').addClass 'btn-ja-active'
				$('.language-list li.btn-en-active').removeClass('btn-en-active').addClass 'btn-en'
				break
		return

	# 2.グローバルナビから言語判定をとり、そこから日本語表示か英語表示か切り替える -forPC- //

	showLanguagePC = (i) ->
		langArr = i
		switch langArr
			when 'ja'
				$.cookie 'lang', langArr,
					expires: 365
					path: '/'
				$.removeCookie 'lang_en', path: '/'
				$('#ja').fadeIn().show()
				$('#en').fadeOut().hide()
			when 'en'
				$.cookie 'lang', langArr,
					expires: 365
					path: '/'
				$.removeCookie 'lang_ja', path: '/'
				$('#en').fadeIn().show()
				$('#ja').fadeOut().hide()
			else
				$.cookie 'lang', langArr,
					expires: 365
					path: '/'
				$.removeCookie 'lang_en', path: '/'
				$('#ja').fadeIn().show()
				$('#en').fadeOut().hide()
				break
		return

	### SNS API
	--------------------------
	###

	# Twitter-Facebook //

	popupLink = (type, _self) ->
		href = undefined
		windowname = undefined
		if type == 'twitter'
			href = 'http://twitter.com/share?original_referer=http://wwww.test.jp/&textテキストが入ります。&url=http://wwww.test.jp/'
			windowname = 'twitterwindow'
		else if type == 'facebook'
			href = 'http://www.facebook.com/share.php?u=http://www.test.jp/'
			windowname = 'facebookwindow'
		window.open href, windowname, 'width=550, height=450,personalbar=0,toolbar=0,scrollbars=1,resizable=1'
		false

	$(window).on 'load resize', ->
		`var window_width`
		`var window_height`
		window_width = $(window).width()
		window_height = $(window).height()
		$('#test01').html 'ウィンドウ幅' + '&nbsp;:&nbsp;' + window_width
		$('#test02').html 'ウィンドウ高さ' + '&nbsp;:&nbsp;' + window_height
		$('#test03').html 'ユーザーエージェント' + '&nbsp;:&nbsp;' + '<br />' + userAgent
		return

	###test IE判定実装
	--------------------
	###

	# IEであるか否かの判定
	# var isIE = false; // IEか否か
	# var version = null; // IEのバージョン
	# if(userAgent.match(/MSIE/) || userAgent.match(/Trident/) ) {
	#		isIE = true;
	#		version = userAgent.match(/(MSIE\s|rv:)([\d\.]+)/)[2];
	#		location.href='http://www.yahoo.co.jp/'
	# }

	###test btn-hover実装
	--------------------
	###

	if userAgent.indexOf('iPhone') > 0 or userAgent.indexOf('iPad') > 0 or userAgent.indexOf('iPod') > 0 or userAgent.indexOf('Android') > 0 or userAgent.indexOf('BlackBerry') > 0 or userAgent.indexOf('windows Phone') > 0 or userAgent.indexOf('NOKIA') > 0 or /Mobile.*Firefox/.test(userAgent)
	else
		$.ajax(
			url: 'include/btn.html'
			cache: true
			async: true
			processData: false).done (html) ->
			html = html.replace(/\{\$root\}/g, relativeFirstDir)
			$('#hover').append html
			return

	###Header共通化
	--------------------
	###

	rootDir = location.href.split('/')
	currentDir = rootDir[rootDir.length - 2]
	relativeFirstDir = 'include/'
	relativeSecondDir = '../include/'
	$('#test04').html '現在のディレクトリ' + '&nbsp;:&nbsp;' + currentDir
	if $('header#navi-1st').length
		$.ajax(
			url: relativeFirstDir + 'header.html'
			cache: true
			async: true
			processData: false).done (html) ->
			html = html.replace(/\{\$root\}/g, relativeFirstDir)
			$('header#navi-1st').append html
			return
	else
		$.ajax(
			url: relativeSecondDir + 'header.html'
			cache: true
			async: true
			processData: false).done (html) ->
			html = html.replace(/\{\$root\}/g, relativeSecondDir)
			$('header#navi-2nd').append html
			return
	adjust()
	$(window).on 'load resize', ->
		adjust()
		return

	###PageScroll
	--------------------
	###

	$('a[href*=#top]').on 'click', ->
		if location.pathname.replace(/^\//, '') == @pathname.replace(/^\//, '') and location.hostname == @hostname
			target = $(@hash)
			target = target.length and target
			if target.length
				sclpos = 10
				scldurat = 500
				targetOffset = target.offset().top - sclpos
				$('html,body').animate { scrollTop: targetOffset },
					duration: scldurat
					easing: 'easeOutExpo'
			return false
		return

	###Slider
	--------------------
	###

	if userAgent.indexOf('iPhone') > 0 or userAgent.indexOf('iPad') > 0 or userAgent.indexOf('iPod') > 0 or userAgent.indexOf('Android') > 0 or userAgent.indexOf('BlackBerry') > 0 or userAgent.indexOf('windows Phone') > 0 or userAgent.indexOf('NOKIA') > 0 or /Mobile.*Firefox/.test(userAgent) or $('#carousel-example-generic').children().hasClass('item')
		# Slider-Config //
		$('.carousel').carousel interval: 6000
		# Slider-Swipe -forSP-//
		$ ->
			carousel = $('.carousel')
			hammer = new Hammer(carousel[0])
			#左にスワイプしたら次の画像に切り替え
			hammer.on 'swipeleft', ->
				carousel.carousel 'next'
				return
			#右にスワイプしたら前の画像に切り替え
			hammer.on 'swiperight', ->
				carousel.carousel 'prev'
				return
			return
	else
		# Slider-Config //
		$('.carousel').carousel interval: 6000

	###Tabs
	--------------------
	###

	$('#tabs').tabs
		collapsible: false
		show:
			effect: 'fadeIn'
			duration: 800
		fx:
			height: 'toggle'
			opacity: 'toggle'
			duration: 300
	if userAgent.indexOf('iPhone') > 0 or userAgent.indexOf('iPad') > 0 or userAgent.indexOf('iPod') > 0 or userAgent.indexOf('Android') > 0 or userAgent.indexOf('BlackBerry') > 0 or userAgent.indexOf('windows Phone') > 0 or userAgent.indexOf('NOKIA') > 0 or /Mobile.*Firefox/.test(userAgent)
	else
		$('img.mouseover').mouseover ->
			mouseOver 'on'
			return
		$('img.mouseover').mouseout ->
			mouseOver 'off'
			return

	###Target-blank
		 for IE8
	--------------------
	###

	$('.blank').on 'click', ->
		window.open @href, '_blank'
		false

	###Kerning
	--------------------
	###

	###Attention
	※約物含めたリンク箇所でのカーニング指定を行うと挙動がおかしくなる
	　→約物を記号化、前後に半角スペースを入れる事で対応
		例）<a href="javascript:void(0)" class="policy"> &#12300;個人情報の取り扱いについて&#12301; </a>
	###

	tag = $('p, h1, h2, h3, h4, h5, h6, span, dt, dd, th, td, ul.list li, ol.list li, ul.form-accept li, a')
	$(tag).FLAutoKerning()

	###Centering
	--------------------
	###

	$(window).on('load resize', ->
		# min_height = 400;
		$box = $('.bgLogin.box.center')
		padding = parseInt($box.css('padding-top')) + parseInt($box.css('padding-bottom'))
		margin = 50
		min_height = $box.height() + padding + $('footer').height() + margin
		if window_inner_height < min_height
			window_inner_height = min_height
			$('.centerParentWrapper').css 'position', 'relative'
		else
			$('.centerParentWrapper').css 'position', 'fixed'
		$('.centerParentWrapper').css 'height': window_inner_height + 'px'
		$('.centerParentWrapper').css 'height': window_inner_height - 30 + 'px'
		if window_inner_width < 768
			$('.bgProduct').css 'width': window_inner_width - 30 + 'px'
		else
			$('.bgProduct').css 'width': 750 + 'px'
		return
	).trigger 'resize'

	### ライトボックス
	--------------------------
	###

	# 1.lightboxのインクルードファイルを読み込む  //
	if $('header#navi-1st').length
		$.ajax(
			url: relativeFirstDir + 'lightbox.html'
			cache: true
			async: true
			processData: false).done (html) ->
			html = html.replace(/\{\$root\}/g, relativeFirstDir)
			$('.lightbox').append html
			return
	else
		$.ajax(
			url: relativeSecondDir + 'lightbox.html'
			cache: true
			async: true
			processData: false).done (html) ->
			html = html.replace(/\{\$root\}/g, relativeSecondDir)
			$('.lightbox').append html
			return
	# 2.lightbox本体を読み込む  //
	# イメージボックスを出す //
	$('a[rel=imagebox]').on 'click', (e) ->
		`var window_width`
		`var window_height`
		e.preventDefault()
		if $('#lb-overlay').is(':hidden')
			# ライトボックスのオーバーレイを出す //
			$('#lb-overlay, #lb-container').fadeIn()
			# todo: ライトボックスコンテンツを読み込ませる方法と切り分け方 //
			href = $(this).attr('href')
			$('.bg-lightbox').html('<img src=' + href + '>').fadeIn()
			# ライトボックスの背景をドキュメントの高さに合わせる //
			window_width = $(window).width()
			window_height = $(window).height()
			document_height = $(document).height()
			lightbox_width = $('.bg-lightbox').width()
			lightbox_height = $('.bg-lightbox').height()
			if userAgent.indexOf('iPhone') > 0 or userAgent.indexOf('iPad') > 0 or userAgent.indexOf('iPod') > 0 or userAgent.indexOf('Android') > 0 or userAgent.indexOf('BlackBerry') > 0 or userAgent.indexOf('windows Phone') > 0 or userAgent.indexOf('NOKIA') > 0 or /Mobile.*Firefox/.test(userAgent)
				$('#lb-overlay').css
					'width': window_width
					'height': window_height + 100 + 'px'
				$('.lb-wrapper').css
					'zoom': 0.6
					'font-size': 1 + 'em'
			else
				$('#lb-overlay').css
					'width': window_width
					'height': window_height
			# 傾けてもライトボックスの背景をドキュメントの高さに合わせる //
			$(window).on('load resize', ->
				`var window_width`
				`var window_height`
				`var document_height`
				`var lightbox_width`
				`var lightbox_height`
				window_width = $(window).width()
				window_height = $(window).height()
				document_height = $(document).height()
				lightbox_width = $('.bg-lightbox').width()
				lightbox_height = $('.bg-lightbox').height()
				if userAgent.indexOf('iPhone') > 0 or userAgent.indexOf('iPad') > 0 or userAgent.indexOf('iPod') > 0 or userAgent.indexOf('Android') > 0 or userAgent.indexOf('BlackBerry') > 0 or userAgent.indexOf('windows Phone') > 0 or userAgent.indexOf('NOKIA') > 0 or /Mobile.*Firefox/.test(userAgent)
					$('#lb-overlay').css
						'width': window_width
						'height': window_height + 100 + 'px'
					$('.lb-wrapper').css
						'zoom': 0.6
						'font-size': 1 + 'em'
				else
					$('#lb-overlay').css
						'width': window_width
						'height': window_height
				return
			).trigger 'resize'
		else
			$('.bg-lightbox').html('').hide()
			# ライトボックスのオーバーレイ、背景を引っ込める //
			$('#lb-overlay, #lb-container').fadeOut()
		return
	# テキストボックスを出す //
	$('a[rel=textbox]').on 'click', (e) ->
		e.preventDefault()
		if $('#lb-overlay').is(':hidden')
			# ライトボックスのオーバーレイを出す //
			$('#lb-overlay, #lb-container').fadeIn()
			# todo: ライトボックスコンテンツを読み込ませる方法と切り分け方 //
			title = $(this).attr('title')
			$('.bg-lightbox').html('<p>' + title + '</p>').fadeIn()
			# ライトボックスの背景をドキュメントの高さに合わせる //
			document_height = $(document).height()
			lightbox_width = $('.bg-lightbox').width()
			lightbox_height = $('.bg-lightbox').height()
			if userAgent.indexOf('iPhone') > 0 or userAgent.indexOf('iPad') > 0 or userAgent.indexOf('iPod') > 0 or userAgent.indexOf('Android') > 0 or userAgent.indexOf('BlackBerry') > 0 or userAgent.indexOf('windows Phone') > 0 or userAgent.indexOf('NOKIA') > 0 or /Mobile.*Firefox/.test(userAgent)
				$('#lb-overlay').css
					'width': window_width
					'height': window_height + 100 + 'px'
				$('.lb-wrapper').css
					'zoom': 0.6
					'font-size': 1 + 'em'
			else
				$('#lb-overlay').css
					'width': window_width
					'height': window_height
			# 傾けてもライトボックスの背景をドキュメントの高さに合わせる //
			$(window).on('load resize', ->
				`var window_width`
				`var window_height`
				`var document_height`
				`var lightbox_width`
				`var lightbox_height`
				window_width = $(window).width()
				window_height = $(window).height()
				document_height = $(document).height()
				lightbox_width = $('.bg-lightbox').width()
				lightbox_height = $('.bg-lightbox').height()
				if userAgent.indexOf('iPhone') > 0 or userAgent.indexOf('iPad') > 0 or userAgent.indexOf('iPod') > 0 or userAgent.indexOf('Android') > 0 or userAgent.indexOf('BlackBerry') > 0 or userAgent.indexOf('windows Phone') > 0 or userAgent.indexOf('NOKIA') > 0 or /Mobile.*Firefox/.test(userAgent)
					$('#lb-overlay').css
						'width': window_width
						'height': window_height + 100 + 'px'
					$('.lb-wrapper').css
						'zoom': 0.6
						'font-size': 1 + 'em'
				else
					$('#lb-overlay').css
						'width': window_width
						'height': window_height
				return
			).trigger 'resize'
		else
			$('.bg-lightbox').html('').hide()
			# ライトボックスのオーバーレイ、背景を引っ込める //
			$('#lb-overlay, #lb-container').hide()
		return
	# ライトボックスの背景でクローズする //
	$('#lb-overlay').on 'click', (e) ->
		e.preventDefault()
		$('.bg-lightbox').html('').hide()
		$('#lb-overlay').hide()
		$('#lb-overlay').css
			'width': ''
			'height': ''
		return

	### バリデート
	--------------------------
	###

	# Submitを押したときの判定 Jp:日本語  //
	$('input#btn-confirm-ja:submit').on 'click', ->
		`var userAgent`
		`var offset`
		`var offset`
		`var offset`
		`var offset`
		`var offset`
		#全角ひらがな･カタカナのみ
		jQuery.validator.addMethod 'kana', ((value, element) ->
			@optional(element) or /^([ァ-ヶーぁ-ん]+)$/.test(value)
		), '全角ひらがな･カタカナを入力してください'
		#全角ひらがなのみ
		jQuery.validator.addMethod 'hiragana', ((value, element) ->
			@optional(element) or /^([ぁ-ん]+)$/.test(value)
		), '全角ひらがなを入力してください'
		#半角アルファベット（大文字･小文字）のみ
		jQuery.validator.addMethod 'alphabet', ((value, element) ->
			@optional(element) or /^([a-zA-Z0-9\s\@_\.\-]+)$/.test(value)
		), '半角英字を入力してください'
		$('#inquiryFormJp').validate
			ignore: '.ignore'
			rules:
				inquiryListJp: required: true
				inquiryCompanyNameJp: required: true
				inquiryNameJaJp: required: true
				inquiryNameEnJp:
					required: true
					alphabet: true
				inquiryMailJp:
					required: true
					alphabet: true
					email: true
				inquiryTextJp: required: true
			messages:
				inquiryListJp: required: '※お問い合わせ内容をお選び下さい。'
				inquiryCompanyNameJp: required: '※必須項目です。'
				inquiryNameJaJp: required: '※必須項目です。'
				inquiryNameEnJp:
					required: '※必須項目です。'
					alphabet: '※半角英数で入力して下さい。'
				inquiryMailJp:
					required: '※必須項目です'
					alphabet: '※半角英数で入力して下さい。'
					email: '※メールアドレスを入力してください。'
				inquiryTextJp: required: '※必須項目です。'
		userAgent = navigator.userAgent
		scldurat = 500
		# エラーが出た箇所へ飛ぶ -forSP- //
		if userAgent.indexOf('iPhone') > 0 or userAgent.indexOf('iPad') > 0 or userAgent.indexOf('iPod') > 0 or userAgent.indexOf('Android') > 0 or userAgent.indexOf('BlackBerry') > 0 or userAgent.indexOf('windows Phone') > 0 or userAgent.indexOf('NOKIA') > 0 or /Mobile.*Firefox/.test(userAgent)
			if $('input#inquiryListJp').val() == ''
				inquiryListJp = $('input#inquiryListJp')
				offset = inquiryListJp.offset()
				sclpos = 20
				targetOffset = inquiryListJp.offset().top + sclpos
				$('html,body').animate { scrollTop: offset.top - 20 },
					duration: scldurat
					easing: 'easeOutExpo'
			else if $('input#inquiryCompanyNameJp').val() == ''
				inquiryCompanyNameJp = $('input#inquiryCompanyNameJp')
				offset = inquiryCompanyNameJp.offset()
				$('html,body').animate { scrollTop: offset.top - 20 },
					duration: scldurat
					easing: 'easeOutExpo'
			else if $('input#inquiryNameJaJp').val() == ''
				inquiryNameJaJp = $('input#inquiryNameJaJp')
				offset = inquiryNameJaJp.offset()
				$('html,body').animate { scrollTop: offset.top - 20 },
					duration: scldurat
					easing: 'easeOutExpo'
			else if $('input#inquiryNameEnJp').val() == ''
				inquiryNameEnJp = $('input#inquiryNameEnJp')
				offset = inquiryNameEnJp.offset()
				$('html,body').animate { scrollTop: offset.top - 20 },
					duration: scldurat
					easing: 'easeOutExpo'
			else if $('input#inquiryMailJp').val() == ''
				inquiryMailJp = $('input#inquiryMailJp')
				offset = inquiryMailJp.offset()
				$('html,body').animate { scrollTop: offset.top - 20 },
					duration: scldurat
					easing: 'easeOutExpo'
			else if $('textarea#inquiryTextJp').val() == ''
				inquiryTextJp = $('input#inquiryTextJp')
				offset = inquiryTextJp.offset()
				$('html,body').animate { scrollTop: offset.top - 20 },
					duration: scldurat
					easing: 'easeOutExpo'
		return
	# Submitを押したときの判定 En:英語  //
	$('input#btn-confirm-en:submit').on 'click', ->
		`var offset`
		`var offset`
		`var offset`
		`var offset`
		$('#inquiryFormEn').validate
			ignore: '.ignore'
			rules:
				inquiryListEn: required: true
				inquiryCompanyNameEn: required: true
				inquiryNameEnEn:
					required: true
					alphabet: true
				inquiryMailEn:
					required: true
					email: true
				inquiryTextEn: required: true
			messages:
				inquiryListEn: required: '*Please select.'
				inquiryCompanyNameEn: required: '*Please enter xxx.'
				inquiryNameEnEn: required: '*Please enter xxx.'
				inquiryMailEn:
					required: '*Please enter xxx.'
					email: '*Your e-mail address is incorrect.'
				inquiryTextEn: required: '*Please enter xxx.'
		# エラーが出た箇所へ飛ぶ -forSP- //
		scldurat = 500
		if userAgent.indexOf('iPhone') > 0 or userAgent.indexOf('iPad') > 0 or userAgent.indexOf('iPod') > 0 or userAgent.indexOf('Android') > 0 or userAgent.indexOf('BlackBerry') > 0 or userAgent.indexOf('windows Phone') > 0 or userAgent.indexOf('NOKIA') > 0 or /Mobile.*Firefox/.test(userAgent)
			if $('input#inquiryListEn').val() == ''
				inquiryListEn = $('input#inquiryListEn')
				offset = inquiryListEn.offset()
				sclpos = 20
				targetOffset = inquiryListEn.offset().top + sclpos
				$('html,body').animate { scrollTop: offset.top - 20 },
					duration: scldurat
					easing: 'easeOutExpo'
			else if $('input#inquiryCompanyNameEn').val() == ''
				inquiryCompanyNameEn = $('input#inquiryCompanyNameEn')
				offset = inquiryCompanyNameEn.offset()
				$('html,body').animate { scrollTop: offset.top - 20 },
					duration: scldurat
					easing: 'easeOutExpo'
			else if $('input#inquiryNameEn').val() == ''
				inquiryNameEn = $('input#inquiryNameEn')
				offset = inquiryNameEn.offset()
				$('html,body').animate { scrollTop: offset.top - 20 },
					duration: scldurat
					easing: 'easeOutExpo'
			else if $('input#inquiryMailEn').val() == ''
				inquiryMailEn = $('input#inquiryMailEn')
				offset = inquiryMailEn.offset()
				$('html,body').animate { scrollTop: offset.top - 20 },
					duration: scldurat
					easing: 'easeOutExpo'
			else if $('textarea#inquiryTextEn').val() == ''
				inquiryTextEn = $('input#inquiryTextEn')
				offset = inquiryTextEn.offset()
				$('html,body').animate { scrollTop: offset.top - 20 },
					duration: scldurat
					easing: 'easeOutExpo'
		return

	### メールフォーム
	--------------------------
	###

	# Resetを押したときの判定 //
	$('input#btn-reset-ja,input#btn-reset-en').on 'click', ->
		# バリデート注意文言を消す -日本語- //
		$('label.error').html('').hide()
		# サジェスト部分の注意文言及び[input type='hidden']内の値を消す -共通- //
		$('p#inquiryListDisplayJp,p#inquiryListDisplayEn').html ''
		$('input#inquiryListJp,input#inquiryListEn').val ''
		# [input type='text'][textarea]内の値を消す -共通- //
		$('input:text,input:checked,textarea').val ''
		# 同意するボタン内の値を消す -共通- //
		$('#accept-ja,#accept-en').attr 'checked', false
		# 同意ボタンにチェックが入っているか否かでのリセット、確認ボタンの判定 //
		if $('#accept-ja:checked,#accept-en:checked').length == 0
			$('#btn-reset-ja').attr('id', 'btn-reset-off-ja').attr 'disabled', true
			$('#btn-reset-en').attr('id', 'btn-reset-off-en').attr 'disabled', true
			$('#btn-confirm-ja').attr('id', 'btn-confirm-off-ja').attr 'disabled', true
			$('#btn-confirm-en').attr('id', 'btn-confirm-off-en').attr 'disabled', true
		# リセットボタン押したらページトップへ飛ぶ -forSP- //
		scldurat = 500
		if userAgent.indexOf('iPhone') > 0 or userAgent.indexOf('iPad') > 0 or userAgent.indexOf('iPod') > 0 or userAgent.indexOf('Android') > 0 or userAgent.indexOf('BlackBerry') > 0 or userAgent.indexOf('windows Phone') > 0 or userAgent.indexOf('NOKIA') > 0 or /Mobile.*Firefox/.test(userAgent)
			$('html,body').animate { scrollTop: 0 }, 'fast'
		return
	# 同意ボタンを押したときのリセット、確認ボタンの判定 //

	### default ###

	$('#btn-reset-ja').attr('id', 'btn-reset-off-ja').attr 'disabled', true
	$('#btn-reset-en').attr('id', 'btn-reset-off-en').attr 'disabled', true
	$('#btn-confirm-ja').attr('id', 'btn-confirm-off-ja').attr 'disabled', true
	$('#btn-confirm-en').attr('id', 'btn-confirm-off-en').attr 'disabled', true

	### accept ###

	$('#accept-ja,#accept-en').click(->
		if $('#accept-ja:checked,#accept-en:checked').length == 1
			$('#btn-reset-off-ja').attr('id', 'btn-reset-ja').attr 'disabled', false
			$('#btn-reset-off-en').attr('id', 'btn-reset-en').attr 'disabled', false
			$('#btn-confirm-off-ja').attr('id', 'btn-confirm-ja').attr 'disabled', false
			$('#btn-confirm-off-en').attr('id', 'btn-confirm-en').attr 'disabled', false
		else
			$('#btn-reset-ja').attr('id', 'btn-reset-off-ja').attr 'disabled', true
			$('#btn-reset-en').attr('id', 'btn-reset-off-en').attr 'disabled', true
			$('#btn-confirm-ja').attr('id', 'btn-confirm-off-ja').attr 'disabled', true
			$('#btn-confirm-en').attr('id', 'btn-confirm-off-en').attr 'disabled', true
		return
	).css 'cursor', 'pointer'
	# 戻るボタンを押したときの判定 //
	$('input#btn-formback-ja,input#btn-formback-en').on 'click', ->
		location.href = 'index.html'
		return
	# SPとPCでとび先を変える //
	$(window).load ->
		# -forSP- //
		if userAgent.indexOf('iPhone') > 0 or userAgent.indexOf('iPad') > 0 or userAgent.indexOf('iPod') > 0 or userAgent.indexOf('Android') > 0 or userAgent.indexOf('BlackBerry') > 0 or userAgent.indexOf('windows Phone') > 0 or userAgent.indexOf('NOKIA') > 0 or /Mobile.*Firefox/.test(userAgent)
			$('.policy').on 'click', ->
				# location.href='../sitepolicy/index.html'
				# window.open('../sitepolicy/index.html', '_blank');
				false
		else
			$('.policy').on 'click', ->
				# location.href='../../#/sitepolicy/'
				# window.open('../../#/sitepolicy/', '_blank');
				false
		return
	# windowをリサイズした時にコロンを取る //
	$(window).on 'load resize', ->
		`var window_width`
		# -forSP- //
		if userAgent.indexOf('iPhone') > 0 or userAgent.indexOf('iPad') > 0 or userAgent.indexOf('iPod') > 0 or userAgent.indexOf('Android') > 0 or userAgent.indexOf('BlackBerry') > 0 or userAgent.indexOf('windows Phone') > 0 or userAgent.indexOf('NOKIA') > 0 or /Mobile.*Firefox/.test(userAgent)
			# なし  //
		else
			# ウィンドウサイズを精査  //
			window_width = $(window).width()
			#$('#test').html(window_width);　デバッグ用
			# ウィンドウサイズが960px以下になったら  //
			if window_width < 960
				$('.colon').hide()
				$('dl.form-pc dd, dl.form-sp dd').css 'width', 400 / 400 * 100 + '%'
			else
				$('.colon').show()
				$('dl.form-pc dd').css 'width', 400 + 'px'
		return

	### サジェスト
	--------------------------
	###

	# Suggest En:英語、Jp:日本語  //
	# サジェスト外がクリッカブルになる為のサジェストクリアゾーン -初期設定: hidden- //
	$('.suggestClear').hide()
	$(window).on 'load resize', ->
		# サジェストを出す -forSP- //
		if userAgent.indexOf('iPhone') > 0 or userAgent.indexOf('iPad') > 0 or userAgent.indexOf('iPod') > 0 or userAgent.indexOf('Android') > 0 or userAgent.indexOf('BlackBerry') > 0 or userAgent.indexOf('windows Phone') > 0 or userAgent.indexOf('NOKIA') > 0 or /Mobile.*Firefox/.test(userAgent)
			$('#inquiryListDisplayJp,#inquiryListDisplayEn').on 'click': ->
				`var window_width`
				`var window_height`
				$('#suggestJp,#suggestEn').fadeIn()
				# サジェストクリアゾーンを出す //
				$('.suggestClear').show()
				# サジェストクリアゾーンが全面に出るように設定 //
				window_width = $(window).width()
				window_height = $(window).height()
				$('.suggestClear').css
					'width': window_width
					'height': window_height
				return
			$('.suggestClear').on 'click': ->
				$('#suggestJp,#suggestEn').fadeOut()
				$('.suggestClear').hide()
				return
		else
			# マウスカーソルがセレクターの上に乗ったらサジェストを出す//
			$('.suggest-pc').on
				'mouseenter': ->
					$('#suggestJp,#suggestEn').fadeIn()
					return
				'mouseleave': ->
					$('#suggestJp,#suggestEn').fadeOut()
					return
		# セレクター内のテキストをクリックした時の判定  //
		$('#suggestJp,#suggestEn').on 'click', ->
			$('#suggestJp,#suggestEn').fadeOut()
			$('.suggestClear').hide()
			return
		return
	# サジェスト内のお問い合わせ事項テキストを値として読み込む  //
	suggestBusinessJp = $('#menuJp0').text()
	suggestRecruitJp = $('#menuJp1').text()
	suggestCreativeJp = $('#menuJp2').text()
	suggestPersonalJp = $('#menuJp3').text()
	suggestOtherJp = $('#menuJp4').text()
	suggestBusinessEn = $('#menuEn0').text()
	suggestRecruitEn = $('#menuEn1').text()
	suggestCreativeEn = $('#menuEn2').text()
	suggestPersonalEn = $('#menuEn3').text()
	suggestOtherEn = $('#menuEn4').text()
	# テキストの値をinput#inquiryListへ与える  //
	$('#menuJp0,#menuEn0').mouseover ->
		$('#inquiryListJp').val suggestBusinessJp
		$('#inquiryListDisplayJp').html suggestBusinessJp
		$('#inquiryListEn').val suggestBusinessEn
		$('#inquiryListDisplayEn').html suggestBusinessEn
		return
	$('#menuJp1,#menuEn1').mouseover ->
		$('#inquiryListJp').val suggestRecruitJp
		$('#inquiryListDisplayJp').html suggestRecruitJp
		$('#inquiryListEn').val suggestRecruitEn
		$('#inquiryListDisplayEn').html suggestRecruitEn
		return
	$('#menuJp2,#menuEn2').mouseover ->
		$('#inquiryListJp').val suggestCreativeJp
		$('#inquiryListDisplayJp').html suggestCreativeJp
		$('#inquiryListEn').val suggestCreativeEn
		$('#inquiryListDisplayEn').html suggestCreativeEn
		return
	$('#menuJp3,#menuEn3').mouseover ->
		$('#inquiryListJp').val suggestPersonalJp
		$('#inquiryListDisplayJp').html suggestPersonalJp
		$('#inquiryListEn').val suggestPersonalEn
		$('#inquiryListDisplayEn').html suggestPersonalEn
		return
	$('#menuJp4,#menuEn4').mouseover ->
		$('#inquiryListJp').val suggestOtherJp
		$('#inquiryListDisplayJp').html suggestOtherJp
		$('#inquiryListEn').val suggestOtherEn
		$('#inquiryListDisplayEn').html suggestOtherEn
		return
	settinglang = browserLanguage()
	# 3.デフォルトの表示 -lang:PC版、lang_ja / lang_en:SP版- //
	$ ->
		lang_ja = $.cookie('lang_ja')
		lang_en = $.cookie('lang_en')
		lang = $.cookie('lang')
		if lang_ja
			showLanguageSP 'ja'
		else if lang_en
			showLanguageSP 'en'
		else if lang == 'ja'
			showLanguagePC 'ja'
		else if lang == 'en'
			showLanguagePC 'en'
		else
			showLanguageSP 'ja'
		return
	# 4.切り替えた時の表示 -SP版- //
	$('#jaBtn').on 'click', ->
		showLanguagePC 'ja'
		return
	$('#enBtn').on 'click', ->
		showLanguageSP 'en'
		return

	### 特定端末対応
	--------------------------
	###

	# 1.SP版とPC版でレイアウトを変える  //
	# ブレークポイントの設定 //
	$(window).setBreakpoints
		distinct: true
		breakpoints: [
			1
			960
		]
	# ブレークポイント1124の時 //
	$(window).on 'enterBreakpoint960', ->
		# PC用画像ソースフォルダに切り替える //
		$('.img-response').each ->
			$(this).attr 'src', $(this).attr('src').replace('sp', 'pc')
			return
		$('#form-layoutJp').each ->
			$(this).attr 'class', $(this).attr('class').replace('sp', 'pc')
			return
		return
	# ブレークポイント1の時 //
	$(window).on 'enterBreakpoint1', ->
		# SP用画像ソースフォルダに切り替える //
		$('.img-response').each ->
			$(this).attr 'src', $(this).attr('src').replace('pc', 'sp')
			return
		$('#form-layoutJp').each ->
			$(this).attr 'class', $(this).attr('class').replace('pc', 'sp')
			return
		return
	# 2.Android対策 -横向きで微妙にずれる- //
	portraitWidth = undefined
	landscapeWidth = undefined
	$(window).on('load resize', ->
		# iPhone, iPadなど //
		if userAgent.indexOf('iPhone') > 0 and userAgent.indexOf('iPad') == -1 or userAgent.indexOf('iPod') > 0
			$('html').css 'zoom', 1
		else if userAgent.indexOf('Android') > 0
			# Android時の傾き（ポートレイトかランドスケープか）を判定
			if 'object' == typeof window.onorientationchange
				window.addEventListener 'orientationchange', (->
					if window.innerHeight > window.innerWidth
						# ポートレイト（ランドスケープ）
						$('html').css 'zoom', landscapeWidth / 320
					else
						# ランドスケープ（ポートレイト）
						$('html').css 'zoom', portraitWidth / 320
					return
				), false
		return
	).trigger 'resize'
	return

# ---
# generated by js2coffee 2.2.0