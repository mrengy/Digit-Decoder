<?php
include('header.php');

//include db-connect (local) if on localhost
if (strpos($_SERVER['HTTP_HOST'],'localhost') !== false){
  include('db-connect.php');
} else{
  //otherwise include db-connect-sandbox.php for remote server
  include('db-connect-sandbox.php');	
}

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