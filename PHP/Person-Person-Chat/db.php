<?php
$username = "root"; // Db username
$password = "root"; // Db password
$hostname = "localhost"; // Db hostname
$database = "chat_module"; // Db name

//connection to the database
$dbhandle = mysql_connect($hostname, $username, $password);

//select a database to work with
$selected = mysql_select_db($database,$dbhandle);

error_reporting(0); //display error

session_start(); //session start
?>