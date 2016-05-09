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



/* UI共通プラグイン
--------------------------*/


// header共通化 -- トップページのみ //
function writeTopHeader(rootDir) {

	$.ajax({
		url: rootDir + "include/headerTop.html", // パスはplugin.jsが読み込まれたHTMLファイルが基準 //
		cache: false, // キャッシュを利用 //
		async: false, // 非同期で読み込む //
		success: function(html){
			html = html.replace(/\{\$root\}/g, rootDir);
			document.write(html);
		}
	});

}


// header共通化 -- 2nd以降 //
function writeHeader(rootDir) {

	$.ajax({
		url: rootDir + "include/headerSecond.html", // パスはplugin.jsが読み込まれたHTMLファイルが基準 //
		cache: false, // キャッシュを利用 //
		async: false, // 非同期で読み込む //
		success: function(html){
			html = html.replace(/\{\$root\}/g, rootDir);
			document.write(html);
		}
	});

}


// vertical horizontal center-wrap //
$(function() {

	function adjust(){
		var h = $(window).height(); // ウィンドウの高さ //
		var h1= $("header").height(); // ヘッダーの高さ //
		var h2= $("footer").height(); // フッターの高さ //

		$(".centerParentWrapper").css("height", h-h1-h2); // 可変部分の高さを適用 //
	}

	adjust();

	$(window).bind("resize load", function(){
		adjust();
	})

});


// Search //
$(function() {

	function adjust(){
		var ww = $(window).width(); // ウィンドウの幅 //
		var dw = $(document).width(); // ドキュメントの幅 //
		var sw= $(".search_area").width(); // 他要素の高さ //

		$(".search_area").css("width", ww - 90 + $(window).scrollLeft()  + "px")
		$(".search").css("width", ww - 190 + $(window).scrollLeft()  + "px")

	}

	adjust();

	$(window).bind("resize load", function(){
		adjust();
	})

});


// PageScroll //
$(function() {

	$('a[href*=#]').click(function() {

		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') &&　location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length && target;

			if (target.length) {
				var sclpos = 10;
				var scldurat = 500;
				var targetOffset = target.offset().top - sclpos;
				$('html,body')
					.animate({scrollTop: targetOffset}, {duration: scldurat, easing: "easeOutExpo"});
				return false;
			}
		}

	});

});


// MenuPanel //
$(function() {

	$(".panel-btn").click(function(){

		if ($(".panel").is(":hidden")) {
			// パネルを出す //
			$(".panel").slideDown("slow");

			// グローバルメニューの画像を切り替える //
			$("#global_menu").removeClass("menu").addClass("menu_active");
		}

		else {
			// パネルを引っ込める //
			$(".panel").slideUp();

			// グローバルメニューの画像を切り替える //
			$("#global_menu").removeClass("menu_active").addClass("menu");
		}

		return false;
	});

});


// Slider //
$(function() {

	$(".flexslider").flexslider({
		animation: "slide"
	});

});


// Tabs //
$(function() {

	$("#tabs").tabs({
		collapsible: true,
		show: { effect: "fadeIn", duration: 800 },
		fx: { height: 'toggle', opacity: 'toggle', duration: 300 }
	});

});


// Window Close, Window Open //
$(function() {

	$("#close").click(function() {
		window.close();
	}).css("cursor","pointer");

});


//  Font-size Adjust //
$(function() {
	//変数にクッキー名を入れる
	var history = $.cookie('fontSize');

	//適用する箇所を指定
	var elm = $('#wrapper');

	//変数が空ならfont_mを、空でなければクッキーに保存しておいたものを適用
	(!history)? elm.addClass('font_m'):elm.addClass(history);

	//クリックしたら実行
	$('li','#font_change').click(function(){

		//クリックした要素のID名を変数にセット
		var setFontSize = this.id;

		//クッキーに変数を保存
		$.cookie('fontSize', setFontSize);

		//一度classを除去して、変数をclassとして追加
		elm.removeClass().addClass(setFontSize);
	});

});


/* ライトボックス
--------------------------*/


// lightbox //
// 1.lightboxのインクルードファイルを読み込む  //
function writeLightboxDocument(rootDir) {

	$.ajax({
		url: rootDir + "include/lightbox.html", // パスはplugin.jsが読み込まれたHTMLファイルが基準 //
		cache: true, // キャッシュを利用 //
		async: false, // 非同期で読み込む //
		success: function(html){
			html = html.replace(/\{\$root\}/g, rootDir);
			document.write(html);
		}
	});

}


// 2.lightbox本体を読み込む  //
$(function() {

	// イメージボックスを出す //
	$('a[rel=imagebox]').click(function(e) {

		e.preventDefault();

			if ($("#lb_overlay").is(":hidden")) {

				// ライトボックスのオーバーレイを出す //
				$("#lb_overlay,.lb_wrapper").fadeIn();

				// todo: ライトボックスコンテンツを読み込ませる方法と切り分け方 //
				$(".bg_lightbox").html("<img src='"+$(this).attr("href")+"' class='mg_left-right_auto block'/>").fadeIn();

				// ライトボックスの背景をドキュメントの高さに合わせる //
				var ww = $(window).width();
				var wh = $(window).height();
				var dh = $(document).height();
				var lw = $(".bg_lightbox").width();
				var lh = $(".bg_lightbox").height();

				$("#lb_overlay").css({
					"width" : ww,
					"height" : dh
				});

				jQuery.fn.center = function () {
					this.css("position","absolute");
					this.css("top", ( wh - lh - 8 ) / 2 + "px");
					this.css("left", ( ww - lw - 8 ) / 2 + "px");
					this.css("display","block");
					return this;
				};
				$(".lb_wrapper").center();

				// 傾けてもライトボックスの背景をドキュメントの高さに合わせる //
				$(window).bind("resize load", function() {

					var ww = $(window).width();
					var wh = $(window).height();
					var dh = $(document).height();
					var lw = $(".bg_lightbox").width();
					var lh = $(".bg_lightbox").height();

					$("#lb_overlay").css({
						"width" : ww,
						"height" : dh
					});

					jQuery.fn.center = function () {
						this.css("position","absolute");
						this.css("top", ( wh - lh - 8 ) / 2 + "px");
						this.css("left", ( ww - lw - 8 ) / 2 + "px");
						this.css("display","block");
						return this;
					};
					$(".lb_wrapper").center();

				}).trigger("resize");

			}

			else {

				$(".bg_lightbox").html("").hide();

				// ライトボックスのオーバーレイ、背景を引っ込める //
				$("#lb_overlay,.lb_wrapper").hide();
			}

	});

	// テキストボックスを出す //
	$('a[rel=textbox]').click(function(e) {

		e.preventDefault();

		if ($("#lb_overlay").is(":hidden")) {

				// ライトボックスのオーバーレイを出す //
				$("#lb_overlay,.lb_wrapper").fadeIn();

				// todo: ライトボックスコンテンツを読み込ませる方法と切り分け方 //
				var title = $(this).attr('title');
				$(".bg_lightbox").html('<p>' + title + '</p>').fadeIn();


				// ライトボックスの背景をドキュメントの高さに合わせる //
				var ww = $(window).width();
				var wh = $(window).height();
				var dh = $(document).height();
				var lw = $(".bg_lightbox").width();
				var lh = $(".bg_lightbox").height();

				$("#lb_overlay").css({
					"width" : ww,
					"height" : dh
				});

				jQuery.fn.center = function () {
					this.css("position","absolute");
					this.css("top", ( wh - lh - 8 ) / 2 + "px");
					this.css("left", ( ww - lw - 8 ) / 2 + "px");
					this.css("max-width", 280 + "px");
					this.css("display","block");
					return this;
				};
				$(".lb_wrapper").center();

				// 傾けてもライトボックスの背景をドキュメントの高さに合わせる //
				$(window).bind("resize load", function() {

					var ww = $(window).width();
					var wh = $(window).height();
					var dh = $(document).height();
					var lw = $(".bg_lightbox").width();
					var lh = $(".bg_lightbox").height();

					$("#lb_overlay").css({
						"width" : ww,
						"height" : dh
					});

					jQuery.fn.center = function () {
						this.css("position","absolute");
						this.css("top", ( wh - lh - 8 ) / 2  + "px");
						this.css("left", ( ww - lw - 8 ) / 2 + "px");
						this.css("max-width", 280 + "px");
						this.css("display","block");
						return this;
					};
					$(".lb_wrapper").center();

				}).trigger("resize");

			}

			else {

				$(".bg_lightbox").html("").hide();

				// ライトボックスのオーバーレイ、背景を引っ込める //
				$("#lb_overlay,.lb_wrapper").hide();
			}


	});

	// ライトボックスの背景でクローズする //
	$("#lb_overlay").click(function(e) {

		e.preventDefault();

		$(".bg_lightbox").html("").hide();

		$("#lb_overlay").hide();
		$("#lb_overlay").css({
			"width" : "",
			"height" : ""
		});

		jQuery.fn.windowReset = function () {
			this.css("position","");
			this.css("top","");
			this.css("left", "");
			this.css("display","");
			return this;
		};
		$(".lb_wrapper").windowReset();

	});


});




/* バリデート
--------------------------*/


// MailValidate //
$(function() {

	// Submitを押したときの判定 Jp:日本語  //
	$('input#btn_confirm_ja:submit').click(function() {

		$("#inauiryFormJp").validate({
			ignore: ".ignore",
			rules: {
				inquiryListJp :{
					required: true,
				},
				/* 20150220 Sitemap Release
				// inquiryCompanyNameJp :{
				// 	required: true,
				// },
				*/
				inquiryNameJaJp :{
					required: true
				},
				inquiryNameEnJp :{
					required: true
				},
				inquiryMailJp :{
					required: true,
					email: true
				},
				inquiryTextJp :{
					required: true
				}
			},
			messages: {
				inquiryListJp :{
					required: "※お問い合わせ内容をお選び下さい。"
				},
				/* 20150220 Sitemap Release
				// inquiryCompanyNameJp :{
				// 	required: "※必須項目です。"
				// },
				*/
				inquiryNameJaJp :{
					required: "※全角で入力して下さい。"
				},
				inquiryNameEnJp :{
					required: "※必須項目です"
				},
				inquiryMailJp :{
					required: "※半角英数で入力して下さい。",
					email: "※半角英数で入力して下さい。"
				},
				inquiryTextJp :{
					required: "※必須項目です。"
				}
			}
		});

	});

	// Submitを押したときの判定 En:英語  //
	$('input#btn_confirm_en:submit').click(function() {

		$("#inauiryFormEn").validate({
			ignore: ".ignore",
			rules: {
				inquiryListEn :{
					required: true,
				},
				/* 20150220 Sitemap Release
				// inquiryCompanyNameEn :{
				// 	required: true,
				// },
				*/
				inquiryNameEnEn :{
					required: true
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
					required: "*Please select."
				},
				/* 20150220 Sitemap Release
				// inquiryCompanyNameEn :{
				// 	required: "*Please enter xxx."
				// },
				*/
				inquiryNameEnEn :{
					required: "*Please enter xxx."
				},
				inquiryMailEn :{
					required: "*Your e-mail address is incorrect.",
					email: "*Your e-mail address is incorrect."
				},
				inquiryTextEn :{
					required: "*Please enter xxx."
				}
			}
		});

	});

});




/* メールフォーム
--------------------------*/


// Mailform //
$(function() {

	// Resetを押したときの判定 //
	$("input#btn_reset_ja,input#btn_reset_en").click(function() {

		// バリデート注意文言を消す -日本語- //
		$("label#inquiryListJp-error").html("").hide();
		$("label#inquiryCompanyNameJp-error").html("").hide();
		$("label#inquiryNameJaJp-error").html("").hide();
		$("label#inquiryNameEnJp-error").html("").hide();
		$("label#inquiryMailJp-error").html("").hide();
		$("label#inquiryPhoneJp-error").html("").hide();
		$("label#inquiryTextJp-error").html("").hide();

		// バリデート注意文言を消す -英語- //
		$("label#inquiryListEn-error").html("").hide();
		$("label#inquiryCompanyNameEn-error").html("").hide();
		$("label#inquiryNameEnEn-error").html("").hide();
		$("label#inquiryMailEn-error").html("").hide();
		$("label#inquiryPhoneEn-error").html("").hide();
		$("label#inquiryTextEn-error").html("").hide();

		$("p#inquiryListDisplayJp,p#inquiryListDisplayEn").html("");
		$("input:text").val("");
	});


	// 同意ボタンを押したときのリセット、確認ボタンの判定 //
	/*  default */
			$("#btn_reset_ja").attr('id',"btn_reset_off_ja").attr('disabled', true);
			$("#btn_reset_en").attr('id',"btn_reset_off_en").attr('disabled', true);
			$("#btn_confirm_ja").attr('id',"btn_confirm_off_ja").attr('disabled', true);
			$("#btn_confirm_en").attr('id',"btn_confirm_off_en").attr('disabled', true);

	/*  accept */
	$("#accept_ja,#accept_en").click(function() {

		if ($("#accept_ja:checked,#accept_en:checked").length === 1) {
			$("#btn_reset_off_ja").attr('id',"btn_reset_ja").attr('disabled', false);
			$("#btn_reset_off_en").attr('id',"btn_reset_en").attr('disabled', false);
			$("#btn_confirm_off_ja").attr('id',"btn_confirm_ja").attr('disabled', false);
			$("#btn_confirm_off_en").attr('id',"btn_confirm_en").attr('disabled', false);
		}
		else {
			$("#btn_reset_ja").attr('id',"btn_reset_off_ja").attr('disabled', true);
			$("#btn_reset_en").attr('id',"btn_reset_off_en").attr('disabled', true);
			$("#btn_confirm_ja").attr('id',"btn_confirm_off_ja").attr('disabled', true);
			$("#btn_confirm_en").attr('id',"btn_confirm_off_en").attr('disabled', true);
		}

	}).css("cursor","pointer");


	// 戻るボタンを押したときの判定 //
	$("input#btn_formback_ja,input#btn_formback_en").click(function() {
		location.href="index.html"
	});


	// windowをリサイズした時にコロンを取る //
	$(window).bind("resize load", function() {


		var ua = navigator.userAgent;

		// -SP版- //
		if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 || ua.indexOf('BlackBerry') > 0 || ua.indexOf('windows Phone') > 0 || ua.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(ua)){

			// なし  //

		}

		// -PC版-  //
		else {

			// ウィンドウサイズを精査  //
			var ww = $(window).width();
			//$("#test").html(ww);　デバッグ用

			// ウィンドウサイズが630px以下になったら  //
			if((ww) < 630) {
				$(".colon").hide();
				$(".textarea").css("width", 400 / 400 * 100 + "%" );
			}

			// ウィンドウサイズが630px以上になったら  //
			else {
				$(".colon").show();
				$(".textarea").css("width", 400 + "px" );
			}

		}

	});

});




/* サジェスト
--------------------------*/


// Suggest En:英語、Jp:日本語  //
$(function() {

	// サジェスト外がクリッカブルになる為のサジェストクリアゾーン -初期設定: hidden- //
	$(".suggestClear").hide();

	$(window).bind("resize load", function() {

		var ua = navigator.userAgent;

		// サジェストを出す -SP版- //
		if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 || ua.indexOf('BlackBerry') > 0 || ua.indexOf('windows Phone') > 0 || ua.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(ua)){

			$("#inquiryListDisplayJp,#inquiryListDisplayEn").on({

				// タッチがサジェストの上に乗った時の判定 //
				'click':function() {
					$("#suggestJp,#suggestEn").fadeIn();

					// サジェストクリアゾーンを出す //
					$(".suggestClear").show();

					// サジェストクリアゾーンが全面に出るように設定 //
					var ww = $(window).width();
					var wh = $(window).height();
					$(".suggestClear").css({
						"width": ww,
						"height": wh,
					});
				}

			});

			$(".suggestClear").on({

				// タッチがサジェストクリアゾーンの上に乗った時の判定 //
				'click':function() {
					$("#suggestJp,#suggestEn").fadeOut();
					$(".suggestClear").hide();
				}

			});


		}

		// サジェストを出す -PC版-  //
		else {

			// マウスカーソルがセレクターの上に乗ったらサジェストを出す//
			$(".suggest_pc").on({

				// マウスカーソルがサジェストの上に乗った時の判定 //
				'mouseenter':function() {
					$("#suggestJp,#suggestEn").fadeIn();
				},

				// マウスカーソルがサジェストの上から外れた時の判定 //
				'mouseleave':function() {
					$("#suggestJp,#suggestEn").fadeOut();
				}

			});

		}

		// セレクター内のテキストをクリックした時の判定  //
		$("#suggestJp,#suggestEn").click(function() {
			$("#suggestJp,#suggestEn").fadeOut();
			$(".suggestClear").hide();
		});


	});

	// サジェスト内のお問い合わせ事項テキストを値として読み込む  //
	var suggestBusinessJp = $("#menuJp0").text();
	var suggestRecruitJp  = $("#menuJp1").text();
	var suggestCreativeJp = $("#menuJp2").text();
	var suggestPersonalJp = $("#menuJp3").text();
	var suggestOtherJp    = $("#menuJp4").text();

	var suggestBusinessEn = $("#menuEn0").text();
	var suggestRecruitEn  = $("#menuEn1").text();
	var suggestCreativeEn = $("#menuEn2").text();
	var suggestPersonalEn = $("#menuEn3").text();
	var suggestOtherEn    = $("#menuEn4").text();

	// テキストの値をinput#inquiryListへ与える  //
	$("#menuJp0,#menuEn0").mouseover(function() {
		$("#inquiryListJp").val(suggestBusinessJp);
		$("#inquiryListDisplayJp").html(suggestBusinessJp);
		$("#inquiryListEn").val(suggestBusinessEn);
		$("#inquiryListDisplayEn").html(suggestBusinessEn);
	});
	$("#menuJp1,#menuEn1").mouseover(function() {
		$("#inquiryListJp").val(suggestRecruitJp);
		$("#inquiryListDisplayJp").html(suggestRecruitJp);
		$("#inquiryListEn").val(suggestRecruitEn);
		$("#inquiryListDisplayEn").html(suggestRecruitEn);
	});
	$("#menuJp2,#menuEn2").mouseover(function() {
		$("#inquiryListJp").val(suggestCreativeJp);
		$("#inquiryListDisplayJp").html(suggestCreativeJp);
		$("#inquiryListEn").val(suggestCreativeEn);
		$("#inquiryListDisplayEn").html(suggestCreativeEn);
	});
	$("#menuJp3,#menuEn3").mouseover(function() {
		$("#inquiryListJp").val(suggestPersonalJp);
		$("#inquiryListDisplayJp").html(suggestPersonalJp);
		$("#inquiryListEn").val(suggestPersonalEn);
		$("#inquiryListDisplayEn").html(suggestPersonalEn);
	});
	$("#menuJp4,#menuEn4").mouseover(function() {
		$("#inquiryListJp").val(suggestOtherJp);
		$("#inquiryListDisplayJp").html(suggestOtherJp);
		$("#inquiryListEn").val(suggestOtherEn);
		$("#inquiryListDisplayEn").html(suggestOtherEn);
	});

});




/* 言語切り替え
--------------------------*/


// Language Change //
$(function() {

	// 1.ブラウザの言語設定から言語判定をとり、そこから日本語表示か英語表示か切り替える //
	function browserLanguage() {
		try {
			return (navigator.browserLanguage || navigator.language || navigator.userLanguage).substr(0,2) == "ja" ? "ja" : "en";
		}
		catch(e) {
			return undefined;
		}
	}

	var settinglang = browserLanguage();

	// 2.グローバルナビから言語判定をとり、そこから日本語表示か英語表示か切り替える -SP版-//
	function showLanguageSP(i) {

		var langArr = i ;

		switch (langArr){
			case "ja" :
				$.cookie("lang_ja", langArr, { expires: 365 , path: '/' });
				$.removeCookie("lang_en", { path: '/' });

				$("#ja").fadeIn().show();
				$("#en").fadeOut().hide();
				$(".language_list li.btn_ja").removeClass("btn_ja").addClass("btn_ja_active");
				$(".language_list li.btn_en_active").removeClass("btn_en_active").addClass("btn_en");

				break;

			case "en" :
				$.cookie("lang_en", langArr , { expires: 365 , path: '/' });
				$.removeCookie("lang_ja", { path: '/' });

				$("#en").fadeIn().show();
				$("#ja").fadeOut().hide();
				$(".language_list li.btn_en").removeClass("btn_en").addClass("btn_en_active");
				$(".language_list li.btn_ja_active").removeClass("btn_ja_active").addClass("btn_ja");

				break;

			default :
				$.cookie("lang_ja", langArr, { expires: 365 , path: '/' });
				$.removeCookie("lang_en", { path: '/' });

				$("#ja").fadeIn().show();
				$("#en").fadeOut().hide();
				$(".language_list li.btn_ja").removeClass("btn_ja").addClass("btn_ja_active");
				$(".language_list li.btn_en_active").removeClass("btn_en_active").addClass("btn_en");

				break;

		}

	}

	// 2.グローバルナビから言語判定をとり、そこから日本語表示か英語表示か切り替える -PC版- //
	function showLanguagePC(i) {

		var langArr = i ;

		switch (langArr) {
			case "ja" :
				$.cookie("lang", langArr, { expires: 365 , path: '/' });
				$.removeCookie("lang_en", { path: '/' });

				$("#ja").fadeIn().show();
				$("#en").fadeOut().hide();

				break;

			case "en" :
				$.cookie("lang", langArr, { expires: 365 , path: '/' });
				$.removeCookie("lang_ja", { path: '/' });

				$("#en").fadeIn().show();
				$("#ja").fadeOut().hide();

				break;

			default :
				$.cookie("lang", langArr, { expires: 365 , path: '/' });
				$.removeCookie("lang_en", { path: '/' });

				$("#ja").fadeIn().show();
				$("#en").fadeOut().hide();

				break;

		}

	}

	// 3.デフォルトの表示 -lang:PC版、lang_ja / lang_en:SP版- //
	$(function() {
		var lang_ja = $.cookie("lang_ja");
		var lang_en = $.cookie("lang_en");
		var lang = $.cookie("lang");

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
	$("#jaBtn").click(function() {
		showLanguageSP('ja');
	});

	$("#enBtn").click(function() {
		showLanguageSP('en');
	});

});




/* SNS API
--------------------------*/


// Twitter_Facebook //
function popupLink(type, _self)	{

	var href,
		windowname;

	if (type === "twitter") {
		href = "http://twitter.com/share?original_referer=http://www.test.jp/&textテキストが入ります。&url=http://www.test.jp/";
		windowname = "twitterwindow";
	}

	else if (type === "facebook") {
		href = "http://www.facebook.com/share.php?u=http://www.test.jp/";
		windowname = "facebookwindow";
	}

	window.open(href, windowname, 'width=550, height=450,personalbar=0,toolbar=0,scrollbars=1,resizable=1');
	return false;

}




/* 特定端末対応
--------------------------*/


// Device Measures En:英語、Jp:日本語  //
// 1.SP版とPC版でレイアウトを変える  //
$(window).load(function() {

	var ua = navigator.userAgent;

	// iPhone, AndroidなどのSP端末の表示 //
    if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 || ua.indexOf('BlackBerry') > 0 || ua.indexOf('windows Phone') > 0 || ua.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(ua)){

		// common -SP版背景画像を固定化- //
		/* SPかPCかの判定を切り替える */
		$(".bg_top_pc").addClass("bg_top_sp").removeClass("bg_top_pc");
		$(".bg_contents_pc").addClass("bg_contents_sp").removeClass("bg_contents_pc");
		$(".bg_work_pc").addClass("bg_work_sp").removeClass("bg_work_pc");

		/* SPならば背景固定用のソースを挿入する */
		$("body.bg_top").append("<div class='background-bg_top'></div>");
		$("body.bg_contents").append("<div class='background-bg_contents'></div>");
		$("body.bg_work").append("<div class='background-bg_work'></div>");

		/* iOS用にスクロールして背景がカクつく現象を解消させる */
		$(window).bind("resize load", function(){
			var wh = $(window).outerHeight();

			$("#lb_overlay,.background-bg_top,.background-bg_contents,.background-bg_work").css({
				"height" : wh
			});

		}).trigger("resize");

		// form -SP版wrapperレイアウト- //
		$("#wrapper").addClass("wrapper_sp").removeClass("wrapper");

		// form  -SP版formレイアウト- //
		$("#form_layoutJp,#form_layoutEn").addClass("form_sp").removeClass("form");

		// form -SP版formComplete画像サイズ- //
		$("#sentCompleteJp,#sentCompleteEn").addClass("img_complete_sp")

		// form -SP版suggestレイアウト- //
		$(".suggest_pc").addClass("suggest_sp").removeClass("suggest_pc");
		$("#suggestJp,#suggestEn").addClass("suggest_wrap_sp").removeClass("suggest_wrap_pc");

   	}

});


// 2.Android対策 -横向きで微妙にずれる- //
var portraitWidth,landscapeWidth;

$(window).bind("resize load", function() {

	var ua = navigator.userAgent;

	// デバッグ用 //
	//$("#test01").html(ww);

	// iPhone, iPadなど //
	if ((ua.indexOf('iPhone') > 0 && ua.indexOf('iPad') == -1) || ua.indexOf('iPod') > 0) {

		$("html").css("zoom" , 1 );

	}

	// Android //
	else if (ua.indexOf('Android') > 0) {

		// Android時の傾き（ポートレイトかランドスケープか）を判定
		if ('object' === typeof window.onorientationchange) {
			window.addEventListener("orientationchange", function () {

				if (window.innerHeight > window.innerWidth) {
				// ポートレイト（ランドスケープ）
					$("html").css("zoom" , landscapeWidth / 320 );
				}
				else {
				// ランドスケープ（ポートレイト）
					$("html").css("zoom" , portraitWidth / 320 );
				};

			}, false);
		}

	}

}).trigger("resize");