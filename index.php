<?php
include('header.php');

if (isset($_SESSION['email'])){
	//if the user is logged in, query the database for the stored message
	if (strpos($_SERVER['HTTP_HOST'],'localhost') !== false){
	  	//local version
		include_once('db-connect.php');
	} else{
	  	//remote version
	  	include_once('db-connect-sandbox.php');	
	}

	$username = $_SESSION['email'];

	$queryEmail = "SELECT message FROM `users` WHERE ((`users`.`username` = '$username'))";
	$resultEmail = $db->query($queryEmail);
	
	
	$lazyLoginId = $_SESSION['insert-id'];

	//print out the result
	if ($resultEmail){
		$rowEmail = $resultEmail->fetch_assoc();
		if(strlen($rowEmail['message']) > 0){
			//only display the stored message from the email address if there is one
			echo base64_decode($rowEmail['message']);
		} else if(isset($_SESSION['insert-id'])){
			//otherwise query for the message as it was stored from the lazy login
			//include ('initial-message.php');
			
			$queryLazyLogin = "SELECT message FROM `users` WHERE ((`users`.`ID` = '$lazyLoginId'))";
			$resultLazyLogin = $db->query($queryLazyLogin);
			
			if($resultLazyLogin){
				$rowLazyLogin = $resultLazyLogin->fetch_assoc();
				
				//echo("lazy login id is " . $lazyLoginId);
				
				//display the message from the lazy login
				echo base64_decode($rowLazyLogin['message']);
				
			} else {
				echo "Lazy login query: Error reading from database.";
			}
		} else{
			echo "session insert-id variable is not set.";
		}
	} else{
		echo "Email query: Error reading from database.";
	}
	
	//always delete the row just loaded using lazy login since user will save it under the email address now that user is authenticated
	$queryDeleteLazyLogin = "DELETE FROM `digit_decoder`.`users` WHERE `users`.`ID` = $lazyLoginId";
	$resultDeleteLazyLogin = $db->query($queryDeleteLazyLogin);
	
	if($resultDeleteLazyLogin){	
		//unset lazy login id session variable
		echo "successfully deleted lazy login row";
		unset($_SESSION['insert-id']);
		echo "session var insert-id unset";
	} else {
		echo "Lazy login delete query: error.";
	}
	
	$db->close();
} else{
	//if the user is not logged in, display the initial message
	include ('initial-message.php');
}
include('footer.php');
?>