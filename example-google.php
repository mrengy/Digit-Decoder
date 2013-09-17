<?php
# Logging in with Google accounts requires setting special identity, so this example shows how to do it.
require_once 'openid.php';

//start the session
session_start();

try {
    # Change 'localhost' to your domain name.
    $openid_google = new LightOpenID('localhost:8888');
    if(!$openid_google->mode) {
        if(isset($_GET['login'])) {
            $openid_google->identity = 'https://www.google.com/accounts/o8/id';
			$openid_google->required = array('contact/email');
            header('Location: ' . $openid_google->authUrl());
        }
?>
<!--
<form action="?login" method="post">
    <button>Login with Google</button>
</form>
-->
<?php
    } elseif($openid_google->mode == 'cancel') {
        echo 'User has canceled authentication!';
    } else {
		echo 'User ' . ($openid_google->validate() ? $openid_google->identity . ' has ' : 'has not ') . 'logged in.';
		$userinfo = $openid_google->getAttributes();
		$email = $userinfo['contact/email'];
		echo '<br/>';
		echo $email;
		
		//store username variable across pages
		$_SESSION['email'] = $email;
    }
} catch(ErrorException $e) {
    echo $e->getMessage();
}
