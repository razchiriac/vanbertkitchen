myApp.controller('CabinetsController', ['$scope', '$rootScope', '$firebase', '$firebaseObject', '$firebaseArray', 'FIREBASE_URL',
	function ($scope, $rootScope, $firebase, $firebaseObject, $firebaseArray, FIREBASE_URL) {

		var refCabinets = new Firebase(FIREBASE_URL + '/products/cabinets');
		var refCabinetCategories = new Firebase(FIREBASE_URL + '/products/cabinet-categories');
		var refCabinetStyles = new Firebase(FIREBASE_URL + '/products/cabinet-styles');
		var refCabinetColors = new Firebase(FIREBASE_URL + '/products/cabinet-colors');
		var refWishLists = new Firebase(FIREBASE_URL + '/wishlists');

		var cabinetsObj = $firebaseObject(refCabinets);
		var cabinetsArr = $firebaseArray(refCabinets);

		var cabinetCategoriesObj = $firebaseObject(refCabinetCategories);
		var cabinetCategoriesArr = $firebaseArray(refCabinetCategories);

		var cabinetStylesObj = $firebaseObject(refCabinetStyles);
		var cabinetStylesArr = $firebaseArray(refCabinetStyles);

		var cabinetColorsObj = $firebaseObject(refCabinetColors);
		var cabinetColorsArr = $firebaseArray(refCabinetColors);

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

		cabinetsObj.$loaded().then(function (data) {
			$scope.cabinets = data;
			cabinetsObj.$bindTo($scope, 'cabinets');
		});

		cabinetsArr.$loaded().then(function (data) {
			$scope.cabinetsArr = data;
			cabinetsArr.$bindTo($scope, 'cabinetsArray');
		});

		cabinetCategoriesObj.$loaded().then(function (data) {
			$scope.cabinetCategories = data;
			cabinetCategoriesObj.$bindTo($scope, 'cabinetCategories');
		});

		cabinetCategoriesArr.$loaded().then(function (data) {
			$scope.cabinetCategoriesArr = data;
			cabinetCategoriesArr.$bindTo($scope, 'cabinetCategoriesArray');
		});

		cabinetStylesObj.$loaded().then(function (data) {
			$scope.cabinetStyles = data;
			cabinetStylesObj.$bindTo($scope, 'cabinetStyles');
		});

		cabinetStylesArr.$loaded().then(function (data) {
			$scope.cabinetStylesArr = data;
			cabinetStylesArr.$bindTo($scope, 'cabinetStylesArray');
		});

		cabinetColorsObj.$loaded().then(function (data) {
			$scope.cabinetColors = data;
			cabinetColorsObj.$bindTo($scope, 'cabinetColors');
		});

		cabinetColorsArr.$loaded().then(function (data) {
			$scope.cabinetColorsArr = data;
			cabinetColorsArr.$bindTo($scope, 'cabinetColorsArray');
		});

		//////// DOORS //////////////////

		var refDoors = new Firebase(FIREBASE_URL + '/products/doors');
		var refDoorCategories = new Firebase(FIREBASE_URL + '/products/door-categories');
		var refDoorStyles = new Firebase(FIREBASE_URL + '/products/door-styles');
		var refDoorColors = new Firebase(FIREBASE_URL + '/products/door-colors');

		var doorsObj = $firebaseObject(refDoors);
		var doorsArr = $firebaseArray(refDoors);

		var doorCategoriesObj = $firebaseObject(refDoorCategories);
		var doorCategoriesArr = $firebaseArray(refDoorCategories);

		var doorStylesObj = $firebaseObject(refDoorStyles);
		var doorStylesArr = $firebaseArray(refDoorStyles);

		var doorColorsObj = $firebaseObject(refDoorColors);
		var doorColorsArr = $firebaseArray(refDoorColors);

		doorsObj.$loaded().then(function (data) {
			$scope.doors = data;
			doorsObj.$bindTo($scope, 'doors');
		}); // make sure doors object data has loaded

		doorsArr.$loaded().then(function (data) {
			$scope.doorsArr = data;
			doorsArr.$bindTo($scope, 'doorsArray');
		}); // make sure doors array data has loaded

		doorCategoriesObj.$loaded().then(function (data) {
			$scope.doorCategories = data;
			doorCategoriesObj.$bindTo($scope, 'doorCategories');
		}); // make sure doors object data has loaded

		doorCategoriesArr.$loaded().then(function (data) {
			$scope.doorCategoriesArr = data;
			doorCategoriesArr.$bindTo($scope, 'doorCategoriesArray');
		}); // make sure doors array data has loaded

		doorStylesObj.$loaded().then(function (data) {
			$scope.doorStyles = data;
			doorStylesObj.$bindTo($scope, 'doorStyles');
		}); // make sure doors object data has loaded

		doorStylesArr.$loaded().then(function (data) {
			$scope.doorStylesArr = data;
			doorStylesArr.$bindTo($scope, 'doorStylesArray');
		}); // make sure doors array data has loaded

		doorColorsObj.$loaded().then(function (data) {
			$scope.doorColors = data;
			doorColorsObj.$bindTo($scope, 'doorColors');
		}); // make sure doors object data has loaded

		doorColorsArr.$loaded().then(function (data) {
			$scope.doorColorsArr = data;
			doorColorsArr.$bindTo($scope, 'doorColorsArray');
		}); // make sure doors array data has loaded

		$scope.getDoorStyles = function (selectedCategory) {
			$scope.tempStyles = [];
			angular.forEach(doorStylesArr, function (value, key) {
				if (($scope.tempStyles.length < 1) || ($.inArray(value, $scope.tempStyles) < 0)) {
					if (selectedCategory) {
						if (value.category === selectedCategory) {
							$scope.tempStyles.push(value.name);
						}
					} else {
						$scope.tempStyles.push(value.name);
					}
				}
			});
			return $scope.tempStyles;
		}; // getUniqueStyles

		/////////////////////////////////

		$scope.cabinetFractions = [
			'0',
			'1/16',
			'1/8',
			'3/16',
			'1/4',
			'5/16',
			'3/8',
			'7/16',
			'1/2',
			'9/16',
			'5/8',
			'11/16',
			'3/4',
			'13/16',
			'7/8',
			'15/16'
		];

		$scope.getWidthOptions = function (thisCabinet) {
			var result = [];
			for (i = thisCabinet.minWidth; i <= thisCabinet.maxWidth; i++) {
				result.push(i);
			}
			return result;
		};
		$scope.getHeightOptions = function (thisCabinet) {
			var result = [];
			for (i = thisCabinet.minHeight; i <= thisCabinet.maxHeight; i++) {
				result.push(i);
			}
			return result;
		};
		$scope.getDepthOptions = function (thisCabinet) {
			var result = [];
			for (i = thisCabinet.minDepth; i <= thisCabinet.maxDepth; i++) {
				result.push(i);
			}
			return result;
		};

		$scope.tempCabinetColors = [];

		$scope.addColorToCabinet = function (color) {
			$scope.tempCabinetColors.push(color);
		};

		$scope.removeColorFromCabinet = function (color) {
			var index = $scope.tempCabinetColors.indexOf(color);
			if (index > -1) {
				$scope.tempCabinetColors.splice(index, 1);
			}
		};

		$scope.addCabinet = function () {
			var imgUrl = 'http://placehold.it/190x305';
			$scope.cabinetImageUrl = imgUrl;
			var tempCabinet = {
				name: $scope.cabinetname,
				category: $scope.selectedCat,
				style: $scope.selectedStyle,
				colors: $scope.tempCabinetColors,
				minWidth: $scope.cabinetWidth.min,
				maxWidth: $scope.cabinetWidth.max,
				minHeight: $scope.cabinetHeight.min,
				maxHeight: $scope.cabinetHeight.max,
				minDepth: $scope.cabinetDepth.min,
				maxDepth: $scope.cabinetDepth.max,
				imageUrl: $scope.cabinetImageUrl,
				date: Firebase.ServerValue.TIMESTAMP
			};

			cabinetsArr.$add(tempCabinet).then(function (ref) {
				$scope.cabinetname = '';
				$scope.selectedCat = '';
				$scope.selectedStyle = '';
				$scope.tempCabinetColors = '';
				$scope.cabinetWidth.min = '';
				$scope.cabinetWidth.max = '';
				$scope.cabinetHeight.min = '';
				$scope.cabinetHeight.max = '';
				$scope.cabinetDepth.min = '';
				$scope.cabinetDepth.max = '';
				$scope.cabinetImageUrl = '';
			});

		}; //addCabinet

		$scope.addCategory = function () {
			$scope.newCategoryPrice = 1;
			$scope.categoryImageUrl = 'http://placehold.it/190x305';
			var tempCategory = {
				name: $scope.newCategoryName,
				price: $scope.newCategoryPrice,
				imageUrl: $scope.categoryImageUrl,
				date: Firebase.ServerValue.TIMESTAMP
			};
			cabinetCategoriesArr.$add(tempCategory).then(function (ref) {
				$scope.newCategoryName = '';
				$scope.newCategoryPrice = '';
				$scope.categoryImageUrl = '';
			});
		}; //addCategory

		$scope.addStyle = function () {
			$scope.newCategoryPrice = 1;
			$scope.styleImageUrl = 'http://placehold.it/190x305';
			var tempStyle = {
				category: $scope.newStyleCategory,
				name: $scope.newStyleName,
				price: $scope.newStylePrice,
				imageUrl: $scope.styleImageUrl,
				date: Firebase.ServerValue.TIMESTAMP
			};
			cabinetStylesArr.$add(tempStyle).then(function (ref) {
				$scope.newStyleName = '';
				$scope.newStylePrice = '';
				$scope.styleImageUrl = '';
			});
		}; //addStyle

		$scope.addColor = function () {
			$scope.colorImageUrl = 'http://placehold.it/190x305';
			var tempColor = {
				name: $scope.newColorName,
				imageUrl: $scope.colorImageUrl,
				date: Firebase.ServerValue.TIMESTAMP
			};
			cabinetColorsArr.$add(tempColor).then(function (ref) {
				$scope.newColorName = '';
				$scope.colorImageUrl = '';
			});
		}; //addStyle

		$scope.getUniqueCategories = function (field) {
			$scope.tempCategories = [];
			angular.forEach(cabinetCategoriesArr, function (value, key) {
				if (($scope.tempCategories.length < 1) || ($.inArray(value, $scope.tempCategories) < 0)) {
					if (field === 'name' || !field) {
						$scope.tempCategories.push(value);
					}
				}
			});
			return $scope.tempCategories;
		}; // getUniqueCategories


		$scope.getUniqueStyles = function (selectedCategory) {
			$scope.tempStyles = [];
			angular.forEach(cabinetStylesArr, function (value, key) {
				if (($scope.tempStyles.length < 1) || ($.inArray(value, $scope.tempStyles) < 0)) {
					if (selectedCategory) {
						if (value.category === selectedCategory.name) {
							$scope.tempStyles.push(value);
						}
					} else {
						$scope.tempStyles.push(value);
					}
				}
			});
			return $scope.tempStyles;
		}; // getUniqueStyles

		$scope.setCat = function (key) {
			$scope.selectedCat = key;
		};

		$scope.setStyle = function (key) {
			$scope.selectedStyle = key;
		};

		$scope.setColor = function (key) {
			$scope.chosenColor = key;
		};

		$scope.setDoor = function (key) {
			$scope.chosenDoor = key;
		};

		// Category filter
		$scope.categoryIncludes = [];


		$scope.includeCategory = function (category) {
			var i = $.inArray(category, $scope.categoryIncludes);
			if (i > -1) {
				$scope.categoryIncludes.splice(i, 1);
			} else {
				$scope.categoryIncludes.push(category);
			}
		}

		$scope.categoryFilter = function (cabinet) {
				if ($scope.categoryIncludes.length > 0) {
					if ($.inArray(cabinet.category, $scope.categoryIncludes) < 0)
						return;
				}
				return cabinet;
			}
			// End category filter

		// Style filter
		$scope.styleIncludes = [];

		$scope.includeStyle = function (style) {
			var i = $.inArray(style, $scope.styleIncludes);
			if (i > -1) {
				$scope.styleIncludes.splice(i, 1);
			} else {
				$scope.styleIncludes.push(style);
			}
		}

		$scope.styleFilter = function (cabinet) {
			if ($scope.styleIncludes.length > 0) {
				if ($.inArray(cabinet.style, $scope.styleIncludes) < 0)
					return;
			}
			return cabinet;
		};
		// End style filter

		/* wish list format */
		/**
		var demoWishList = {
			"userID" 	: "103811676446098468781",
			"cabinets" 	: {
				"name" 	: "Cabinet 1",
				........,
				....,
				..
			},
			"doors" 	: {
				"name" 	: "Door 1",
				......,
				..
			}
		}
		*/
		/* end of wish list format */
		/* wishlist process */
		/*
		user logs in
			is there a wish list in the db with the same user id
				yes - bind it to the scope
				no	- create a wish list with user id (createWishList)
		*/
		// creates and / or binds a wish list
		$rootScope.wishListInit = function () {
			// if it exists it binds it, if not, it creates it
			refWishList = new Firebase(FIREBASE_URL + '/wishlists/' + $rootScope.authData.google.cachedUserProfile.id);
			wishListObj = $firebaseObject(refWishList);
			wishListArr = $firebaseArray(refWishList);
			wishListObj.$loaded().then(function (data) {
				$rootScope.wishList = data;
				wishListObj.$bindTo($rootScope, 'wishList');
			});
			wishListArr.$loaded().then(function (data) {
				$rootScope.wishListArr = data;
				wishListArr.$bindTo($rootScope, 'wishListArray');
			});
			$rootScope.wishList.userID = $rootScope.authData.google.cachedUserProfile.id;
		};

		$scope.wishListPrice = function () {
			var result = 0.00;
			angular.forEach(wishListArr, function (value, key) {
				result += parseFloat(value.price);
			});
			return result;
		};

		/*
		user goes to cabinets page
		user adds a cabinet to wish list
			is the user logged in ?
				no 	- ask user to log in before using the wish list
				yes - add the cabinet to the user's wish list
		*/
		/* end of wishlist process */

		$scope.addToWishList = function (thisCabinet) {
			//////////////////////
			// is user logged in ?
			if (!$rootScope.authData) {
				alert("please log in first");
			} else {
				// calculate price

				// collect cabinet data
				var tempCabinet = {
					name: thisCabinet.name,
					category: thisCabinet.category,
					style: thisCabinet.style,
					color: $scope.chosenColor,
					door: $scope.chosenDoor,
					width: thisCabinet.width,
					widthFraction: thisCabinet.widthFraction,
					height: thisCabinet.height,
					heightFraction: thisCabinet.heightFraction,
					depth: thisCabinet.depth,
					depthFraction: thisCabinet.depthFraction,
					price: $scope.calcPrice(thisCabinet),
					//imageUrl: thisCabinet.ImageUrl,
					date: Firebase.ServerValue.TIMESTAMP
				};
				// push it to the user's wish list
				wishListArr.$add(tempCabinet);
			}
			//////////////////////
		}; // addToWishList

		$scope.calcPrice = function (thisCabinet) {

			var wFrac = parseFloat(thisCabinet.widthFraction.split("/")[0] / thisCabinet.widthFraction.split("/")[1]);
			var hFrac = parseFloat(thisCabinet.heightFraction.split("/")[0] / thisCabinet.heightFraction.split("/")[1]);
			var dFrac = parseFloat(thisCabinet.depthFraction.split("/")[0] / thisCabinet.depthFraction.split("/")[1]);

			if (thisCabinet.widthFraction === '0') {
				wFrac = 0
			};
			if (thisCabinet.heightFraction === '0') {
				hFrac = 0
			};
			if (thisCabinet.depthFraction === '0') {
				dFrac = 0
			};

			var width = thisCabinet.width + wFrac;
			var height = thisCabinet.height + hFrac;
			var depth = thisCabinet.depth + dFrac;

			var tempPrice = thisCabinet.style.price + (thisCabinet.category.price * width * height * depth) / 100.00;
			return tempPrice;
		};

		/* SHOPPING CART */

		$rootScope.cartInit = function () {
			// if it exists it binds it, if not, it creates it
			refCart = new Firebase(FIREBASE_URL + '/carts/' + $rootScope.authData.google.cachedUserProfile.id);
			cartObj = $firebaseObject(refCart);
			cartArr = $firebaseArray(refCart);
			cartObj.$loaded().then(function (data) {
				$rootScope.cart = data;
				cartObj.$bindTo($rootScope, 'cart');
			});
			cartArr.$loaded().then(function (data) {
				$rootScope.cartArr = data;
				cartArr.$bindTo($rootScope, 'cartArray');
			});
			$rootScope.cart.userID = $rootScope.authData.google.cachedUserProfile.id;
		};

		$scope.cartPrice = function () {
			var result = 0.00;
			angular.forEach(cartArr, function (value, key) {
				result += parseFloat(value.price);
			});
			return result;
		};

		$scope.addToCart = function (thisCabinet) {
			//////////////////////
			// is user logged in ?
			if (!$rootScope.authData) {
				alert("please log in first");
			} else {
				// collect cabinet data
				var tempCabinet = {
					name: thisCabinet.name,
					category: thisCabinet.category,
					style: thisCabinet.style,
					door: thisCabinet.door,
					color: thisCabinet.color,
					width: thisCabinet.width,
					widthFraction: thisCabinet.widthFraction,
					height: thisCabinet.height,
					heightFraction: thisCabinet.heightFraction,
					depth: thisCabinet.depth,
					depthFraction: thisCabinet.depthFraction,
					price: thisCabinet.price,
					date: Firebase.ServerValue.TIMESTAMP
				};
				// push it to the user's cart
				cartArr.$add(tempCabinet);
			}
		}; // addToCart

		$scope.addAllToCart = function (inputArr) {
			angular.forEach(inputArr, function (value, key) {
				$scope.addToCart(value);
			});
		};

		$scope.removeFromCart = function (thisCabinet) {
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();
			cartArr.$remove(thisCabinet);
		};

		/* END OF SHOPPING CART */

		$scope.removeFromWishList = function (thisCabinet) {
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();
			wishListArr.$remove(thisCabinet);
		};

		$scope.removeCabinet = function (key) {
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();
			cabinetsArr.$remove(key);
		};

		$scope.removeCategory = function (key) {
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();
			cabinetCategoriesArr.$remove(key);
		};

		$scope.removeStyle = function (key) {
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();
			cabinetStylesArr.$remove(key);
		};

		$scope.removeColor = function (key) {
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();
			cabinetColorsArr.$remove(key);
		};

		/* STRIPE CHECKOUT */

		var handler = StripeCheckout.configure({
			key: 'pk_test_PTQxPyzUAucunSs2MkXAuaPo',
			image: 'http://mocajazz.com/css/images/logo.png',
			locale: 'auto',
			token: function (token) {
				// Use the token to create the charge with a server-side script.
				// You can access the token ID with `token.id`
			}
		});

		$scope.purchase = function () {
			// Open Checkout with further options
			handler.open({
				name: 'Vanbert Kitchens',
				description: 'Please fill out your info.',
				amount: $scope.cartPrice() * 100.00,
				shippingAddress: true,
				billingAddress: true
			});
			e.preventDefault();
		};

		$(window).on('popstate', function () {
			handler.close();
		});

		/* END OF STRIPE CHECKOUT */

	}]);
