myApp.controller('StripeController', ['$scope', '$rootScope', '$firebase', '$firebaseObject', '$firebaseArray', 'FIREBASE_URL', 
	function($scope, $rootScope, $firebase, $firebaseObject, $firebaseArray, FIREBASE_URL) {

	
	// Stripe Response Handler
	$scope.stripeCallback = function (code, result) {
	    if (result.error) {
	        window.alert('it failed! error: ' + result.error.message);
	    } else {
	        window.alert('success! token: ' + result.id);
	    }
	};	


}]);