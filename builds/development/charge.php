<?php
  require_once(dirname(__FILE__) . '/config.php');
  
  $amount = $_POST['amount'];
  
  $token  = $_POST['stripeToken'];

  $customer = Stripe_Customer::create(array(
      'email' => 'customer@example.com',
      'card'  => $token
  ));

  $charge = Stripe_Charge::create(array(
      'customer' => $customer->id,
      'amount'   => $amount,
      'currency' => 'usd'
  ));
  
  echo '<h1>Thank You!</h1>';
