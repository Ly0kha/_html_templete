// JavaScript Booklet Adjust //


			$(function() {
				//単一のbookletを使う場合
				$('#mybook').booklet({
				});
								
				//複数のIDで複数のbookletを使う場合
				$('#mybook1, #mybook2').booklet();
			
				//自分で指定したクラスで複数のbookletを使う場合
				$('.mycustombooks').booklet();
			});
			