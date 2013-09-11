<?php
//pull data from ajax call
$id = $_POST['ID'];
$username = $_POST['username'];
$message = $_POST['message'];

//configure and connect to the database
@ $db = new mysqli('localhost','digit_decoder','schell', 'digit_decoder');

if(mysqli_connect_errno()){
	echo('Error: Could not connect to database.');
	exit;
}

$query = "INSERT INTO users (ID, username, message) VALUES($id, '$username','$message')
			ON DUPLICATE KEY UPDATE username = values(username), message = values(message)";
$result = $db->query($query);

if ($result){
	echo $db->affected_rows." message inserted into database.";
}
else{
	echo "Error writing to database.";
}

$db->close();


?>