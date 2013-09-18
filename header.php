<?php include ('example-google.php'); ?>
<?php
/*
// hardcoded version for offline debugging
session_start();
$_SESSION['email'] = 'minitab@yahoo.com';
*/

//handling logout
if(isset($_GET['logout'])){
	unset($_SESSION['email']);
	session_destroy();
}

?>
<!DOCTYPE html>

<!-- paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ -->
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
  <meta charset="utf-8" />

  <!-- Set the viewport width to device width for mobile -->
  <meta name="viewport" content="width=device-width" />

  <title>Digit Decoder</title>
  
  <!-- Included CSS Files (Uncompressed) -->
  <!--
  <link rel="stylesheet" href="stylesheets/foundation.css">
  -->
  
  <!-- Included CSS Files (Compressed) -->
  <link rel="stylesheet" href="stylesheets/foundation.min.css">

  <!-- my CSS for the digit decoder -->
  <link rel="stylesheet" href="stylesheets/decoder.css">

  <script src="javascripts/modernizr.foundation.js"></script>

  <!-- IE Fix for HTML5 Tags -->
  <!--[if lt IE 9]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->

</head>
<body>

  <div class="row" id="title-row">
	<div class="nine columns">
      <h1 id="title">Digit Decoder</h1>
	</div>
	<div id="global-controls" class="three columns">
	  <!--<a href="#" data-reveal-id="loginModal">Log in</a>-->
	  <?php
	  	if (isset($_SESSION['email'])){
	  ?>
		  <div id="logged-in-as">
			<?php echo($_SESSION['email']); ?>
			<form action="?logout" method="post"> 
				<button id="logout">Log out</button>
			</form>
		  </div>
		  <a href="update.php" id="load" class="button">Load</a>
		  <a id="save" class="button">Save</a>
	  <?php
  		} else{
	  ?>
	  	<form action="?login" method="post">
		    <button>Login with Google</button>
		</form>
		
	  <?php
  		}
	  ?>
	</div>
  </div>
  <div class="row" id="message">
