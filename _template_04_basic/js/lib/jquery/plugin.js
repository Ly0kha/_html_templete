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


// test IE判定実装 //
// IEであるか否かの判定
// var isIE = false; // IEか否か
// var version = null; // IEのバージョン
// var ua = navigator.userAgent;

// if( ua.match(/MSIE/) || ua.match(/Trident/) ) {
//		isIE = true;
//		version = ua.match(/(MSIE\s|rv:)([\d\.]+)/)[2];
//		location.href="http://www.yahoo.co.jp/"
// }


// header共通化 //
function writeHeader(rootDir) {

	$.ajax({
		url: rootDir + "include/header.html", // パスはplugin.jsが読み込まれたHTMLファイルが基準 //
		cache: false, // キャッシュを利用 //
		async: false, // 非同期で読み込む //
		success: function(html){
			html = html.replace(/\{\$root\}/g, rootDir);
			document.write(html);
		}
	});

}


// dt adjust //
$(function() {

	function adjust(){
		var dtw = $("dl#column dt").outerWidth(); // dtの幅 //
		$("dl#column dd").css("margin-left", dtw + 10 + "px"); // 可変部分の高さを適用 //
	}

	adjust();

	$(window).bind("resize load", function() {
		adjust();
	})

});


// PageScroll //
$(function() {

	$("a[href*=#top]").click(function() {

		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') &&　location.hostname == this.hostname) {

			var target = $(this.hash);
			target = target.length && target;

			if (target.length) {
				var sclpos = 10;
				var scldurat = 500;
				var targetOffset = target.offset().top - sclpos;
				$('html,body')
					.animate({scrollTop: targetOffset}, {duration: scldurat, easing: "easeOutExpo"});
			}
			return false;

		}

	});

});


// Slider //
$('.carousel').carousel({
	interval: 2000
});


// Slider-Swipe //
$(function() {
	var carousel = $('.carousel');
	var hammer = new Hammer(carousel[0]);
	hammer.on('swipeleft', function(){ carousel.carousel('next'); });   //--- 左にスワイプしたら次の画像に切り替え
	hammer.on('swiperight', function(){ carousel.carousel('prev'); });  //--- 右にスワイプしたら前の画像に切り替え
});


// Tabs //
$(function() {

	$("#tabs").tabs({
		collapsible: false,
		show: { effect: "fadeIn", duration: 800 },
		fx: { height: 'toggle', opacity: 'toggle', duration: 300 }
	});

});


// Window Close, Window Open //
function quitBox(cmd) {

	if (cmd=='quit'){
		open(location, '-self').close();
	}
	return false;

}


// Rollover Switch -PC版-//
function smartRollover() {

	if(document.getElementsByTagName) {

		var images = document.getElementsByTagName("img");
		for(var i=0; i < images.length; i++) {

			if(images[i].getAttribute("src").match("-off.")) {

				images[i].onmouseover = function() {
					this.setAttribute("src", this.getAttribute("src").replace("-off.", "-on."));
				}
				images[i].onmouseout = function() {
					this.setAttribute("src", this.getAttribute("src").replacee("-on.", "-off."));
				}

			}

		}

	}

}

if (window.addEventListener) {
	window.addEventListener("load", smartRollover, false);
}

else if (window.attachEvent) {
	window.attachEvent("onload", smartRollover);
}


// target-blank for IE8 //
$(function(){

	$('.blank').click(function(){
		window.open(this.href, '-blank');
		return false;
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

			if ($("#lb-overlay").is(":hidden")) {

				// ライトボックスのオーバーレイを出す //
				$("#lb-overlay, #lb-container").fadeIn();

				// todo: ライトボックスコンテンツを読み込ませる方法と切り分け方 //
				$(".bg-lightbox").html("<img src='"+$(this).attr("href")+"' class='mg-left-right-auto block'/>").fadeIn();

				// ライトボックスの背景をドキュメントの高さに合わせる //
				var ww = $(window).width();
				var wh = $(window).height();
				var dh = $(document).height();
				var lw = $(".bg-lightbox").width();
				var lh = $(".bg-lightbox").height();
				var ua = navigator.userAgent;

					if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 || ua.indexOf('BlackBerry') > 0 || ua.indexOf('windows Phone') > 0 || ua.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(ua)){

						$("#lb-overlay").css({
							"width" : ww,
							"height" : wh + 100 + "px"
						});

						$(".lb-wrapper").css({
							"zoom" : 0.6,
							"font-size" : 1 + "em"
						});

					}

					else {

						$("#lb-overlay").css({
							"width" : ww,
							"height" : wh
						});

					}


				// 傾けてもライトボックスの背景をドキュメントの高さに合わせる //
				$(window).bind("resize load", function() {

					var ww = $(window).width();
					var wh = $(window).height();
					var dh = $(document).height();
					var lw = $(".bg-lightbox").width();
					var lh = $(".bg-lightbox").height();
					var ua = navigator.userAgent;

					if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 || ua.indexOf('BlackBerry') > 0 || ua.indexOf('windows Phone') > 0 || ua.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(ua)){

						$("#lb-overlay").css({
							"width" : ww,
							"height" : wh + 100 + "px"
						});

						$(".lb-wrapper").css({
							"zoom" : 0.6,
							"font-size" : 1 + "em"
						});

					}

					else {

						$("#lb-overlay").css({
							"width" : ww,
							"height" : wh
						});

					}

				}).trigger("resize");

			}

			else {
				$(".bg-lightbox").html("").hide();
				// ライトボックスのオーバーレイ、背景を引っ込める //
				$("#lb-overlay, #lb-container").hide();
			}

	});


	// テキストボックスを出す //
	$('a[rel=textbox]').click(function(e) {

		e.preventDefault();

		if ($("#lb-overlay").is(":hidden")) {

			// ライトボックスのオーバーレイを出す //
			$("#lb-overlay, #lb-container").fadeIn();

			// todo: ライトボックスコンテンツを読み込ませる方法と切り分け方 //
			var title = $(this).attr('title');
			$(".bg-lightbox").html('<p>' + title + '</p>').fadeIn();

			// ライトボックスの背景をドキュメントの高さに合わせる //
			var ww = $(window).width();
			var wh = $(window).height();
			var dh = $(document).height();
			var lw = $(".bg-lightbox").width();
			var lh = $(".bg-lightbox").height();
			var ua = navigator.userAgent;

			if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 || ua.indexOf('BlackBerry') > 0 || ua.indexOf('windows Phone') > 0 || ua.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(ua)){

				$("#lb-overlay").css({
					"width" : ww,
					"height" : wh + 100 + "px"
				});

				$(".lb-wrapper").css({
					"zoom" : 0.6,
					"font-size" : 1 + "em"
				});

			}

			else {

				$("#lb-overlay").css({
					"width" : ww,
					"height" : wh
				});

			}


			// 傾けてもライトボックスの背景をドキュメントの高さに合わせる //
			$(window).bind("resize load", function() {

				var ww = $(window).width();
				var wh = $(window).height();
				var dh = $(document).height();
				var lw = $(".bg-lightbox").width();
				var lh = $(".bg-lightbox").height();
				var ua = navigator.userAgent;

				if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 || ua.indexOf('BlackBerry') > 0 || ua.indexOf('windows Phone') > 0 || ua.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(ua)){

					$("#lb-overlay").css({
						"width" : ww,
						"height" : wh + 100 + "px"
					});

					$(".lb-wrapper").css({
						"zoom" : 0.6,
						"font-size" : 1 + "em"
					});

				}

				else {

					$("#lb-overlay").css({
						"width" : ww,
						"height" : wh
					});

				}

			}).trigger("resize");

		}

		else {
			$(".bg-lightbox").html("").hide();
			// ライトボックスのオーバーレイ、背景を引っ込める //
			$("#lb-overlay, #lb-container").hide();
		}

	});


	// ライトボックスの背景でクローズする //
	$("#lb-overlay").click(function(e) {

		e.preventDefault();

		$(".bg-lightbox").html("").hide();

		$("#lb-overlay").hide();
		$("#lb-overlay").css({
			"width" : "",
			"height" : ""
		});

	});

});




/* バリデート
--------------------------*/


// MailValidate //
$(function() {


	// Submitを押したときの判定 Jp:日本語  //
	$("input#btn-confirm-ja:submit").click(function() {

		//全角ひらがな･カタカナのみ
		jQuery.validator.addMethod("kana", function(value, element) {
			return this.optional(element) || /^([ァ-ヶーぁ-ん]+)$/.test(value);
			}, "全角ひらがな･カタカナを入力してください"
		);

		//全角ひらがなのみ
		jQuery.validator.addMethod("hiragana", function(value, element) {
			return this.optional(element) || /^([ぁ-ん]+)$/.test(value);
			}, "全角ひらがなを入力してください"
		);

		//半角アルファベット（大文字･小文字）のみ
		jQuery.validator.addMethod("alphabet", function(value, element) {
			return this.optional(element) || /^([a-zA-Z0-9\s\@-\.\-]+)$/.test(value);
			}, "半角英字を入力してください"
		);

		$("#inquiryFormJp").validate({
			ignore: ".ignore",
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
					required: "※お問い合わせ内容をお選び下さい。"
				},
				inquiryCompanyNameJp :{
					required: "※必須項目です。"
				},
				inquiryNameJaJp :{
					required: "※必須項目です。"
				},
				inquiryNameEnJp :{
					required: "※必須項目です。",
					alphabet: "※半角英数で入力して下さい。"
				},
				inquiryMailJp :{
					required: "※必須項目です",
					alphabet: "※半角英数で入力して下さい。",
					email: "※メールアドレスを入力してください。"
				},
				inquiryTextJp :{
					required: "※必須項目です。"
				}
			}
		});

		var ua = navigator.userAgent;
		var scldurat = 500;


		// エラーが出た箇所へ飛ぶ -SP版- //
		if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 || ua.indexOf('BlackBerry') > 0 || ua.indexOf('windows Phone') > 0 || ua.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(ua)){

			if ($("input#inquiryListJp").val() === ""){

				var inquiryListJp = $("input#inquiryListJp");
				var offset = inquiryListJp.offset();
				var sclpos = 20;
				var targetOffset = inquiryListJp.offset().top + sclpos;

				$('html,body').animate({ scrollTop: offset.top }, {duration: scldurat, easing: "easeOutExpo"});

			}

			else if ($("input#inquiryCompanyNameJp").val() === ""){

				var inquiryCompanyNameJp = $("input#inquiryCompanyNameJp");
				var offset = inquiryCompanyNameJp.offset();

				$('html,body').animate({ scrollTop: offset.top }, {duration: scldurat, easing: "easeOutExpo"});

			}

			else if ($("input#inquiryNameJaJp").val() === ""){

				var inquiryNameJaJp = $("input#inquiryNameJaJp");
				var offset = inquiryNameJaJp.offset();

				$('html,body').animate({ scrollTop: offset.top }, {duration: scldurat, easing: "easeOutExpo"});

			}

			else if ($("input#inquiryNameEnJp").val() === ""){

				var inquiryNameEnJp = $("input#inquiryNameEnJp");
				var offset = inquiryNameEnJp.offset();

				$('html,body').animate({ scrollTop: offset.top }, {duration: scldurat, easing: "easeOutExpo"});

			}

			else if ($("input#inquiryMailJp").val() === ""){

				var inquiryMailJp = $("input#inquiryMailJp");
				var offset = inquiryMailJp.offset();

				$('html,body').animate({ scrollTop: offset.top }, {duration: scldurat, easing: "easeOutExpo"});

			}

			else if ($("textarea#inquiryTextJp").val() === ""){

				var inquiryTextJp = $("input#inquiryTextJp");
				var offset = inquiryTextJp.offset();

				$('html,body').animate({ scrollTop: offset.top }, {duration: scldurat, easing: "easeOutExpo"});

			}

		}

	});


	// Submitを押したときの判定 En:英語  //
	$("input#btn-confirm-en:submit").click(function() {

		$("#inquiryFormEn").validate({
			ignore: ".ignore",
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
					required: "*Please select."
				},
				inquiryCompanyNameEn :{
					required: "*Please enter xxx."
				},
				inquiryNameEnEn :{
					required: "*Please enter xxx."
				},
				inquiryMailEn :{
					required: "*Please enter xxx.",
					email: "*Your e-mail address is incorrect."
				},
				inquiryTextEn :{
					required: "*Please enter xxx."
				}
			}
		});


		// エラーが出た箇所へ飛ぶ -SP版- //
		var ua = navigator.userAgent;
		var scldurat = 500;

		if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 || ua.indexOf('BlackBerry') > 0 || ua.indexOf('windows Phone') > 0 || ua.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(ua)){

			if ($("input#inquiryListEn").val() === ""){
				$('html,body').animate({ scrollTop: 170 }, {duration: scldurat, easing: "easeOutExpo"});
			}

			else if ($("input#inquiryNameEnEn").val() === ""){
				$('html,body').animate({ scrollTop: 370 }, {duration: scldurat, easing: "easeOutExpo"});
			}

			else if ($("input#inquiryMailEn").val() === ""){
				$('html,body').animate({ scrollTop: 470 }, {duration: scldurat, easing: "easeOutExpo"});
			}

			else if ($("textarea#inquiryTextEn").val() === ""){
				$('html,body').animate({ scrollTop: 670 }, {duration: scldurat, easing: "easeOutExpo"});
			}

		}

	});

});




/* メールフォーム
--------------------------*/


// Mailform //
$(function() {


	// Resetを押したときの判定 //
	$("input#btn-reset-ja,input#btn-reset-en").click(function() {

		// バリデート注意文言を消す -日本語- //
		$("label.error").html("").hide();

		// サジェスト部分の注意文言及び[input type="hidden"]内の値を消す -共通- //
		$("p#inquiryListDisplayJp,p#inquiryListDisplayEn").html("");
		$("input#inquiryListJp,input#inquiryListEn").val("");

		// [input type="text"][textarea]内の値を消す -共通- //
		$("input:text,input:checked,textarea").val("");

		// 同意するボタン内の値を消す -共通- //
		$("#accept-ja,#accept-en").attr("checked", false);

		// 同意ボタンにチェックが入っているか否かでのリセット、確認ボタンの判定 //
		if ($("#accept-ja:checked,#accept-en:checked").length === 0) {

			$("#btn-reset-ja").attr('id',"btn-reset-off-ja").attr('disabled', true);
			$("#btn-reset-en").attr('id',"btn-reset-off-en").attr('disabled', true);
			$("#btn-confirm-ja").attr('id',"btn-confirm-off-ja").attr('disabled', true);
			$("#btn-confirm-en").attr('id',"btn-confirm-off-en").attr('disabled', true);

		}

		// リセットボタン押したらページトップへ飛ぶ -SP版- //
		var ua = navigator.userAgent;
		var scldurat = 500;

		if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 || ua.indexOf('BlackBerry') > 0 || ua.indexOf('windows Phone') > 0 || ua.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(ua)){
			$('html,body').animate({ scrollTop: 0 }, 'fast');
		}

	});


	// 同意ボタンを押したときのリセット、確認ボタンの判定 //
	/*  default */
			$("#btn-reset-ja").attr('id',"btn-reset-off-ja").attr('disabled', true);
			$("#btn-reset-en").attr('id',"btn-reset-off-en").attr('disabled', true);
			$("#btn-confirm-ja").attr('id',"btn-confirm-off-ja").attr('disabled', true);
			$("#btn-confirm-en").attr('id',"btn-confirm-off-en").attr('disabled', true);

	/*  accept */
	$("#accept-ja,#accept-en").click(function() {

		if ($("#accept-ja:checked,#accept-en:checked").length === 1) {

			$("#btn-reset-off-ja").attr('id',"btn-reset-ja").attr('disabled', false);
			$("#btn-reset-off-en").attr('id',"btn-reset-en").attr('disabled', false);
			$("#btn-confirm-off-ja").attr('id',"btn-confirm-ja").attr('disabled', false);
			$("#btn-confirm-off-en").attr('id',"btn-confirm-en").attr('disabled', false);

		}

		else {

			$("#btn-reset-ja").attr('id',"btn-reset-off-ja").attr('disabled', true);
			$("#btn-reset-en").attr('id',"btn-reset-off-en").attr('disabled', true);
			$("#btn-confirm-ja").attr('id',"btn-confirm-off-ja").attr('disabled', true);
			$("#btn-confirm-en").attr('id',"btn-confirm-off-en").attr('disabled', true);

		}

	}).css("cursor","pointer");

	// 戻るボタンを押したときの判定 //
	$("input#btn-formback-ja,input#btn-formback-en").click(function() {
		location.href="index.html"
	});


	// SP版とPC版でとび先を変える //
	$(window).load(function() {

		var ua = navigator.userAgent;

		// -SP版- //
		if (ua.indexOf('iPhone') > 0 || ua.indexOf('iPad') > 0 || ua.indexOf('iPod') > 0 || ua.indexOf('Android') > 0 || ua.indexOf('BlackBerry') > 0 || ua.indexOf('windows Phone') > 0 || ua.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(ua)){

			$(".policy").click(function() {
				// location.href="../sitepolicy/index.html"
				// window.open("../sitepolicy/index.html", '-blank');
				return false;
			});

		}

		// -PC版-  //
		else {

			$(".policy").click(function() {
				// location.href="../../#/sitepolicy/"
				// window.open("../../#/sitepolicy/", '-blank');
				return false;
			});

		}

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

			// ウィンドウサイズが940px以下になったら  //
			if((ww) < 940) {
				$(".colon").hide();
				$("dl.form-pc dd").css("width", 400 / 400 * 100 + "%" );
			}

			// ウィンドウサイズが630px以上になったら  //
			else {
				$(".colon").show();
				$("dl.form-pc dd").css("width", 600 + "px" );
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
			$(".suggest-pc").on({
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
				$(".language-list li.btn-ja").removeClass("btn-ja").addClass("btn-ja-active");
				$(".language-list li.btn-en-active").removeClass("btn-en-active").addClass("btn-en");

				break;

			case "en" :
				$.cookie("lang_en", langArr , { expires: 365 , path: '/' });
				$.removeCookie("lang_ja", { path: '/' });

				$("#en").fadeIn().show();
				$("#ja").fadeOut().hide();
				$(".language-list li.btn-en").removeClass("btn-en").addClass("btn-en-active");
				$(".language-list li.btn-ja-active").removeClass("btn-ja-active").addClass("btn-ja");

				break;

			default :
				$.cookie("lang_ja", langArr, { expires: 365 , path: '/' });
				$.removeCookie("lang_en", { path: '/' });

				$("#ja").fadeIn().show();
				$("#en").fadeOut().hide();
				$(".language-list li.btn-ja").removeClass("btn-ja").addClass("btn-ja-active");
				$(".language-list li.btn-en-active").removeClass("btn-en-active").addClass("btn-en");

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


// Twitter-Facebook //
function popupLink(type, _self) {

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
		$(".bg-top-pc").addClass("bg-top-sp").removeClass("bg-top-pc");
		$(".bg-contents-pc").addClass("bg-contents-sp").removeClass("bg-contents-pc");
		$(".bg-work-pc").addClass("bg-work-sp").removeClass("bg-work-pc");

		/* SPならば背景固定用のソースを挿入する */
		$("body.bg-top").append("<div class='background-bg-top'></div>");
		$("body.bg-contents").append("<div class='background-bg-contents'></div>");
		$("body.bg-work").append("<div class='background-bg-work'></div>");

		/* iOS用にスクロールして背景がカクつく現象を解消させる */
		$(window).bind("resize load", function(){
			var wh = $(window).outerHeight();

			$("#lb-overlay,.background-bg-top,.background-bg-contents,.background-bg-work").css({
				"height" : wh
			});

		}).trigger("resize");

		// form -SP版wrapperレイアウト- //
		$("#wrapper").addClass("wrapper-sp").removeClass("wrapper");

		// form  -SP版formレイアウト- //
		$("#form-layoutJp,#form-layoutEn").addClass("form-sp").removeClass("form-pc");

		// form -SP版formComplete画像サイズ- //
		$("#sentCompleteJp,#sentCompleteEn").addClass("img-complete-sp");

		// form -SP版suggestレイアウト- //
		$(".suggest-pc").addClass("suggest-sp").removeClass("suggest-pc");
		$("#suggestJp,#suggestEn").addClass("suggest-wrap-sp").removeClass("suggest-wrap-pc");

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