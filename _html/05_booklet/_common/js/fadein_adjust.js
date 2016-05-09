// JavaScript Lightbox Adjust //
		
		
		//windowFade
		$('head').append('<style type="text/css">#wrapper{display;none;}</style>');
			function windowFade(){
			$('#windowFade').each(function(){
				$('#windowFade').fadeOut(1000).height($('body'));
				$('#nav a').click(function(){
					var url = $(this).attr('href');
					if( this.href.match(location.hostname) && $(this).attr("href").charAt(0) != "#" && !$(this).attr("rel") && !$(this).attr("target") ){
						var LinkURL = $(this).attr("href");
						$('#windowFade').fadeIn(1000,function(){
							location.href = LinkURL;
						});
						return false;
					}
				});
			});
		};
		window.onload = function() {
		windowFade();
		};
		window.onunload = function() {
		windowFade();
		};