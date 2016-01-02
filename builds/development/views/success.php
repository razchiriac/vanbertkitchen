<h1>Success!</h1>

<?php 

    $to = "raz.chiriac@gmail.com"; // this is your Email address
    $from = "orders@vbk.com"; // this is the sender's Email address

    $subject = "Order Confirmation";
    $message = "Here goes the order detail.";

    $headers = "From:" . $from;
    mail($to,$subject,$message,$headers);
    echo "Mail Sent. We will contact you shortly.";
    // You can also use header('Location: thank_you.php'); to redirect to another page.

?>