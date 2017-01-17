<?php
/* Created By Acquaint softTech pvt. ltd.
 * This module created for person to person chat.
 *   */
include ("db.php");
//total record
//get total record befor insert
$selcomm = "select comm.*,log.id as logid,log.username from comment comm LEFT JOIN login log ON comm.cmt_by = log.id ORDER BY comm.id ASC";
$resultcomm = mysql_query($selcomm);
 $totalrecord = mysql_num_rows($resultcomm);
 $_SESSION['datacount1'] = $totalrecord;

?>