<div class="row" ng-controller="CabinetsController" ng-init="cartInit()">
	<h4>Your Shopping Cart</h4>
	<table class="table table-hover">
		<thead>
			<th>Name</th>
			<th>Category</th>
			<th>Door</th>
			<th>Color</th>
			<th>Material</th>
			<th>Width</th>
			<th>Height</th>
			<th>Depth</th>
			<th>Kick Border</th>
			<th>Count</th>
			<th>Price</th>
		</thead>
		<tbody>
			<tr ng-repeat="cabinet in cartArr">
				<td>{{cabinet.name}}</td>
				<td>{{getCategory(cabinet.category).name}}</td>
				<td ng-init="editDoor = false">
					<span ng-hide="editDoor">{{cabinet.door.name}}</span>
					<select ng-model="cabinet.door" ng-options="door.name for door in doorStylesArr" ng-show="editDoor" my-enter="wishListArr.$save(cabinet); editDoor = false" ng-model="cabinet.door"></select>
					<!--					<span class="glyphicon glyphicon-pencil blue" ng-hide="editDoor" ng-click="editDoor = !editDoor"></span>-->
					<span class="glyphicon glyphicon-check green" ng-show="editDoor" ng-click="cartArr.$save(cabinet); editDoor = false"></span>
				</td>
				<td ng-init="editColor = false">
					<span ng-hide="editColor">{{cabinet.color.name}}</span>
					<select ng-model="cabinet.color" ng-options="color.name for color in cabinetColorsArr" ng-show="editColor" my-enter="wishListArr.$save(cabinet); editColor = false" ng-model="cabinet.color"></select>
					<span class="glyphicon glyphicon-pencil blue" ng-hide="editColor" ng-click="editColor = !editColor"></span>
					<span class="glyphicon glyphicon-check green" ng-show="editColor" ng-click="cartArr.$save(cabinet); editColor = false"></span>
				</td>
				<td ng-init="editMaterial = false">
					<span ng-hide="editMaterial">{{cabinet.material.name}}</span>
					<select ng-model="cabinet.material" ng-options="material.name for material in cabinetMaterialsArr" ng-show="editMaterial" my-enter="wishListArr.$save(cabinet); editMaterial = false" ng-model="cabinet.material"></select>
					<!--					<span class="glyphicon glyphicon-pencil blue" ng-hide="editMaterial" ng-click="editMaterial = !editMaterial"></span>-->
					<span class="glyphicon glyphicon-check green" ng-show="editMaterial" ng-click="cartArr.$save(cabinet); editMaterial = false"></span>
				</td>
				<td ng-init="editWidth = false">
					<span ng-hide="editWidth">{{cabinet.width}}, {{cabinet.widthFraction.name}}</span>
					<select ng-show="editWidth" ng-model="cabinet.width" ng-options="widthOption for widthOption in getWidthOptions('all')"></select>
					<span ng-show="editWidth"> in, </span>
					<select ng-show="editWidth" ng-model="cabinet.widthFraction" ng-options="fraction.name for fraction in fractions track by fraction.value"></select>
					<!--					<span class="glyphicon glyphicon-pencil blue" ng-hide="editWidth" ng-click="editWidth = !editWidth"></span>-->
					<span class="glyphicon glyphicon-check green" ng-show="editWidth" ng-click="cartArr.$save(cabinet); editWidth = false"></span>
				</td>
				<td ng-init="editHeight = false">
					<span ng-hide="editHeight">{{cabinet.height}}, {{cabinet.heightFraction.name}}</span>
					<select ng-show="editHeight" ng-model="cabinet.height" ng-options="heightOption for heightOption in getHeightOptions('all')"></select>
					<span ng-show="editHeight"> in, </span>
					<select ng-show="editHeight" ng-model="cabinet.heightFraction" ng-options="fraction.name for fraction in fractions track by fraction.value"></select>
					<!--					<span class="glyphicon glyphicon-pencil blue" ng-hide="editHeight" ng-click="editHeight = !editHeight"></span>-->
					<span class="glyphicon glyphicon-check green" ng-show="editHeight" ng-click="cartArr.$save(cabinet); editHeight = false"></span>
				</td>
				<td ng-init="editDepth = false">
					<span ng-hide="editDepth">{{cabinet.depth}}, {{cabinet.depthFraction.name}}</span>
					<select ng-show="editDepth" ng-model="cabinet.depth" ng-options="depthOption for depthOption in getDepthOptions('all')"></select>
					<span ng-show="editDepth"> in, </span>
					<select ng-show="editDepth" ng-model="cabinet.depthFraction" ng-options="fraction.name for fraction in fractions track by fraction.value"></select>
					<!--					<span class="glyphicon glyphicon-pencil blue" ng-hide="editDepth" ng-click="editDepth = !editDepth"></span>-->
					<span class="glyphicon glyphicon-check green" ng-show="editDepth" ng-click="cartArr.$save(cabinet); editDepth = false"></span>
				</td>
				<td>{{cabinet.kick}}</td>
				<td ng-init="editCount = false">
					<span ng-hide="editCount">{{cabinet.count}}</span>
					<input style="width:50px" ng-show="editCount" my-enter="cartArr.$save(cabinet); editCount = false" type="number" ng-model="cabinet.count">
					<!--					<span class="glyphicon glyphicon-pencil blue" ng-hide="editCount" ng-click="editCount = !editCount"></span>-->
					<span class="glyphicon glyphicon-check green" ng-show="editCount" ng-click="cartArr.$save(cabinet); editCount = false"></span>
				</td>
				<td>{{cabinet.price | currency}}</td>
				<td>
					<button type="button" class="btn btn-danger" data-toggle="modal" data-target=".{{cabinet.$id}}-trash-modal">
						<span class="glyphicon glyphicon-trash"></span>
					</button>
					<div class="modal fade colors-modal {{cabinet.$id}}-trash-modal">
						<div class="modal-dialog">
							<div class="modal-content">
								<div class="modal-header">
									<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
									<h4 class="modal-title">You're about to remove cabinet: {{cabinet.name}} from your Cart</h4>
								</div>
								<div class="modal-body">
									<h5>Are you sure?</h5>
								</div>
								<div class="modal-footer">
									<button type="button" class="btn btn-default" data-dismiss="modal">Nevermind</button>
									<button type="button" class="btn btn-danger" data-dismiss="modal" ng-click="removeFromCart(cabinet)">Yes, remove this Cabinet</button>
								</div>
							</div>
							<!-- /.modal-content -->
						</div>
						<!-- /.modal-dialog -->
					</div>
					<!-- /.modal -->
				</td>
			</tr>
			<tr>
				<td colspan="12">
					<h2 class="pull-right">Total: {{cartPrice() | currency}} </h2>
				</td>
			</tr>
		</tbody>
	</table>
	<div class="pull-right" ng-init="stripe_price = stripePrice()">
		
		<p ng-hide="true">stripePrice() = {{stripePrice()}}</p>
		<!--	Stripe Checkout Button goes Here	-->
		<!--<a href="pay.php" type="button" class="btn btn-primary">Complete Purchase</a>-->
		<form action="charge.php" method="post">
			<p ng-hide="true">stripePrice() = {{stripePrice()}}</p>
		  <input type="hidden" id="custom-amount" name="amount" ng-model="stripe_price" ng-value="stripe_price" />
		  <input type="hidden" name="user_g_id" value="{{authData.google.cachedUserProfile.id}}" />
		  <input type="hidden" name="user_cart" value="{{cartArr | json}}" />
		  <p ng-hide="true">stripePrice() = {{stripePrice()}}</p>
		  
		  <script src="https://checkout.stripe.com/checkout.js" class="stripe-button"
		          data-key="pk_test_PTQxPyzUAucunSs2MkXAuaPo"
		          data-description="Purchase"
		          data-amount="00"
		          data-billing-address="true"
		          data-shipping-address="true"
		          data-locale="auto">
		  </script>
		          
		</form>
	</div>

</div>