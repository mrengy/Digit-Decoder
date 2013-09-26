<?php

//start the session and get the session variable
session_start();
$username = $_SESSION['email'];

//pull data from ajax call
$message = $_POST['message'];

//include db-connect (local) if on localhost
if (strpos($_SERVER['HTTP_HOST'],'localhost') !== false){
  include('db-connect.php');
} else{
  //otherwise include db-connect-sandbox.php for remote server
  include('db-connect-sandbox.php');	
}

$query = "INSERT INTO users (username, message) VALUES('$username','$message')
			ON DUPLICATE KEY UPDATE message = VALUES(message)";
$result = $db->query($query);

if ($result){
	echo $db->affected_rows." messages inserted into database.";
}
else{
	echo "Error writing to database.";
}

$db->close();


?>