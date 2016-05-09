<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><head>

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>Title -Site Title Here-</title>

<meta name="Keywords" content="Keywords" />
<meta name="Description" content="Description" />

<link rel="stylesheet" type="text/css" href="../../../../../_template/_template02_gallery/_module/form/_common/css/import.css" media="all" />
<link rel="stylesheet" type="text/css" href="../../../../../_template/_template02_gallery/_module/form/_common/css/colorbox.css" media="screen" />
<link rel="stylesheet" type="text/css" href="../../../../../_template/_template02_gallery/_module/form/_common/css/contents.css" media="all" />
<link rel="stylesheet" type="text/css" href="../../../../../_template/_template02_gallery/_module/form/_common/css/print.css" media="print" />

<script type="text/javascript" src="../../../../../_template/_template02_gallery/_module/form/_common/js/jquery.plugin.js"></script>

<script type="text/javascript" id="sourcecode">
	$(function()
	{
		$('.scroll-pane').jScrollPane();
	});
</script>


<!--[if IE 6 ]>
<link rel="stylesheet" type="text/css" href="_common/css/ie6.css" />
<![endif]-->

<!--[if IE 7 ]>
<link rel="stylesheet" type="text/css" href="_common/css/ie7.css" />
<![endif]-->

</head>

<body id="toTop">

<div id="wrapper">

<div id="contents-form">

<form method="post" name="sfm-form" id="sfm-form" action="<?php echo $sfm_script; ?>">
    
    <h3>Contact Us</h3>
    
    <ul class="form">
        <li>   
            <label>氏名</label>
            <input type="text" name="name_s" id="name" />
        </li>
        <li>   
            <label>メールアドレス</label>
            <input type="text" name="email_s" id="email" />
        </li>
        <li>   
            <label>メッセージ</label>
            <textarea name="message" cols="50" rows="5" id="message"></textarea>
        </li>
        <li>   
            <label>送信内容確認</label>
            <input type="checkbox" name="autoReply" value="受け取ります" />
            <p>確認メールを受け取る場合はチェックして下さい</p>
        </li>
        <li>   
            <p class="type-red">赤い印の入った項目は必須入力となります。</p>
            <input type="hidden" name="mailToNum" value="0" />
            <input type="hidden" name="mode" value="CONFIRM" />
            <input type="submit" name="submit" value="確 認" />
            <input type="reset" name="reset" value="リセット" />
        </li>
    </ul>
</form>

<?php $this->crCheck(); ?>


</div>

</div>
    
</body>
</html>