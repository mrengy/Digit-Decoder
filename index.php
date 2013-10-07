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

	//print out the result
	if ($resultEmail){
		$rowEmail = $resultEmail->fetch_assoc();
		if(strlen($rowEmail['message']) > 0){
			//only display the stored message from the email address if there is one
			echo base64_decode($rowEmail['message']);
		} else {
			//otherwise display the message as it was stored from the lazy login
			//include ('initial-message.php');
			$lazyLoginId = $_SESSION['insert-id'];
			
			$queryLazyLogin = "SELECT message FROM `users` WHERE ((`users`.`ID` = '$lazyLoginId'))";
			$resultLazyLogin = $db->query($queryLazyLogin);
			
			if($resultLazyLogin){
				$rowLazyLogin = $resultLazyLogin->fetch_assoc();
				echo base64_decode($rowLazyLogin['message']);
			} else {
				echo "Lazy login query: Error reading from database.";
			}
		}
	} else{
		echo "Email query: Error reading from database.";
	}
	$db->close();
} else{
	//if the user is not logged in, display the initial message
	include ('initial-message.php');
}
include('footer.php');
?>