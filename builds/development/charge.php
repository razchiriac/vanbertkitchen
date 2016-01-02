<?php
  require_once(dirname(__FILE__) . '/config.php');
  
  ini_set('xdebug.var_display_max_depth', 5);
  ini_set('xdebug.var_display_max_children', 256);
  ini_set('xdebug.var_display_max_data', 1024);
  
  $amount = $_POST['amount'];
  $user_g_id = $_POST['user_g_id'];
  $user_cart = $_POST['user_cart'];
  
  $user_cart = json_decode($user_cart);
  
  $cart_view = '<html><body>';
  $cart_view.= "<link rel='stylesheet' type='text/css' href='css/email.css' />";
  $cart_view.= "<div class='container'>";
  
  $cart_view.= "<div class='title'>";
  $cart_view.= "<h2 class='left'>Vanbert Corp.</h2>";
  $cart_view.= "<h2 class='right'>Receipt</h2>";
  $cart_view.= "</div>"; //div.title
  
  $cart_view.= "<div class='details'>";
  $cart_view.= "<div class='left'>";
  $cart_view.= "<div class='email'>";
    $cart_view.= "<span>Email</span>";
  $cart_view.= "</div>"; //div.email
  $cart_view.= "<div class='date'>";
    $cart_view.= "<span>Date</span>";
  $cart_view.= "</div>"; //div.date
  $cart_view.= "<div class='orderid'>";
    $cart_view.= "<span>Order ID</span>";
  $cart_view.= "</div>"; //div.orderid
  $cart_view.= "</div>"; //div.left
  
  $cart_view.= "<div class='right'>";
  $cart_view.= "<div class='billing'>";

  $cart_view.= "</div>"; //div.billing
  $cart_view.= "</div>"; //div.right
  
  $cart_view.= "</div>"; //div.details
  
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
  
  //var_dump($user_cart);

  // Email and stripe charge
  $to = "raz.chiriac@gmail.com"; // this is your Email address
  $from = "orders@vbk.com"; // this is the sender's Email address
  
  $subject = "Order Confirmation";
  $message = $cart_view;
  
  $headers = "From:" . $from;
  //mail($to,$subject,$message,$headers);  
  
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
  
  echo "<br>";
  echo $_POST['stripeEmail'];
  echo "<br>";
  echo date('m/d/Y');
  //echo $charge->created;
  echo "<br>";
  echo $charge->source->name;
  echo "<br>";
  echo $charge->source->address_city;
  echo "<br>";
  echo $charge->source->address_country;
  echo "<br>";
  echo $charge->source->address_line1;
  echo "<br>";
  echo $charge->source->address_line2;
  echo "<br>";
  echo $charge->source->address_state;
  echo "<br>";
  echo "<br>";
  echo $charge->source->zip;
  echo "<br>";
  echo $charge->source->brand;
  echo "<br>";
  echo $charge->source->exp_month;
  echo "<br>";
  echo $charge->source->exp_year;
  echo "<br>";
  echo $charge->source->funding;
  echo "<br>";
  echo $charge->source->last4;
  echo "<br>";
  
  echo "</hr>";
  //var_dump($charge);
  
  // header('Location: /#/success');
  // /Email and stripe charge
