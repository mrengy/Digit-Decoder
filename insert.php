<?php

//start the session and get the session variable
session_start();
$username = $_SESSION['email'];

//pull data from ajax call
$message = $_POST['message'];

if (strpos($_SERVER['HTTP_HOST'],'localhost') !== false){
  	//local version
	include_once('db-connect.php');
} else{
  	//remote version
  	include_once('db-connect-sandbox.php');	
}

//prepared statement
$stmt = $db->prepare("INSERT INTO users (username, message) VALUES(?,?)
			ON DUPLICATE KEY UPDATE message = VALUES(message)");
$stmt->bind_param('ss',$username, $message);
$stmt->execute();
$stmt->close();
/*
$query = "INSERT INTO users (username, message) VALUES('$username','$message')
			ON DUPLICATE KEY UPDATE message = VALUES(message)";
$result = $db->query($query);

if ($result){
	echo $db->affected_rows." messages inserted into database.";
}
else{
	echo "Error writing to database.";
}
*/

$db->close();


?>