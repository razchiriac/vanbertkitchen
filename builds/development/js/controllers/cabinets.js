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
				price: $scope.cabinetprice,
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
				$scope.cabinetprice = '';
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
			$scope.selectedColor = key;
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
					width: thisCabinet.width,
					height: thisCabinet.height,
					depth: thisCabinet.depth,
					price: $scope.calcPrice(thisCabinet),
					//imageUrl: thisCabinet.ImageUrl,
					date: Firebase.ServerValue.TIMESTAMP
				};
				// push it to the user's wish list
				wishListArr.$add(tempCabinet);
			}
			//////////////////////
		}; // addToWishList

		$scope.calcPrice = function(thisCabinet) {
			var tempPrice = thisCabinet.category.price + ( thisCabinet.style.price * thisCabinet.width * thisCabinet.height * thisCabinet.depth ) / 100.00;
			return tempPrice;
		};

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

	}]);
