		function headerSelect(i) {

			var htmlArr = i ;

			switch (htmlArr) {

				case 1 :

					return $.ajax ({

						type: 'GET',
						url: relativeFirstDir + 'header.html',

					});
					break;

				case 2 :

					return $.ajax ({

						type: 'GET',
						url: relativeSecondDir + 'header.html',

					});
					break;

				case 3 :

					return $.ajax ({

						type: 'GET',
						url: relativeThirdDir + 'header.html',

					});
					break;

				default :

					break;

			}

		}


		if ($('header#navi-1st').length) {

			headerSelect(1).done(function(result) {
				$('header#navi-1st').append(result);
			});

		}

		else if ($('header#navi-2nd').length) {

			headerSelect(2).done(function(result) {
				$('header#navi-2nd').append(result);
			});

		}

		else if ($('header#navi-3rd').length) {

			headerSelect(3).done(function(result) {
				$('header#navi-3rd').append(result);
			});

		}

		else {
			headerSelect();
		}




		$.ajax ({
			dataType: 'json'
			type: 'GET',
			url: rootDir + 'ajax/kerning.json',
			}).done(function(json){
				json = json.replace(/\{\$root\}/g, rootDir);
		});


		// AJAXが入っているディレクトリの指定 //
		var kerningJsonFirstDir = ('ajax/kerning.json');
		var kerningJsonSecondDir = ('../ajax/kerning.json');
		var kerningJsonThirdDir = ('../../ajax/kerning.json');


		function kerningDir(i) {

			var kerningArr = i ;

			switch (kerningArr) {

				case 1 :

					return $.getJSON(kerningJsonFirstDir, function(data) {

						/* 中にテキストが入るタグの判定 */
						var tag = $('p, h1, h2, h3, h4, h5, h6, .carousel-caption, dl.news dt, dl.news dd, dl#column dt, dl#column dd, dl#form-layout-jp dt, dl#form-layout-en dt, ul.list li, ol.list li, ul.suggest-menu li, ul.form-accept li, th, td, a, address')

						$(tag).kerning({
							'data': data
						});

					});
					break;

				case 2 :

					return $.getJSON(kerningJsonSecondDir, function(data) {

						/* 中にテキストが入るタグの判定 */
						var tag = $('p, h1, h2, h3, h4, h5, h6, .carousel-caption, dl.news dt, dl.news dd, dl#column dt, dl#column dd, dl#form-layout-jp dt, dl#form-layout-en dt, ul.list li, ol.list li, ul.suggest-menu li, ul.form-accept li, th, td, a, address')

						$(tag).kerning({
							'data': data
						});

					});
					break;

				case 3 :

					return $.getJSON(kerningJsonThirdDir, function(data) {

						/* 中にテキストが入るタグの判定 */
						var tag = $('p, h1, h2, h3, h4, h5, h6, .carousel-caption, dl.news dt, dl.news dd, dl#column dt, dl#column dd, dl#form-layout-jp dt, dl#form-layout-en dt, ul.list li, ol.list li, ul.suggest-menu li, ul.form-accept li, th, td, a, address')

						$(tag).kerning({
							'data': data
						});

					});
					break;

				default :

					return $.getJSON(kerningJsonFirstDir, function(data) {

						/* 中にテキストが入るタグの判定 */
						var tag = $('p, h1, h2, h3, h4, h5, h6, .carousel-caption, dl.news dt, dl.news dd, dl#column dt, dl#column dd, dl#form-layout-jp dt, dl#form-layout-en dt, ul.list li, ol.list li, ul.suggest-menu li, ul.form-accept li, th, td, a, address')

						$(tag).kerning({
							'data': data
						});

					});
					break;

			}

		}


		if ($('header#navi-1st-none').length || $('header#navi-1st').length) {
			kerningDir(1);
		}

		else if ($('header#navi-2nd').length) {
			kerningDir(2);
		}

		else if ($('header#navi-3rd').length) {
			kerningDir(3);
		}

		else {
			kerningDir();
		}


			function btnHoverSelect(rootDir) {

				return $.ajax ({

					type: 'GET',
					url: rootDir + 'include/btn.html',
					}).done(function(btn){
						btn = btn.replace(/\{\$root\}/g, rootDir);
						$('#hover').append(btn);
				});

			}


			if (user_agent.indexOf('iPhone') > 0 || user_agent.indexOf('iPad') > 0 || user_agent.indexOf('iPod') > 0 || user_agent.indexOf('Android') > 0 || user_agent.indexOf('BlackBerry') > 0 || user_agent.indexOf('windows Phone') > 0 || user_agent.indexOf('NOKIA') > 0 || /Mobile.*Firefox/.test(user_agent) ) {
				btnHoverSelect();
			}

			else if ($('header#navi-1st').length) {
				btnHoverSelect('./');
			}

			else if ($('header#navi-2nd').length) {
				btnHoverSelect('../');
			}

			else if ($('header#navi-3rd').length) {
				btnHoverSelect('../../');
			}

			else {
				btnHoverSelect();
			}