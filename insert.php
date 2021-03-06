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

$db->close();


?>