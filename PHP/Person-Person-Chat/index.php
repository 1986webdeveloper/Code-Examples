<?php 
/* Created By Acquaint softTech pvt. ltd.
 * This module created for person to person chat.
 *   */
include ("db.php");

//check user login or not
if(!isset($_SESSION['login'])){
	header("Location:login.php"); // redirect on login page
}

//get user name for autocomplete
$empData = array();
  $selQry = "select * from login ORDER BY username ASC ";
    $result = mysql_query($selQry);
    $i = 0;
    while ($row = mysql_fetch_assoc($result)) {
      $name = $row['username'];


      $empData[$i]['name'] = "@".strtok($name, ' ');
      
      $i++;
    } //end while
$Hidedayarray =  json_encode($empData); // json data
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Chat Module</title>
  <meta charset="utf-8">
   <!-- include css & js file  -->
  <link rel="stylesheet" type="text/css" href="css/style.css">
  <script src="tinymce/js/tinymce/tinymce.min.js"></script>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>
	<input type="hidden" id="empdata" name="empdata[]" value='<?php echo $Hidedayarray; ?>'>
	<div  id="comment-display">
	    <div class="profile">
		    <div class="profile-section">
	          <div class="user dropdown">
	            <div class="user-img dropdown-toggle" data-toggle="dropdown">
	            <strong><?php echo $_SESSION['name']; ?></strong>
	              <a href="#" title="User">
	                <img src="<?php echo $_SESSION['img']; ?>" alt="User">
	                <i aria-hidden="true" class="fa fa-angle-down"></i>
	              </a>
	            </div>
	            <ul class="dropdown-menu" style="">
	              <li><a href="logout.php"><i aria-hidden="true" class="fa fa-sign-out"></i>Logout</a></li>                 
	            </ul>
	          </div>
	        </div>
	    </div>
	    <div class="view-comment-section allcomment">
	    <?php
	    $a=array();
	    //get comment data
	    $selcomm = "select comm.*,log.id as logid,log.username,log.profile from comment comm LEFT JOIN login log ON comm.cmt_by = log.id ORDER BY comm.id ASC";
	    $resultcomm = mysql_query($selcomm);
	    while($rowcomm = mysql_fetch_assoc($resultcomm)){

	    	//display date only one time
	    	if (in_array(date("d-m-Y", strtotime($rowcomm['created_date'])), $a))
		    {
		    }else{
	    ?>
	    	<!--Date div -->
	    	<div class="sepraor-date">
	        	<span class="today-date"><?php echo date("M d Y", strtotime($rowcomm['created_date']));?></span>
	      	</div>
	      	<!-- Date div end  -->
	      	<?php  } 
	      	array_push($a,date("d-m-Y", strtotime($rowcomm['created_date']))); //push date in array

	      	//comment start  
	      	if($rowcomm['logid'] == $_SESSION['login']){
	      		$classname = 'login-user-chat';
	      	}else{
	      		$classname = 'other-user-chat';
	      	}
                    ?>
	      	<div class= <?php echo $classname; ?> > 
	      		<?php if($classname =='other-user-chat'){ ?>
		      		<div class="login-profile">
			      		<img width="100" height="100" src="<?php echo $rowcomm['profile']; ?>">
			      	</div>
	      		<?php } ?>
	      		<div class="chat-desc">
		        	<span class="name-person"><?php echo $rowcomm['username']; ?></span>
		        	<span class="description-chat">
		        		<span class="des_40">        
		        			<?php echo html_entity_decode($rowcomm['comment']);  ?>
						</span>
					</span>   
		      		<span class="time"><?php  print date("h:i A", strtotime($rowcomm['created_date'])); ?></span>
	            </div>
	      	</div> <!-- end comment -->
	<?php } //end while ?>
	    </div>
	</div>
	<!-- start textEditor -->
	<div class="view-comment-section">
   
	    <form class="form-horizontal custom-form" method="post" id="frm" name="frm" enctype="multipart/form-data">
	     
	      <?php /* Comments */ ?>
	      	<div class="form-group">
	        	<label class="control-label col-sm-2" for="assignhours">Comment<span class="mandatory">*</span></label>
	        	<div class="col-sm-10">
	          		<textarea id="txtMessage" name="txtMessage" class="form-control vert" placeholder="Notes"><?php //echo $txtMessage; ?></textarea>
	        		<div id="errMessage" ></div>
	        	</div>
	      	</div>
	      	<input type="hidden" id="id" name="id" value="<?php echo $_GET['id']; ?>">
	      	<div class="form-group">
		      	<div class="col-sm-2">&nbsp;</div>
		      	<div class="col-sm-10">
		          	<input type="submit" class="btn btn-success custom-success" name="submit" value="submit">
		            
		      	</div>
	      	</div>
	    </form>
  	</div> <!-- End textEditor -->
</body>
</html>
 <!-- include js file  -->
<script type="text/javascript" src="js/chat.js"> </script>
