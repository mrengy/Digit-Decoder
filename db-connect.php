<?php
//configure and connect to the database
@ $db = new mysqli('localhost','digit_decoder','schell', 'digit_decoder');

if(mysqli_connect_errno()){
	echo('Error: Could not connect to database.');
	exit;
}
?>