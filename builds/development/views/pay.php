<?php
// Helper Function: used to post an error message back to our caller
function returnErrorWithMessage($message)
{
    $a = array('result' => 1, 'errorMessage' => $message);
    echo json_encode($a);
}

// Credit Card Billing
require_once('stripe-php/init.php');  // change this path to wherever you put the Stripe PHP library!

$trialAPIKey = "sk_test_yPSn0Eo53z0u4vX8oADGfuj3";  // These are the SECRET keys!
$liveAPIKey = "sk_live_1v5xWcNtC3iP6sZyrB4N4o1x";

Stripe::setApiKey($trialAPIKey);  // Switch to change between live and test environments

// Get all the values from the form
$token = $_POST['stripeToken'];
$email = $_POST['email'];
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$price = $_POST['price'];

$priceInCents = $price * 100;   // Stripe requires the amount to be expressed in cents

try
{
    // We must have all of this information to proceed. If it's missing, balk.
    if (!isset($token)) throw new Exception("Website Error: The Stripe token was not generated correctly or passed to the payment handler script. Your credit card was NOT charged. Please report this problem to the webmaster.");
    if (!isset($email)) throw new Exception("Website Error: The email address was NULL in the payment handler script. Your credit card was NOT charged. Please report this problem to the webmaster.");
    if (!isset($firstName)) throw new Exception("Website Error: FirstName was NULL in the payment handler script. Your credit card was NOT charged. Please report this problem to the webmaster.");
    if (!isset($lastName)) throw new Exception("Website Error: LastName was NULL in the payment handler script. Your credit card was NOT charged. Please report this problem to the webmaster.");
    if (!isset($priceInCents)) throw new Exception("Website Error: Price was NULL in the payment handler script. Your credit card was NOT charged. Please report this problem to the webmaster.");

    try
    {
        // create the charge on Stripe's servers. THIS WILL CHARGE THE CARD!
        $charge = Stripe_Charge::create(array(
            "amount" => $priceInCents,
            "currency" => "usd",
            "card" => $token,
            "description" => $email)
        );

        // If no exception was thrown, the charge was successful!
        // Here, you might record the user's info in a database, email a receipt, etc.

        // Return a result code of '0' and whatever other information you'd like.
        // This is accessible to the jQuery Ajax call return-handler in "buy-controller.js"
        $array = array('result' => 0, 'email' => $email, 'price' => $price, 'message' => 'Thank you; your transaction was successful!');
        echo json_encode($array);
    }
    catch (Stripe_Error $e)
    {
        // The charge failed for some reason. Stripe's message will explain why.
        $message = $e->getMessage();
        returnErrorWithMessage($message);
    }
}
catch (Exception $e)
{
    // One or more variables was NULL
    $message = $e->getMessage();
    returnErrorWithMessage($message);
}
?>
