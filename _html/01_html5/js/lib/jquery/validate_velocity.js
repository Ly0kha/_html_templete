	$('a[href*=#top]').on('click', function() {

		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') &&　location.hostname == this.hostname) {

			var target = $(this.hash);
			target = target.length && target;

			if (target.length) {
				var sclpos = 10;
				var scldurat = 500;
				var targetOffset = target.offset().top - sclpos;
				$('html,body')
					.animate({scrollTop: targetOffset}, {duration: scldurat, easing: 'easeOutExpo'});
			}
			return false;

		}

	});


		// エラーが出た箇所へ飛ぶ -for SP- //
		if (user_agent.indexOf('iPhone') > 0 || user_agent.indexOf('iPad') > 0 || user_agent.indexOf('iPod') > 0 || user_agent.indexOf('Android') > 0 || user_agent.indexOf('BlackBerry') > 0 || user_agent.indexOf('windows Phone') > 0 || user_agent.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(user_agent)) {

			if ($('input#inquiryListJp').val() === '') {

				var sclpos = 100;
				var inquiryListJp = $('input#inquiryListJp');
				var offset = inquiryListJp.offset();
					target = $(inquiryListJp);

				target.velocity('scroll', { duration: scldurat, easing: 'easeOutExpo' });
				return false;

			}

			else if ($('input#inquiryCompanyNameJp').val() === '') {

				var sclpos = 100;
				var inquiryCompanyNameJp = $('input#inquiryCompanyNameJp');
				var offset = inquiryCompanyNameJp.offset();
					target = $(inquiryCompanyNameJp);

				target.velocity('scroll', { duration: scldurat, easing: 'easeOutExpo' });
				return false;

			}

			else if ($('input#inquiryNameJaJp').val() === '') {

				var sclpos = 100;
				var inquiryNameJaJp = $('input#inquiryNameJaJp');
				var offset = inquiryNameJaJp.offset();
					target = $(inquiryNameJaJp);

				target.velocity('scroll', { duration: scldurat, easing: 'easeOutExpo' });
				return false;

			}

			else if ($('input#inquiryNameEnJp').val() === '') {

				var sclpos = 100;
				var inquiryNameEnJp = $('input#inquiryNameEnJp');
				var offset = inquiryNameEnJp.offset();
					target = $(inquiryNameEnJp);

				target.velocity('scroll', { duration: scldurat, easing: 'easeOutExpo' });
				return false;

			}

			else if ($('input#inquiryMailJp').val() === '') {

				var sclpos = 100;
				var inquiryMailJp = $('input#inquiryMailJp');
				var offset = inquiryMailJp.offset();
					target = $(inquiryMailJp);

				target.velocity('scroll', { duration: scldurat, easing: 'easeOutExpo' });
				return false;

			}

			else if ($('textarea#inquiryTextJp').val() === '') {

				var sclpos = 100;
				var inquiryTextJp = $('input#inquiryTextJp');
				var offset = inquiryTextJp.offset();
					target = $(inquiryTextJp);

				target.velocity('scroll', { duration: scldurat, easing: 'easeOutExpo' });
				return false;

			}

		}

	});




if ($('input#inquiryListJp').val() === '') {

	var inquiryListJp = $('input#inquiryListJp');
	var offset = inquiryListJp.offset();
	var sclpos = 20;
	var targetOffset = inquiryListJp.offset().top + sclpos;

	$('html,body').animate({ scrollTop: offset.top - 20}, { duration: scldurat, easing: 'easeOutExpo' });
	return false;

}

else if ($('input#inquiryCompanyNameJp').val() === '') {

	var inquiryCompanyNameJp = $('input#inquiryCompanyNameJp');
	var offset = inquiryCompanyNameJp.offset();

	$('html,body').animate({ scrollTop: offset.top - 20 }, { duration: scldurat, easing: 'easeOutExpo' });
	return false;

}

else if ($('input#inquiryNameJaJp').val() === '') {

	var inquiryNameJaJp = $('input#inquiryNameJaJp');
	var offset = inquiryNameJaJp.offset();

	$('html,body').animate({ scrollTop: offset.top - 20 }, { duration: scldurat, easing: 'easeOutExpo' });
	return false;

}

else if ($('input#inquiryNameEnJp').val() === '') {

	var inquiryNameEnJp = $('input#inquiryNameEnJp');
	var offset = inquiryNameEnJp.offset();

	$('html,body').animate({ scrollTop: offset.top - 20 }, { duration: scldurat, easing: 'easeOutExpo' });
	return false;

}

else if ($('input#inquiryMailJp').val() === '') {

	var inquiryMailJp = $('input#inquiryMailJp');
	var offset = inquiryMailJp.offset();

	$('html,body').animate({ scrollTop: offset.top - 20 }, { duration: scldurat, easing: 'easeOutExpo' });
	return false;

}

else if ($('textarea#inquiryTextJp').val() === '') {

	var inquiryTextJp = $('input#inquiryTextJp');
	var offset = inquiryTextJp.offset();

	$('html,body').animate({ scrollTop: offset.top - 20 }, { duration: scldurat, easing: 'easeOutExpo' });
	return false;

}