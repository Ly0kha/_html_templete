// JavaScript Document

(function() {
    var jsfiles = [
					 'jquery-1.5.js'
					,'blank_adjust.js'
					,'fadein_adjust.js'
					,'menu_adjust.js'
					,'jquery.colorbox.js'
					,'colorbox_adjust.js'
					,'jquery.slider.js'
					,'slider_adjust.js'
					,'topscroll_adjust.js'
					,'jquery.gradient.js'
					,'gradient_adjust.js'
					,'jquary.tab.js'
					,'tab_adjust.js'
					,'jquery.cookie.js'
					,'cookie_adjust.js'
					,'rollover_adjust.js'
					,'smartrollover_adjust.js'
					,'jquery-ui.js'
					,'jquery.jscrollpane.js'
					,'jquery.mousewheel.js'
					,'mwheelIntent.js'
					,'jquery.booklet.js'
					,'booklet_adjust.js'
					,'jquery.easing.js'
					,'jquery-ui-1.8.9.custom.min.js'
					,'jquery.footer.js'
					,'footer-tab_adjust.js'
					,'fixed.js'
					,'fixed_adjust.js'
				   ];  // ロードされるスクリプト（このファイルからの相対パス指定）
    
    /****************************** DO NOT EDIT BELOW *****************************/
    function lastof(es)    { return es[es.length - 1]; }
    function dirname(path) { return path.substring(0, path.lastIndexOf('/')); }
    var prefix = dirname(lastof(document.getElementsByTagName('script')).src);
    for(var i = 0; i < jsfiles.length; i++) {
        document.write('<script type="text/javascript" src="../../../../../_template/_template02_gallery/_common/js/' + prefix + '/' + jsfiles[i] + '"></script>');
    }
}).call(this);
