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
            <?php echo $sfm_html->name; ?>
        </li>
        <li>   
            <label>メールアドレス</label>
            <?php echo $sfm_html->email; ?>
        </li>
        <li>   
            <label>メッセージ</label>
            <?php echo $sfm_html->message; ?>
        </li>
        <li>   
            <label>送信内容確認</label>
            <?php echo $sfm_html->autoReply; ?>
            <p>確認メールを受け取る場合はチェックして下さい</p>
        </li>
        <li>   
            <p class="type-red">赤い印の入った項目は必須入力となります。</p>
            <?php echo $sfm_submit; ?>
        </li>
    </ul>
</form>

<?php $this->crCheck(); ?>


</div>

</div>
    
</body>
</html>