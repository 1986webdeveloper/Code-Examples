
<?php

$username = "root"; // DataBase username
$password = "root"; // DataBase password
$hostname = "localhost"; // DataBase hostname
$database = "chat_module"; // DataBase name
//connection to the database
$connection = mysqli_connect($hostname, $username, $password);

//select a database
$selected = mysqli_select_db($connection, $database);

error_reporting(0); //display error

session_start(); //session start
?>