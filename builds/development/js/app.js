var myApp = angular.module('myApp', [
	'ngRoute',
	'ui.router',
	'firebase',
	'appControllers',
	'LocalStorageModule'
]).constant('FIREBASE_URL', 'https://vanbertkitchens.firebaseio.com');

var appControllers = angular.module('appControllers', ['firebase']);

myApp.run(["$rootScope", "$state", function ($rootScope, $state) {
	$rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
		// We can catch the error thrown when the $requireAuth promise is rejected
		// and redirect the user back to the home page
		if (error === "AUTH_REQUIRED") {
			$state.go("home");
		}
	});
}]);


myApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

	Stripe.setPublishableKey('pk_live_nq4oI0EYDnL0xTLbh4TZbs8s');

	// For any unmatched url, send to /route1
	$urlRouterProvider.otherwise("/home")

	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'views/home.html'
		})
		.state('user', {
			url: '/user',
			templateUrl: 'views/user/user.html'
		})
		.state('cart', {
			url: '/cart',
			templateUrl: 'views/user/cart.php'
		})
		/* LOGIN & REGISTER */
		.state('login', {
			url: '/login',
			templateUrl: 'views/login.html',
			controller: 'RegistrationController'
		})
		.state('register', {
			url: '/register',
			templateUrl: 'views/register.html',
			controller: 'RegistrationController'
		})
		/* END OF LOGIN & REGISTER */
		.state('admin', {
			url: '/admin',
			templateUrl: 'views/admin.html',
			resolve: {
				// controller will not be loaded until $requireAuth resolves
				// Auth refers to our $firebaseAuth wrapper in the example above
				"currentAuth": ["Auth", function (Auth) {
					// $requireAuth returns a promise so the resolve waits for it to complete
					// If the promise is rejected, it will throw a $stateChangeError (see above)
					return Auth.$requireAuth();
      }]
			}
		})
		.state('admin.doors', {
			url: '/admin-doors',
			templateUrl: 'views/admin.doors.html',
			controller: 'DoorsController',
			resolve: {
				// controller will not be loaded until $requireAuth resolves
				// Auth refers to our $firebaseAuth wrapper in the example above
				"currentAuth": ["Auth", function (Auth) {
					// $requireAuth returns a promise so the resolve waits for it to complete
					// If the promise is rejected, it will throw a $stateChangeError (see above)
					return Auth.$requireAuth();
      }]
			}
		})
		.state('admin.cabinets', {
			url: '/admin-cabinets',
			templateUrl: 'views/admin.cabinets.html',
			controller: 'CabinetsController',
			resolve: {
				// controller will not be loaded until $requireAuth resolves
				// Auth refers to our $firebaseAuth wrapper in the example above
				"currentAuth": ["Auth", function (Auth) {
					// $requireAuth returns a promise so the resolve waits for it to complete
					// If the promise is rejected, it will throw a $stateChangeError (see above)
					return Auth.$requireAuth();
      }]
			}
		})
		.state('success', {
			url: '/success',
			templateUrl: 'views/success.php',
			controller: 'CabinetsController',
			resolve: {
				// controller will not be loaded until $requireAuth resolves
				// Auth refers to our $firebaseAuth wrapper in the example above
				"currentAuth": ["Auth", function (Auth) {
					// $requireAuth returns a promise so the resolve waits for it to complete
					// If the promise is rejected, it will throw a $stateChangeError (see above)
					return Auth.$requireAuth();
      }]
			}
		})
		/* DOORS */
		.state('doors', {
			url: '/doors',
			templateUrl: 'views/doors.html',
			controller: 'DoorsController'
		})
		/* END OF DOORS */
		/* CABINETS */
		.state('cabinets', {
			url: '/cabinets',
			templateUrl: 'views/cabinets.html',
			controller: 'CabinetsController'
		})
		/* END OF CABINETS */
		/* CHECKOUT */

	.state('checkout', {
		url: '/checkout',
		templateUrl: 'views/checkout.html'
	})

	/* END OF CHECKOUT */
	.state('closets', {
		url: '/closets',
		templateUrl: 'views/closets.html'
	})

}]);




myApp.directive('myEnter', function () {
	return function (scope, element, attrs) {
		element.bind("keydown keypress", function (event) {
			if (event.which === 13) {
				scope.$apply(function () {
					scope.$eval(attrs.myEnter);
				});

				event.preventDefault();
			}
		});
	};
});

myApp.filter('showByCategory', function () {
	return function (input) {
		var out = [];
		angular.forEach(input, function (product) {
			if (product.name === 'all') {
				out.push(product);
			} else if (product.category.name === input) {
				out.push(product);
			}
		})
		return out;
	}
});

myApp.filter('num', function () {
	return function (input) {
		return parseFloat(input, 10);
	};
});

myApp.filter('numInt', function() {
    return function(input) {
      return parseInt(input, 10);
    };
});

myApp.directive('progressBtn', function () {
	return {
		templateUrl: 'views/templates/progress-btn.html'
	};
});

myApp.directive('shoppingCart', function () {
	return {
		templateUrl: 'views/templates/shopping-cart.php'
	};
});

myApp.directive('wishList', function () {
	return {
		templateUrl: 'views/templates/wish-list.html'
	};
});

myApp.directive('topVariablesBar', function () {
	return {
		templateUrl: 'views/templates/top-variables-bar.html'
	};
});

myApp.directive('cabinetsList', function () {
	return {
		templateUrl: 'views/templates/cabinets-list.html'
	};
});
