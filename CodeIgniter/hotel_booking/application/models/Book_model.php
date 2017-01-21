<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Book_model class.
 * 
 * @extends CI_Model
 * This is a simple Hotel booking system demo where user can book hotel using credit/debit card using Stripe payment gateway.
 */

class Book_model extends CI_Model {

    /**
     * __construct function.
     * 
     * @access public
     * @return void
     */
    public function __construct() {
        // --- Lode database --- //
        parent::__construct();
        $this->load->database();
    }

    /** view object
     * @param	void
     * @return  object
     */
    public function view_booking() {
        $this->db->select();
        $this->db->from('booking');
        return $this->db->get()->result();
    }

    /** pay object
     * @param	void
     * @id int $id
     * @return  object
     */
    public function pay_details($id) {
        $this->db->select();
        $this->db->from('booking');
        $this->db->where('id', $id);
        return $this->db->get()->result();
    }

    /** checkout object
     * @param	void
     * @return  object
     * @fname varchar $fname
     * @lname varchar $lname
     * @phone varchar $phone
     * @add text $add
     * @hotel varchar $Hotel
     * @price int $price
     * @email varchar $email
     * @booking_id int $booking_id
     */
    public function form_details($fname, $lname, $phone, $address, $Hotel, $price, $email, $booking_id) {
        $data = array(
            'booking_id' => intval($booking_id),
            'fname' => $fname,
            'lname' => $lname,
            'p_no' => $phone,
            'address' => $address,
            'hotel_name' => $Hotel,
            'price' => $price,
            'email' => $email,
            'created_at' => date('Y-m-j H:i:s'),
        );
        $this->db->insert('details', $data);
        return $this->db->insert_id();
    }

    /** details object
     * @param	void
     * @return  object
     * @id int $id
     */
    public function details($id) {
        $this->db->select();
        $this->db->from('details');
        $this->db->where('id', $id);
        return $this->db->get()->result();
    }

}
