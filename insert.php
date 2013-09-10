<?php
//configure and connect to the database
$con = mysql_connect('localhost','digit_decoder','schell', 'digit_decoder');
if(!$con){
	die('Error: Could not connect to database. '. mysql_error());
}

mysql_select_db('users', $con);
//pull data from ajax call
$id = $_POST['ID'];
$username = $_POST['username'];
$message = $_POST['message'];

$query = mysql_query("INSERT INTO users(ID,username,message) VALUES('$id','$username','$message')");
if($query){
	echo("data for $username inserted successfully");
}
else{
	echo("Error posting data");
}



?>