<?php
# Logging in with Google accounts requires setting special identity, so this example shows how to do it.
require 'openid.php';
try {
    # Change 'localhost' to your domain name.
    $openid = new LightOpenID('localhost:8888');
    if(!$openid->mode) {
        if(isset($_GET['login'])) {
            $openid->identity = 'https://www.google.com/accounts/o8/id';
			$openid->required = array('contact/email');
            header('Location: ' . $openid->authUrl());
        }
?>
<form action="?login" method="post">
    <button>Login with Google</button>
</form>
<?php
    } elseif($openid->mode == 'cancel') {
        echo 'User has canceled authentication!';
    } else {
        echo 'User ' . ($openid->validate() ? $openid->identity . ' has ' : 'has not ') . 'logged in.';
		$userinfo = $openid->getAttributes();
		$email = $userinfo['contact/email'];
		echo '<br/>';
		echo $email;
		echo '<br/>';
		echo '<pre>';
		print_r($openid);
		echo '</pre>';
    }
} catch(ErrorException $e) {
    echo $e->getMessage();
}
