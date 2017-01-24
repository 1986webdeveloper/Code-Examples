<?php
include("db.php");
$errormsg = "";
//form submit
if (isset($_POST['submit'])) {
    //select login-user data from DB
     $selquery = "select * from login WHERE username ='" .mysqli_real_escape_string($connection, $_POST['uname']) . "' AND password = '" . md5($_POST['psw']) . "'";
    $result = mysqli_query($connection, $selquery);
    $row = mysqli_fetch_assoc($result);
    $count = mysqli_num_rows($result);
    //set session value
    if ($count != 0) {
        $_SESSION['login'] = $row['id'];
        $_SESSION['name'] = $row['username'];
        $_SESSION['img'] = $row['profile'];
        header("Location:index.php"); //redirect on index page
    } else {
        $errormsg = "Wrong Username Or Password";
    }
}
//end form submit
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
        <?php if (isset($errormsg) && $errormsg != "") { ?>
            <h3><font color="red" ><?php echo $errormsg; ?></font></h3>
        <?php } ?>
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