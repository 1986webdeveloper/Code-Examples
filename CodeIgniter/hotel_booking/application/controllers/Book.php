<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * This is a simple Hotel booking system demo where user can book hotel using credit/debit card using Stripe payment gateway.
 * Book class. * 
 * @extends CI_Controller
 */
class Book extends CI_Controller {

    /**
     * __construct function.
     * 
     * @access public
     * @return void
     */
    
    public function __construct() {

        parent::__construct();
        $this->load->model('book_model');
        $this->load->helper('url');
    }

    public function index() {
        
    }

    /**
     * view function.
     * @access public
     * @return void
     */
    public function view() {

        $this->data['data'] = $this->book_model->view_booking();

        // --- Get data in model and put data in view page ---//
        $this->load->view('hotel_list', $this->data);
    }

    /**
     * pay function.
     * 
     * @access public
     * @id	int	$id
     * @return void
     */
    public function pay($id) {
        // --- Find Hotel details you selected --- //
        $this->pay['details'] = $this->book_model->pay_details($id);

        // --- Hotel details data in view page --- //
        $this->load->view('pay_details', $this->pay);
    }

    /**
     * checkout function.
     * @access public
     * @return void
     */
    public function checkout() {
        $email = $this->input->post('email');
        $price = $this->input->post('price');
        $fname = $this->input->post('fname');
        $lname = $this->input->post('lname');
        $phone = $this->input->post('pno');
        $address = $this->input->post('address');
        $hotel_name = $this->input->post('name');
        $booking_id = $this->input->post('booking_id');

        // --- Payment Details insert data pass in model --- //
        $this->data = $this->book_model->form_details($fname, $lname, $phone, $address, $hotel_name, $price, $email, $booking_id);
        $cid = $this->data;
        redirect('book/details/' . $cid);
    }

    /**
     * details function.
     * 
     * @access public
     * @id	int	$id
     * @return void
     */
    public function details($id) {
        $this->details['details'] = $this->book_model->details($id);
        $this->load->view('details', $this->details);
    }

    /**
     * checkout_details function.
     * @access public
     * @return void
     */
    public function checkout_details() {
        $price = $this->input->post('price');
        try {
            require_once('Stripe/lib/Stripe.php');
            Stripe::setApiKey("STRIPE_SECRET_KEY"); // STRIPE_SECRET_KEY:- Your Stripe private secret key
            $amount = $price * 100;
            $charge = Stripe_Charge::create(array(
                        "amount" => $amount,
                        "currency" => "usd", // Set your currency
                        "card" => $_POST['stripeToken'], // Auto generated Stripe token
                        "description" => "Hotel Payment" // Item description
            ));
            redirect('book/view?type=sucess');
        } catch (Stripe_CardError $e) {
            
        }

        //catch the errors in any way you like
        catch (Stripe_InvalidRequestError $e) {
            // Invalid parameters were supplied to Stripe's API
        } catch (Stripe_AuthenticationError $e) {
            // Authentication with Stripe's API failed
            // (maybe you changed API keys recently)
        } catch (Stripe_ApiConnectionError $e) {
            // Network communication with Stripe failed
        } catch (Stripe_Error $e) {

            // Display a very generic error to the user, and maybe send
            // yourself an email
        } catch (Exception $e) {

            // Something else happened, completely unrelated to Stripe
        }
    }

}
