<?php

include("db.php");

//unser session value
$_SESSION['login'] = "";
$_SESSION['name'] = "";
$_SESSION['img'] = "";
unset($_SESSION['login']);
unset($_SESSION['name']);
unset($_SESSION['img']);

//redirect on login page
header("Location:login.php");
?>