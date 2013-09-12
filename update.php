<?php
	include('header.php');

//configure and connect to the database
@ $db = new mysqli('localhost','digit_decoder','schell', 'digit_decoder');

if(mysqli_connect_errno()){
	echo('Error: Could not connect to database.');
	exit;
}

$query = "SELECT message FROM `users` WHERE ((`users`.`username` = 'mrengy'))";
$result = $db->query($query);

//print out the result
if ($result){
	$row = $result->fetch_assoc();
	echo base64_decode($row['message']);
}
else{
	echo "Error reading from database.";
}

$db->close();

	include('footer.php');
?>