<?php
require_once('stripe/lib/Stripe.php');

$stripe = array(
  "secret_key"      => "sk_test_yPSn0Eo53z0u4vX8oADGfuj3",
  "publishable_key" => "pk_test_PTQxPyzUAucunSs2MkXAuaPo"
);

\Stripe\Stripe::setApiKey($stripe['secret_key']);
