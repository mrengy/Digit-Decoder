<?php
//pull data from ajax call
$username = $_POST['username'];
$message = $_POST['message'];

include('db-connect.php');

$query = "INSERT INTO users (username, message) VALUES('$username','$message')
			ON DUPLICATE KEY UPDATE message = values(message)";
$result = $db->query($query);

if ($result){
	echo $db->affected_rows." message inserted into database.";
}
else{
	echo "Error writing to database.";
}

$db->close();


?>