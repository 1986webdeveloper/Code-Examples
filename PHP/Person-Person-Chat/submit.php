<?php
/* Created By Acquaint softTech pvt. ltd.
 * This module created for person to person chat.
 *   */
include ("db.php");

$_REQUEST['des'] = mb_convert_encoding($_REQUEST['des'], 'UTF-8', mb_detect_encoding($_REQUEST['des']));

//get total record befor insert
$selcomm = "select comm.*,log.id as logid,log.username from comment comm LEFT JOIN login log ON comm.cmt_by = log.id ORDER BY comm.id ASC";
$resultcomm = mysql_query($selcomm);
$totalrecord = mysql_num_rows($resultcomm);
echo $_SESSION['datacount'] = $totalrecord;

// insert comment
 $insQry = "INSERT INTO comment(cmt_by,comment)
			VALUES('". $_SESSION['login'] ."','". trim(mysql_real_escape_string($_REQUEST['des'])) ."')";

$result = mysql_query($insQry);

?>