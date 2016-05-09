<?php
	//変数を生成 : 日本語
	$jpsubject = $_POST["inquiryListJp"];
	$jpcompany = $_POST["inquiryCompanyNameJp"];
	$jpname_jp = $_POST["inquiryNameJaJp"];
	$jpname_en = $_POST["inquiryNameEnJp"];
	$jpmail = $_POST["inquiryMailJp"];
	$jpphone = $_POST["inquiryPhoneJp"];
	$jpmessage = $_POST["inquiryTextJp"];

	//変数を生成 : 英語
	$ensubject = $_POST["inquiryListEn"];
	$encompany = $_POST["inquiryCompanyNameEn"];
	$enname_en = $_POST["inquiryNameEnEn"];
	$enmail = $_POST["inquiryMailEn"];
	$enphone = $_POST["inquiryPhoneEn"];
	$enmessage = $_POST["inquiryTextEn"];
?>

<!DOCTYPE HTML>
<html>
<head>
	<meta charset="utf-8">
	<meta property="og:title" content="beacon communications k.k."/>
	<meta property="og:description" content="ビーコンは、広告会社グループ世界第四位のピュブリシスグループの一員です。レオバーネット、電通のネットワークと連帯し、質の高いサービスを世界規模で提供します。"/>
	<meta property="og:image" content="http://www.beaconcom.jp/sns/logo.jpg"/>
	<meta property="og:url" content="http://www.beaconcom.jp/"/>
	<meta property="og:type" content="company"/>
	<meta property="og:site_name" content="beacon communications k.k."/>

	<meta name="viewport" content="width=device-width, target-densitydpi=device-dpi, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<meta http-equiv="Content-Style-Type" content="text/css">
	<meta http-equiv="Content-Script-Type" content="text/javascript">

	<meta name="keywords" content="beacon communications, beacon, ビーコンコミュニケーションズ, ビーコン, 広告代理店, 外資系広告代理店, ピュブリシス, レオ・バーネット, ダーシー, スターコム">
	<meta name="description" content="ビーコンは、広告会社グループ世界第四位のピュブリシスグループの一員です。レオバーネット、電通のネットワークと連帯し、質の高いサービスを世界規模で提供します。">
	<link rel="shortcut icon" href="../beacon-form/favicon/favicon.ico" type="image/vnd.microsoft.icon" />

	<title>beacon communications k.k.</title>

	<link href="css/reset.css" rel="stylesheet" type="text/css" />
	<link href="css/style.css" rel="stylesheet" type="text/css" />

	<script type="text/javascript" src="js/lib/jquery/jquery.min.js"></script>
	<script type="text/javascript" src="js/lib/jquery/jquery-ui.min.js"></script>
	<script type="text/javascript" src="js/lib/jquery/jquery.easing.1.3.js"></script>
	<script type="text/javascript" src="js/lib/jquery/jquery.flexslider-min.js"></script>
	<script type="text/javascript" src="js/lib/jquery/jquery.validate.min.js"></script>
	<script type="text/javascript" src="js/lib/jquery/jquery.cookie.js"></script>
	<script type="text/javascript" src="js/lib/jquery/plugin.js"></script>

</head>

<body id="top" class="bg_contents">

<div id="container" class="bg_contents_pc">

	<div id="wrapper" class="wrapper">

		<!-- ヘッダー -->
		<header>
			<h1>beacon communications k.k.</h1>
		</header>

		<div id="ja">

			<p class="small">ビーコン コミュニケーションズ株式会社</p>
			<h2>お問い合わせフォーム</h2>

			<hr class="hr_small">

			<section>
				<p class="pd_top-bottom_24 small">記入内容のご確認をお願いいたします。</p>
			</section>

			<section>
				<article>

					<form id="inauiryFormJp" method="post" action="complete.php">

						<input type="hidden" name="subject" value="<?php print_r ("$jpsubject");?>">
						<input type="hidden" name="company" value="<?php print_r ("$jpcompany");?>">
						<input type="hidden" name="name_jp" value="<?php print_r ("$jpname_jp");?>">
						<input type="hidden" name="name_en" value="<?php print_r ("$jpname_en");?>">
						<input type="hidden" name="mail" value="<?php print_r ("$jpmail");?>">
						<input type="hidden" name="phone" value="<?php print_r ("$jpphone");?>">
						<input type="hidden" name="message" value="<?php print_r ("$jpmessage");?>">

						<fieldset>

							<div class="box mb_24">

								<!-- フォーム本体 -->
								<dl id="form_layoutJp" class="form">
									<dt>お問い合わせ内容&nbsp;</dt>
									<dd class="colon">
										:&nbsp;
									</dd>
									<dd>
										<?php print_r ("$jpsubject");?>
									</dd>
									<dt>会社名&nbsp;</dt>
									<dd class="colon">
										:&nbsp;
									</dd>
									<dd>
										<?php print_r ("$jpcompany");?>
									</dd>
									<dt>お名前[日]&nbsp;</dt>
									<dd class="colon">
										:&nbsp;
									</dd>
									<dd>
										<?php print_r ("$jpname_jp");?>
									</dd>
									<dt>お名前[英]&nbsp;</dt>
									<dd class="colon">
										:&nbsp;
									</dd>
									<dd>
										<?php print_r ("$jpname_en");?>
									</dd>
									<dt>メールアドレス&nbsp;</dt>
									<dd class="colon">
										:&nbsp;
									</dd>
									<dd>
										<?php print_r ("$jpmail");?>
									</dd>
									<dt>電話番号&nbsp;</dt>
									<dd class="colon">
										:&nbsp;
									</dd>
									<dd>
										<?php print_r ("$jpphone");?>
									</dd>
									<dt>お問い合わせ内容&nbsp;</dt>
									<dd class="colon">
										:&nbsp;
									</dd>
									<dd>
										<?php print_r ("$jpmessage");?>
									</dd>
								</dl>
							</div>

							<hr class="hr_large">

							<div class="box mb_24 center">
								<input id="btn_formback_ja" type="button" value="戻る">
								<input id="btn_submit_ja" type="submit" value="送信">
							</div>

						</fieldset>
					</form>

				</article>
			</section>

		</div>


		<div id="en">

			<p class="small">beacon communications k.k.</p>
			<h2>Inquiry Form</h2>

			<hr class="hr_small">

			<section>
				<p class="pd_top-bottom_24 small">An asterisk (<span class="red">*</span>) indicates a required field.</p>
			</section>

			<section>
				<article>

					<form id="inauiryFormEn" method="post" action="complete.php">

						<input type="hidden" name="subject" value="<?php print_r ("$ensubject");?>">
						<input type="hidden" name="company" value="<?php print_r ("$encompany");?>">
						<input type="hidden" name="name_jp" value="">
						<input type="hidden" name="name_en" value="<?php print_r ("$enname_en");?>">
						<input type="hidden" name="mail" value="<?php print_r ("$enmail");?>">
						<input type="hidden" name="phone" value="<?php print_r ("$enphone");?>">
						<input type="hidden" name="message" value="<?php print_r ("$enmessage");?>">

						<fieldset>

							<div class="box mb_24">

								<!-- フォーム本体 -->
								<dl id="form_layoutEn" class="form">
									<dt>Subject&nbsp;</dt>
									<dd class="colon">
										:&nbsp;
									</dd>
									<dd>
										<?php print_r ("$ensubject");?>
									</dd>
									<dt>Company Name&nbsp;</dt>
									<dd class="colon">
										:&nbsp;
									</dd>
									<dd>
										<?php print_r ("$encompany");?>
									</dd>
									<dt>Name&nbsp;</dt>
									<dd class="colon">
										:&nbsp;
									</dd>
									<dd>
										<?php print_r ("$enname_en");?>
									</dd>
									<dt>E-mail&nbsp;</dt>
									<dd class="colon">
										:&nbsp;
									</dd>
									<dd>
										<?php print_r ("$enmail");?>
									</dd>
									<dt>Phone&nbsp;</dt>
									<dd class="colon">
										:&nbsp;
									</dd>
									<dd>
										<?php print_r ("$enphone");?>
									</dd>
									<dt>Message&nbsp;</dt>
									<dd class="colon">
										:&nbsp;
									</dd>
									<dd>
										<?php print_r ("$enmessage");?>
									</dd>
								</dl>
							</div>

							<hr class="hr_large">

							<div class="box mb_24 center">
								<input id="btn_formback_en" type="button" value="back">
								<input id="btn_submit_en" type="submit" value="submit">
							</div>

						</fieldset>
					</form>

				</article>
			</section>

		</div>

		<hr class="hr_large">

		<!-- フッター -->
		<footer>
			<!-- ページトップへの導線 -->
			<div class="box mb_30 center">
				<a href="#top">
					<img src="images/common/btn_top.png" class="btn_backtop">
				</a>
			</div>
		</footer>

	</div>

</div>

</body>

</html>
