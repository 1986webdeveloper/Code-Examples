<?php
defined('BASEPATH') OR exit('No direct script access allowed');
// Start:-When Stripe payment is done successfully then success popup is displayed.
if (isset($_REQUEST['type'])) {
    ?>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap-theme.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
    <script type="text/javascript">
        $(document).ready(function() {
            $("#myModal").modal('show');
            setTimeout(function() {
                $('#Modal').modal('hide')
            }, 4000);

        });
        setTimeout(function() {
            $('#myModal').modal('toggle');
        }, 3000);

    </script>
    <div id="myModal" class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h4 class="modal-title">Subscribe our Newsletter</h4>
                </div>
                <div class="modal-body">
                    <p>Thank you payment at our website. Our admin staff will look out at your order and will revert back you.</p>
                </div>
            </div>
        </div>
    </div>
    <?php
}
// End:-When Stripe payment is done successfully then success popup is displayed.
$this->load->helper('url');
?>
<title>Codeigniter - Hotel Booking </title>
<link rel="stylesheet" href="<?php echo base_url('assets/css/style.css'); ?>">
<div class="container">
    <div class="middle-box">
        <h1>Hotel List</h1>
        <ul class="hotel-list">
            <?php
            foreach ($data as $row) {
                ?>
                <li>
                    <img src="<?php echo base_url(); ?>assets/images/<?php echo $row->pic; ?>" >
                    <h3><?php echo $row->hotel_name; ?></h3>
                    <p><?php echo $row->des; ?></p>
                    <p class="list-foter"><span class="price">Price : $<?php echo $row->price; ?></span> <a class="btn-by" href="<?php echo base_url(); ?>book/pay/<?php echo $row->id; ?>">Buy</a></p>

                </li>
            <?php } ?>
        </ul>
    </div>
</div>