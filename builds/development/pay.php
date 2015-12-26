<form action="charge.php" method="post">
  <input type="number" id="custom-amount" name="amount" />
  
  <script src="https://checkout.stripe.com/checkout.js" class="stripe-button"
          data-key="pk_test_PTQxPyzUAucunSs2MkXAuaPo"
          data-description="Access for a year"
          data-amount="5000"
          data-locale="auto">
  </script>
          
  <script>
    $('#custom-amount').onchange(function(){
        // Stripe accepts payment amounts in cents so we have to convert dollars to cents by multiplying by 100
        var amount = parseInt( $(this).val()*100);
        $(".stripe-button").attr( "data-amount", amount );
    }
  </script>
</form>