myApp.factory("WishList", ['$scope', '$rootScope', '$firebase', '$firebaseObject', '$firebaseArray', 'FIREBASE_URL',
	function ($scope, $rootScope, $firebase, $firebaseObject, $firebaseArray, FIREBASE_URL) {
		/* setup */
		var ref = new Firebase(FIREBASE_URL);
		var refWishLists = new Firebase(FIREBASE_URL + '/wishlists');

		var wishListsObj = $firebaseObject(refWishLists);
		var wishListsArr = $firebaseArray(refWishLists);

		wishListsObj.$loaded().then(function (data) {
			$rootScope.wishLists = data;
			wishListsObj.$bindTo($rootScope, 'wishLists');
		});

		wishListsArr.$loaded().then(function (data) {
			$rootScope.wishListsArr = data;
			wishListsArr.$bindTo($rootScope, 'wishListsArray');
		});
		/* end of setup */

		// is user logged in ? is there a wish list with user ID the same as the logged in user ID

		$rootScope.wishListsInit = function() {
			if ( $rootScope.authData ) {
				alert();
			}
		};


		$rootScope.addToWishList = function (thisCabinet) {
			//////////////////////
			var tempCabinet = {
				name: thisCabinet.name,
				category: thisCabinet.category,
				style: thisCabinet.style,
				color: $scope.chosenColor,
				width: thisCabinet.width,
				height: thisCabinet.height,
				depth: thisCabinet.depth,
//				price: $scope.cabinetprice,
				imageUrl: thisCabinet.ImageUrl,
				date: Firebase.ServerValue.TIMESTAMP
			};

			wishListsArr.$add(tempCabinet).then(function (ref) {

			});
			//////////////////////

		}; // addToWishList

		$scope.removeFromWishList = function (thisCabinet) {
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();
			$scope.cabinetWishList.pop(thisCabinet);
		};

}]);
