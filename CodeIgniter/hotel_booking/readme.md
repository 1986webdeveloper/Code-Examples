# Code Ignitor Hotel Booking System

This is a standalone and simple hotel booking system where user can book hotel using credit/debit card via ***Stripe payment gateway***.

Note: This is code ignitor code and is not workable standalone directly. 

## Steps to install this module in your Code Ignitor ##

1. Download/Clone Hotel booking system 
2. Import hotel_booking.sql in to your database
3. Change database settings in /application/config/database.php
4. Set base url in /applicaation/config/config.php
5. Add new route in /application/config/route.php
6. Change/Add default rout in /application/config/route.php
7. Copy controllers, models and view files to related folders.
8. Change Stripe private secret key which is located at /application/controllers/Book.php at line no 101 you will find following code 
	
	>Stripe::setApiKey("STRIP_SECRET_KEY"); // STRIP_SECRET_KEY:- Your Stripe private secret key

9. Change Stripe public secret key, Company Logo, Store Name, Item description  which is located at /application/views/details.php at line no 41 to 44 you will find following code
	
	>data-key="YOUR_STRIPE_PUBLIC_API_KEY" 
	>data-image="YOUR_LOGO" 
 	>data-name="YOUR_STORE_NAME" 
	>data-description="YOUR_ITEM_DESCRIPTION"
 	