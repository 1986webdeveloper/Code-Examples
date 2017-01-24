<?php
include ("db.php");

$beforins = $_SESSION['datacount'];

//get total data after insert
$selcomment = "select comm.*,log.id as logid,log.username from comment comm LEFT JOIN login log ON comm.cmt_by = log.id ORDER BY comm.id ASC";
$resultcomment = mysqli_query($connection, $selcomment);
$afterins = mysqli_num_rows($resultcomment);

//check current date already inserted or not
$ij = 0;
$datenow = date('d-m-Y');
while ($rowdate = mysqli_fetch_assoc($resultcomment)) {
    $cmtdate = date("d-m-Y", strtotime($rowdate['cmt_date']));
    if ($datenow == $cmtdate) {
        $ij++;
    }
}
//print_R($_SESSION);die;
// select last inserted comment 
 $selQry = "select comm.*,log.id as logid,log.username,log.profile from comment comm LEFT JOIN login log ON comm.cmt_by = log.id ORDER BY comm.id ASC LIMIT " . $beforins . ", " . $afterins;

$result = mysqli_query($connection, $selQry);
$date_cnt = mysqli_num_rows($result);

if ($date_cnt > 0) {
    while ($rowcomm = mysqli_fetch_assoc($result)) {

        //not data repeted
        if (in_array($rowcomm['id'], $_SESSION['commid'])) {
            
        } else {
            $_SESSION['commid'][] .= $rowcomm['id']; //store comment id
            if ($afterins == 1 || $ij == 1) {
                ?>
                <div class="sepraor-date">
                    <span class="today-date">
                        <?php echo date("M d Y", strtotime($rowcomm['created_date'])); ?>
                    </span>
                </div>
                <?php
            }
            if ($rowcomm['logid'] == $_SESSION['login']) {
                $classname = 'login-user-chat';
            } else {
                $classname = 'other-user-chat';
            }
            ?>
            <!-- start comment -->
            <div class="<?php echo $classname; ?>"> 
                <?php if ($classname == 'other-user-chat') { ?>
                    <div class="login-profile">
                        <img width="100" height="100" src="<?php echo $rowcomm['profile']; ?>">
                    </div>
                <?php } ?>       
                <div class="chat-desc">
                    <span class="name-person"><?php echo $rowcomm['username']; ?></span>
                    <span class="description-chat">
                        <span class="des_40">        
                            <?php echo html_entity_decode($rowcomm['comment']); ?>
                        </span>
                    </span>    
                    <span class="time"><?php print date("h:i A", strtotime($rowcomm['created_date'])); ?></span>
                </div>
            </div>
            <!-- end comment -->
            <?php
        } //end if
    } //end while
} //end if
?>
