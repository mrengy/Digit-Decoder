<?php
	include('header.php');
	include('db-connect.php');
	
	$username = $_SESSION['email'];

$query = "SELECT message FROM `users` WHERE ((`users`.`username` = '$username'))";
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