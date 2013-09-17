<?php
	include('header.php');
	include('db-connect.php');

$query = "SELECT message FROM `users` WHERE ((`users`.`username` = 'minitab2002@yahoo.com'))";
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