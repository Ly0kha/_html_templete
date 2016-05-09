<?php

ini_set( 'display_errors', 1 );

mb_language("japanese");
mb_internal_encoding("UTF8");

//変数を生成
$subject = htmlspFc($_POST['subject']);
$company = htmlspFc($_POST['company']);
$name_jp = htmlspFc($_POST['name_jp']);
$name_en = htmlspFc($_POST['name_en']);
$mail = htmlspFc($_POST['mail']);
$phone = htmlspFc($_POST['phone']);
$message = htmlspFc($_POST['message']);
$subject = "";
$messe = "";

$subject = "【from beacon website】 お問い合わせ";
$messe .= "下記お問い合わせがありました。\r\n";
$messe .= "Subject  :  ". $subject."\r\n";
$messe .= "Company  :  ".$company."\r\n";
$messe .= "Name(JP)  :  ".$name_jp."\r\n";
$messe .= "Name(EN)  :  ".$name_en."\r\n";
$messe .= "Mail  :  ".$mail."\r\n";
$messe .= "Phone  :  ".$phone."\r\n";
$messe .= "Message  :  ".$message."\r\n";

// $Address = "";
//$Address = "beacon.privacy@beaconcom.co.jp";
$Address = "tomonori.oki@beaconcom.co.jp,yasutaka.ogura@beaconcom.co.jp,yoshiyuki.sasaki@beaconcom.co.jp,atsushi.kikushima@gmail.com";

$param   = '-f'.$Address;
$from    = mb_encode_mimeheader(mb_convert_encoding("beacon website system","JIS","UTF8")).$Address;
$success = mb_send_mail($Address,$subject,$messe,"From:".$from,$param);

if ($success) {
  require('complete.html');
}
else {
  echo "Error\n";
}

//htmlspecialcharsを関数にまとめる
function htmlspFc($str) {
  if(is_array($str)) {
    //配列なら
      return $str;
  }
  else {
    //htmlspecialchars
    return htmlspecialchars($str, ENT_QUOTES);
  }
}

?>
