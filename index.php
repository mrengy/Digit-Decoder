<?php include ('header.php'); ?>
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
<?php include ('footer.php'); ?>