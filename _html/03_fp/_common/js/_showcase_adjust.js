// JavaScript Main-img Adjust //


	$(function() {
		$("#main_img").showcase({
			images: [{ 
						url: "_images/common/main_img01.jpg", 
						description:"<h2>image01</h2><p>テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。</p><p class='fi_right'><a href='http://www.yahoo.co.jp/' target='_blank'>詳しく見る</a></p>",
						link: "http://www.yahoo.co.jp/",

					},
					
					{ 
						url: "_images/common/main_img02.jpg",
						description: "<h2>image02</h2> <p>テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。</p><div class='showBox'><a href='http://www.google.co.jp/' target='_blank'><img src='../../../../../_template/_template03_mobile/_common/js/_images/common/banner_01.jpg' width='180' height='60' alt='banner_01' class='jquery-hover' /></a></div>",
						link: "http://www.google.co.jp/"
					},
					{
						url: "_images/common/main_img03.jpg",
						description: "<h2>image03</h2> <p>テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。</p>",
						link: "#03"
					}
			//以下画像分
		],
		
		width: "1080px", //ギャラリー幅
		
		height: "400px", //ギャラリー高さ
		
		animation: { type: "fade", interval: 3500, speed: 1000 }, //アニメーション設定
		
		titleBar: {
			css: { 
				position: "left",
				left: "10px",
				width: "200px",
				height: "400px",
				padding: "10px",
				} ,
			position:"top",
			enabled: true,
		},
		
		navigator: {　//サムネイル表示設定
		
		showMiniature: true,　//サムネイル表示on
		
		css: {
			 padding: "6px", margin: "0px 0px 0px 0px"
		},
		
		item: {
			cssClass: null,
			cssClassHover: null,
			cssClassSelected: null,
			css: {
				display: "none",
				position: "relative",
				right: "0px",
				width: "140px", height: "60px", //サムネイルの画像サイズ設定
				lineHeight: "10px",
				verticalAlign: "middle",
				backgroundColor: "#878787",
				margin: "3px 3px 3px 0px",
				border: "solid 1px #acacac",
			},
			
			cssHover: {
				backgroundColor: "#767676",
				border: "solid 1px #ff0000"
			},
			
			cssSelected: {
				backgroundColor: "#ff0000",
				border: "solid 1px blue"
			}
		},
		position: "bottom-right" //サムネイルの配置設定
		
		}

		
		
		});
	});
	
	
