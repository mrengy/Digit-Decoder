<?php
//start the session just for continuity
session_start();

//destroy the session
unset($_SESSION['email']);
session_destroy();
echo('logged out successfully');
?>