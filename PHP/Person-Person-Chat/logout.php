<?php
/* Created By Acquaint softTech pvt. ltd.
 * This module created for person to person chat.
 *   */
include("db.php");

//unser session value
unset($_SESSION['login']);
unset($_SESSION['name']);
unset($_SESSION['img']);

//redirect on login page
header("Location:login.php");
?>