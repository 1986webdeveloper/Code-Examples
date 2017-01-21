<?php defined('BASEPATH') OR exit('No direct script access allowed'); ?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Codeigniter- Stripe Payment</title>
        <link rel="stylesheet" href="<?= base_url('assets/css/style.css') ?>">
    </head>
    <body>
        <div class="container">
            <div class='web'>
                <?php
                foreach ($details as $row) {
                    $amount = $row->price * 100;
                    ?>
                    <form action="<?php echo site_url('book/checkout/'); ?>" method="POST">
                        <h1>Order details</h1>
                        <div class="detail-body">
                            <span class="hotel-name">Hotel Name: <?php echo $row->hotel_name; ?> 
                                <input type="hidden" value="<?php echo $row->hotel_name; ?>" name="name"/>
                                <input type="hidden" value="<?php echo $row->id; ?>" name="booking_id"/>
                            </span>
                            <span class="hotel-price">Price: $<?php echo $row->price; ?>
                                <input type="hidden" value=" <?php echo $row->price; ?>" name="price"/></span>
                        </div>
                        <h1>Payment</h1>
                        <div class="payment-body">
                            <p><label>First Name:</label> <input type="text" placeholder="Enter First Name" value="" name="fname" required /></p>
                            <p><label>Last Name:</label> <input type="text" placeholder="Enter Last Name" value="" name="lname" required/></p>
                            <p><label>Phone No:</label> <input type="text" maxlength="10" onkeypress='return event.charCode >= 48 && event.charCode <= 57' placeholder="Enter Phone No" value="" name="pno" required/></p>
                            <p><label>Email:</label> <input type="email" placeholder="Enter email" value="" name="email" required/></p>
                            <p><label>Address:</label> <textarea name="address" placeholder="Enter Address" required ></textarea>
                                <button class="btn-submit" type="submit">Submit</button>
                        </div>
                    </form>
                    <?php
                }
                ?>
            </div>
        </div>
    </body>
</html>