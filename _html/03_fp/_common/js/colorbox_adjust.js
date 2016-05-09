// JavaScript Lightbox Adjust //


         $(function(){
            $.fn.colorbox.settings.bgOpacity = "0.5";
            $(".photo").colorbox();
            $("#ajax").colorbox({contentWidth:"400px", contentHeight:"200px"});
            $("#flash").colorbox({contentAjax:"demo/flash.html"});
            $(".iframe").colorbox({iframe:true, width:"80%", height:"80%"});
            $("#inline").colorbox({contentWidth:"500px", contentInline:"#inline-content"});
         });
