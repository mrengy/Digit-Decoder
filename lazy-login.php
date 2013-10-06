<?php

//start the session and get the session variable
session_start();

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
$stmt = $db->prepare("INSERT INTO users (message) VALUES(?)");
$stmt->bind_param('s', $message);
$stmt->execute();
$stmt->close();

$db->close();


?>