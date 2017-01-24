<?php

include ("db.php");

//get total record befor insert
 $selcomm = "select comm.*,log.id as logid,log.username from comment comm LEFT JOIN login log ON comm.cmt_by = log.id ORDER BY comm.id ASC";
$resultcomm = mysqli_query($connection, $selcomm);
$totalrecord = mysqli_num_rows($resultcomm);
echo $_SESSION['datacount'] = $totalrecord;

// insert comment
$insQry = "INSERT INTO comment(cmt_by,comment) VALUES('" . mysqli_real_escape_string($connection,$_SESSION['login']) . "','" . mysqli_real_escape_string($connection,trim($_REQUEST['des'])) . "')";

$result = mysqli_query($connection, $insQry);
?>