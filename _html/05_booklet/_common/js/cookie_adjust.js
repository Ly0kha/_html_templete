// JavaScript Font-size Adjust //


	jQuery(function($){
		//変数にクッキー名を入れる
		var history = $.cookie('fontSize');
		
		//適用する箇所を指定
		var elm = $('#wrapper');
		
		//変数が空ならfontMを、空でなければクッキーに保存しておいたものを適用
		(!history)? elm.addClass('fontM'):elm.addClass(history);
		
		//クリックしたら実行
		$('li','#fontChange').click(function(){
		
			//クリックした要素のID名を変数にセット
			var setFontSize = this.id;
			
			//クッキーに変数を保存
			$.cookie('fontSize', setFontSize);
			
			//一度classを除去して、変数をclassとして追加
			elm.removeClass().addClass(setFontSize);
		});
	});