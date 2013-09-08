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
  <link rel="stylesheet" href="stylesheets/app.css">

  <link rel="stylesheet" href="stylesheets/decoder.css">

  <script src="javascripts/modernizr.foundation.js"></script>

  <!-- IE Fix for HTML5 Tags -->
  <!--[if lt IE 9]>
    <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
  <![endif]-->

</head>
<body>

  <div class="row" id="title-row">
	<div class="twelve columns">
      <h1 id="title">Digit Decoder</h1>
	  <button name="save" type="submit" id="save">Save</button>
	</div>
  </div>
  <div class="row" id="message">
	<div class="twelve columns">
		<?php
		 	$punctuation = array('!', '?', '.');
			require_once('digits-to-letters.php');
			
			$filename = 'message.txt';
			$file = fopen($filename, 'r');
			$contents = fread($file, filesize($filename));
			fclose($file);
			
			//remove linebreak characters
			$contents = preg_replace( array('/\r/', '/\n/'), '', $contents);
			
			//reformat to normalize for punctuation
			$contents = str_replace('!', ', !,', $contents);
			$contents = str_replace('?', ', ?,', $contents);
			$contents = str_replace('.', ', .,', $contents);
			
			//create array with numbers in the message
			$numbers = explode(', ', $contents);
		?>
      	<?php
      		foreach ($numbers as $number){
		?>
				<div class="character<?php if( in_array( $number, $punctuation ) ){echo(' punctuation'); } ?>">
					<div class="number">
						<?php echo $number;?>
					</div>
					<div class="options">
						<?php if( ! in_array( $number, $punctuation ) ){ 
							echo $d2l[$number];
						} ?>
					</div>
					<div class="letter"></div>
				</div>
		<?php
			}
      	?>
	</div>
  </div>
  
  
  
  <!-- Included JS Files (Uncompressed) -->
  <!--
  
  <script src="javascripts/modernizr.foundation.js"></script>
  
  <script src="javascripts/jquery.js"></script>
  
  <script src="javascripts/jquery.foundation.mediaQueryToggle.js"></script>
  
  <script src="javascripts/jquery.foundation.navigation.js"></script>
  
  <script src="javascripts/jquery.foundation.buttons.js"></script>
  
  <script src="javascripts/jquery.foundation.tabs.js"></script>
  
  <script src="javascripts/jquery.foundation.forms.js"></script>
  
  <script src="javascripts/jquery.foundation.tooltips.js"></script>
  
  <script src="javascripts/jquery.foundation.accordion.js"></script>
  
  <script src="javascripts/jquery.placeholder.js"></script>
  
  <script src="javascripts/jquery.foundation.alerts.js"></script>
  
  -->
  
  <!-- Included JS Files (Compressed) -->
  <script src="javascripts/foundation.min.js"></script>
  
  <!-- Initialize JS Plugins -->
  <script src="javascripts/app.js"></script>

  <!-- decoder scripts -->
  <script src="javascripts/words.js"></script>
  <script src="javascripts/pickletters.js"></script>
</body>
</html>
