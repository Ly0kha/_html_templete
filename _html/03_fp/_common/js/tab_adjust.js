// JavaScript Tab Adjust //

			$(function(){
	
				// Tabs
				$('#tabs').tabs({
					collapsible: true,
					fx: { height: 'toggle', opacity: 'toggle', duration: 300 }
				});	

				
				//hover states on the static widgets
				$('#dialog_link, ul#icons li').hover(
					function() { $(this).addClass('ui-state-hover'); }, 
					function() { $(this).removeClass('ui-state-hover'); }
				);
				
			});
			
			
