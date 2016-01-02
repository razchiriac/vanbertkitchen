<?php
  require_once(dirname(__FILE__) . '/config.php');
  
  ini_set('xdebug.var_display_max_depth', 5);
  ini_set('xdebug.var_display_max_children', 256);
  ini_set('xdebug.var_display_max_data', 1024);
  
  $amount = $_POST['amount'];
  $user_g_id = $_POST['user_g_id'];
  $user_cart = $_POST['user_cart'];
  // var_dump($user_cart);
  //mail("raz.chiriac@gmail.com","Order Confirmation", $user_cart);
    
  
  $token  = $_POST['stripeToken'];

  $customer = Stripe_Customer::create(array(
      'description' => $user_g_id,
      'card'  => $token
  ));

  $charge = Stripe_Charge::create(array(
      'customer' => $customer->id,
      'amount'   => $amount,
      'currency' => 'usd',
      'metadata' => array("google_id" => $user_g_id )
  ));
  
  $to = "raz.chiriac@gmail.com"; // this is your Email address
  $from = "orders@vbk.com"; // this is the sender's Email address
  
  $subject = "Order Confirmation";
  $message = $user_cart;
  
  $headers = "From:" . $from;
  mail($to,$subject,$message,$headers);
  
  //echo '<h1>Thank You!</h1>';
  header('Location: /#/success');
