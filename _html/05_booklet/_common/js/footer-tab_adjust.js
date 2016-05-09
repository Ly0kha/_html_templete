// JavaScript Footer-Tab Adjust //


			$(document).ready(function(){
			
				$("#tab").click(function () {
				  if ($("#foot_panel:first").is(":hidden")) {
					$("#foot_panel").slideDown("slow");
				  } else {
					$("#foot_panel").slideUp("slow");
				  }
				});
			
			});
