<?php
//pull data from ajax call
$id = $_POST['ID'];
$username = $_POST['username'];
$message = $_POST['message'];

//configure and connect to the database
@ $con = new mysqli('localhost','digit_decoder','schell', 'digit_decoder');

if(mysqli_connect_errno()){
	echo('Error: Could not connect to database.');
	exit;
}

$query = "INSERT INTO users(username,message) VALUES('$username','$message')";
$con->query($query);

$con->close();


?>