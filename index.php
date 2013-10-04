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

	$query = "SELECT message FROM `users` WHERE ((`users`.`username` = '$username'))";
	$result = $db->query($query);

	//print out the result
	if ($result){
		$row = $result->fetch_assoc();
		if(strlen($row['message']) > 0){
			//only display the stored message if there is one
			echo base64_decode($row['message']);
		} else {
			//otherwise display the initial message
			include ('initial-message.php');
		}
	} else{
		echo "Error reading from database.";
	}
	$db->close();
} else{
	//if the user is not logged in, display the initial message
	include ('initial-message.php');
}
include('footer.php');
?>