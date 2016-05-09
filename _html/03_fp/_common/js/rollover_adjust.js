// JavaScript Rollover Adjust //


		$(document).ready(function(){
		$("img.jquery-hover").fadeTo(0,1.0);
		$("img.jquery-hover").hover(function(){
				$(this).fadeTo(500,0.4);
			},
			function(){
				$(this).fadeTo(500,1.0);
			});
		});