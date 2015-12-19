<script src="https://js.stripe.com/v1/"></script>

<script>
	Stripe.setPublishableKey('pk_test_PTQxPyzUAucunSs2MkXAuaPo'); // Test key!
</script>

<script src="buy-controller.js"></script>
<h2>Checkout Page</h2>
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
					<input id="cartPrice" type="hidden" value="{{cartPrice()}}">
				</td>
			</tr>
		</tbody>
	</table>
</div>


<h2>Payment Form</h2>

<form id="buy-form" method="post" action="javascript:">

	<p class="form-label">First Name:</p>
	<input class="text" id="first-name" spellcheck="false"></input>

	<p class="form-label">Last Name:</p>
	<input class="text" id="last-name" spellcheck="false"></input>

	<p class="form-label">Email Address:</p>
	<input class="text" id="email" spellcheck="false"></input>

	<p class="form-label">Credit Card Number:</p>
	<input class="text" id="card-number" autocomplete="off"></input>

	<p class="form-label">Expiration Date:</p>
	<select id="expiration-month">
		<option value="1">January</option>
		<option value="2">February</option>
		<option value="3">March</option>
		<option value="4">April</option>
		<option value="5">May</option>
		<option value="6">June</option>
		<option value="7">July</option>
		<option value="8">August</option>
		<option value="9">September</option>
		<option value="10">October</option>
		<option value="11">November</option>
		<option value="12">December</option>
	</select>

	<select id="expiration-year">
		<option value="2015">2015</option>
		<option value="2016">2016</option>
		<option value="2017">2017</option>
		<option value="2018">2018</option>
		<option value="2019">2019</option>
		<option value="2020">2020</option>
		<option value="2021">2021</option>
		<option value="2022">2022</option>
		<option value="2023">2023</option>
		<option value="2024">2024</option>
		<option value="2025">2025</option>
		<option value="2026">2026</option>
		<option value="2027">2027</option>
		<option value="2028">2028</option>
		<option value="2029">2029</option>
		<option value="2030">2030</option>
	</select>

	<p class="form-label">CVC:</p>
	<input class="text" id="card-security-code" autocomplete="off"></input>

	<input id="buy-submit-button" type="submit" value="Place This Order »"></input>
</form>
