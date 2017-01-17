<?php 
/* Created By Acquaint softTech pvt. ltd.
 * This module created for person to person chat.
 *   */
include("db.php");

//form submit
if(isset($_POST['submit'])){
  $selquery = "select * from login"; //get login-user data from DB
  $result = mysql_query($selquery);
  while($row = mysql_fetch_assoc($result)){
   
    //match username and password
    if($_POST['uname'] == $row['username'] && $_POST['psw'] == $row['password']){
      //set session value
      $_SESSION['login'] = $row['id'];
      $_SESSION['name'] = $row['username'];
      $_SESSION['img'] = $row['profile'];

      header("Location:index.php"); //redirect on index page
    } //end if
  } //end while
} //end if
?>
<!DOCTYPE html>
<html>
<head>
  <title>Login Form</title>
      <!-- include css file  -->
     <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
<center>
<!-- Logo -->
  <a href="index.php"><img class="logo" alt="logo" src="images/login-logo.png"></a>
  
<!-- login form start -->
  <form action="" method="post" class="login">
    <h2>Login Form</h2>
    <div class="container">
      <label><b>Username</b></label> <!-- UserName -->
      <input type="text" placeholder="Enter Username" name="uname" required>

      <label><b>Password</b></label> <!-- Password -->
      <input type="password" placeholder="Enter Password" name="psw" required>
      <!-- login button -->
      <button type="submit" name="submit">Login</button>
    </div>
  </form>
<!-- login form End -->

</center>
</body>
</html>