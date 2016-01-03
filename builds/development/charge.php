<?php
  require_once(dirname(__FILE__) . '/config.php');
  
  ini_set('xdebug.var_display_max_depth', 5);
  ini_set('xdebug.var_display_max_children', 256);
  ini_set('xdebug.var_display_max_data', 1024);
  
  $amount = $_POST['amount'];
  $user_g_id = $_POST['user_g_id'];
  $user_cart = $_POST['user_cart'];
  
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
  
  // billing vars
  $billing_email = $_POST['stripeEmail'];
  $billing_name = $_POST['stripeBillingName'];
  $billing_address = $_POST['stripeBillingAddressLine1'];
  $billing_zip = $_POST['stripeBillingAddressZip'];
  $billing_state = $_POST['stripeBillingAddressState'];
  $billing_city = $_POST['stripeBillingAddressCity'];
  $billing_country = $_POST['stripeBillingAddressCountry'];
  // card
  $card_brand = $charge->source->brand;
  $card_exp_month = $charge->source->exp_month;
  $card_exp_year = $charge->source->exp_year;
  $card_type = $charge->source->funding; //credit/debit
  $card_last4 = $charge->source->last4;
  // /card
  $fingerprint = $charge->source->fingerprint;
  // /billing vars
  
  // shipping vars
  $shipping_name = $_POST['stripeShippingName'];
  $shipping_address = $_POST['stripeShippingAddressLine1'];
  $shipping_zip = $_POST['stripeShippingAddressZip'];
  $shipping_state = $_POST['stripeShippingAddressState'];
  $shipping_city = $_POST['stripeShippingAddressCity'];
  $shipping_country = $_POST['stripeShippingAddressCountry'];
  // /shipping vars
  
  $user_cart = json_decode($user_cart);
  
  $cart_view = '<html><body>';
  $cart_view.= "<link href='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.4/css/bootstrap.css' rel='stylesheet' type='text/css'>";
  $cart_view.= "<link rel='stylesheet' type='text/css' href='css/email.css' />";
  $cart_view.= "<div class='container'>";
  
  $cart_view.= "<div class='row'>";
  $cart_view.= "<h2 class='pull-left'>Vanbert Corp.</h2>";
  $cart_view.= "<h2 class='pull-right'>Receipt</h2>";
  $cart_view.= "</div>"; //div.row
  $cart_view.=  '<hr>';
  
  
  $cart_view.= "<div class='row'>";
    $cart_view.= "<div class='email'>";
      $cart_view.= "<b>Email: </b>";
      $cart_view.= $billing_email;
    $cart_view.= "</div>"; //div.email
    $cart_view.= "<div class='date'>";
      $cart_view.= "<b>Date: </b>";
      $cart_view.= date('m/d/Y');
    $cart_view.= "</div>"; //div.date
    $cart_view.= "<div class='orderid'>";
      $cart_view.= "<b>Order ID: </b>";
      $cart_view.= $fingerprint;
    $cart_view.= "</div>"; //div.orderid
  $cart_view.= "</div>"; //div.row
  $cart_view.=  '<hr>';
  
  $cart_view.= "<div class='row'>";
    $cart_view.= "<div class='col-md-6'>";
      $cart_view.= "<h4>Billing Details</h4>";
      $cart_view.= $billing_name . "<br/>";
      $cart_view.= $billing_address . "<br/>";
      $cart_view.= $billing_city . ", " . $billing_state . ", " . $billing_zip . "<br/>";
      $cart_view.= "<b>Card type: </b> " . $card_brand . "<br/>";
      $cart_view.= "<b>Card last 4: </b> " . $card_last4 . "<br/>";
      $cart_view.= "<b>Card exp.: </b> " . $card_exp_month . "/" . $card_exp_year . "<br/>";
    $cart_view.= "</div>"; //div.col-md-6
    $cart_view.= "<div class='col-md-6'>";
      $cart_view.= "<h4>Shipping Details</h4>";
      $cart_view.= $shipping_name . "<br/>";
      $cart_view.= $shipping_address . "<br/>";
      $cart_view.= $shipping_city . ", " . $shipping_state . ", " . $shipping_zip . "<br/>";
    $cart_view.= "</div>"; //div.col-md-6
  $cart_view.= "</div>"; //div.row
  $cart_view.=  '<hr>';
  
  foreach( $user_cart as $key=>$obj ) {
    $cart_view.=  '<h3>Product ' . ($key + 1) . '</h3><br/>';
    $cart_view.=  'Name: ' . $obj->name . '<br/>';
    $cart_view.=  'Color: ' . $obj->color->name . '<br/>';
    $cart_view.=  'Count: ' . $obj->count . '<br/>';
    $cart_view.=  'Width: ' . $obj->width . ', ' . $obj->widthFraction->name . '<br/>';
    $cart_view.=  'Height: ' . $obj->height . ', ' . $obj->heightFraction->name . '<br/>';
    $cart_view.=  'Depth: ' . $obj->depth . ', ' . $obj->depthFraction->name . '<br/>';
    $cart_view.=  'Door: ' . $obj->door->category . ', ' . $obj->door->name . '<br/>';
    $cart_view.=  'Kick: ' . $obj->kick . '<br/>';
    $cart_view.=  'Material: ' . $obj->material->name . '<br/>';
    $cart_view.=  'Price: $' . round($obj->price, 2) . '<br/>';
    $cart_view.=  '<hr>';
  }
  
  $cart_view.= "<span style='text-align:right'><h3>Total: $" . ($amount / 100) . "</h3></span>";
  
  $cart_view.= "</div>"; //div.container
  $cart_view.= '</body></html>';
  echo $cart_view;

  // Email and stripe charge
  // $to = "raz.chiriac@gmail.com"; // this is your Email address
  // $from = "orders@vbk.com"; // this is the sender's Email address
  // $subject = "Order Confirmation";
  // $message = $cart_view;
  // $headers = "From:" . $from;
  
  $to = $billing_email;

  $subject = 'Vanbert Order Receipt';
  
  $headers = "From: " . "orders@vanbertcorporation.com" . "\r\n";
  $headers .= "Reply-To: ". "orders@vanbertcorporation.com" . "\r\n";
  $headers .= "CC: raz.chiriac@gmail.com\r\n";
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
  
  mail($to,$subject,$cart_view,$headers);  

  // header('Location: /#/success');
  // /Email and stripe charge
