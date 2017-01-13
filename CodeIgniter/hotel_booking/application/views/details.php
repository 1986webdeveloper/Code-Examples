<?php defined('BASEPATH') OR exit('No direct script access allowed');
/*
 * Author : Acquaint SoftTech Pvt. Ltd.
 * Author URL: http://acquaintsoft.com/  
 */
?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Codeigniter- Payment - Aquaintsoft Tech</title>
	<link rel="stylesheet" href="<?= base_url('assets/css/style.css') ?>">
</head>
<body>
<div class="container">
<div class='web'>
	<?php
    foreach ($details as $row) {
    	$amount = $row->price *100;
 ?>

	
	<form action="<?php echo site_url('book/checkout_details/');?>" method="POST">
		<h1>Order details</h1>
		<div class="detail-body">
			<span class="hotel-name">Hotel Name: <?php echo $row->hotel_name;?> 
			<input type="hidden" value="<?php echo $row->hotel_name; ?>" name="name" readonly/></span>
			<span class="hotel-price">Price: <?php echo $row->price;?>$
			<input type="hidden" value=" <?php echo $row->price; ?>" name="price" readonly/></span>
		</div>
		<h1>Payment</h1>
		<div class="payment-body">
			<p><label>First Name:</label> <span class="val"> <?php echo $row->fname; ?> </span> <input type="hidden" value="<?php echo $row->fname; ?>" name="fname" readonly /></p>
			<p><label>Last Name:</label> <span class="val"><?php echo $row->lname; ?></span> <input type="hidden" value="<?php echo $row->lname; ?>" name="lname" readonly/></p>
			<p><label>Phone No:</label> <span class="val"><?php echo $row->p_no; ?></span> <input type="hidden" value="<?php echo $row->p_no; ?>" name="pno" readonly/></p>
			<p><label>Email:</label> <span class="val"><?php echo $row->email;?> </span><input id="hidden" type="hidden" value="<?php echo $row->email;?>" name="email" readonly/></p>
			<p><label>Address:</label><span class="val"><?php echo $row->address; ?></span> </p>
			<script src="https://checkout.stripe.com/checkout.js" 
			class="stripe-button"
			data-key="YOUR_STRIPE_PUBLIC_API_KEY" 
			data-image="YOUR_LOGO" 
			data-name="YOUR_STORE_NAME" 
			data-description="YOUR_ITEM_DESCRIPTION"
			data-amount="<?php echo $amount; ?>" />
			</script>
		</div>
	
		
	</form>
	<?php
	   }
	
	?>
	
</div>
</div>
</body>
</html>