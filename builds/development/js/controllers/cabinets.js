myApp.controller('CabinetsController', ['$scope', '$rootScope', '$firebase', '$firebaseObject', '$firebaseArray', 'FIREBASE_URL',
	function ($scope, $rootScope, $firebase, $firebaseObject, $firebaseArray, FIREBASE_URL) {

		var refCabinets = new Firebase(FIREBASE_URL + '/products/cabinets');
		var refCabinetCategories = new Firebase(FIREBASE_URL + '/products/cabinet-categories');
		var refCabinetStyles = new Firebase(FIREBASE_URL + '/products/cabinet-styles');
		var refCabinetColors = new Firebase(FIREBASE_URL + '/products/cabinet-colors');

		var cabinetsObj = $firebaseObject(refCabinets);
		var cabinetsArr = $firebaseArray(refCabinets);

		var cabinetCategoriesObj = $firebaseObject(refCabinetCategories);
		var cabinetCategoriesArr = $firebaseArray(refCabinetCategories);

		var cabinetStylesObj = $firebaseObject(refCabinetStyles);
		var cabinetStylesArr = $firebaseArray(refCabinetStyles);

		var cabinetColorsObj = $firebaseObject(refCabinetColors);
		var cabinetColorsArr = $firebaseArray(refCabinetColors);

		cabinetsObj.$loaded().then(function (data) {
			$scope.cabinets = data;
			cabinetsObj.$bindTo($scope, 'cabinets');
		}); // make sure cabinets object data has loaded

		cabinetsArr.$loaded().then(function (data) {
			$scope.cabinetsArr = data;
			cabinetsArr.$bindTo($scope, 'cabinetsArray');
		}); // make sure cabinets array data has loaded

		cabinetCategoriesObj.$loaded().then(function (data) {
			$scope.cabinetCategories = data;
			cabinetCategoriesObj.$bindTo($scope, 'cabinetCategories');
		}); // make sure cabinets object data has loaded

		cabinetCategoriesArr.$loaded().then(function (data) {
			$scope.cabinetCategoriesArr = data;
			cabinetCategoriesArr.$bindTo($scope, 'cabinetCategoriesArray');
		}); // make sure cabinets array data has loaded

		cabinetStylesObj.$loaded().then(function (data) {
			$scope.cabinetStyles = data;
			cabinetStylesObj.$bindTo($scope, 'cabinetStyles');
		}); // make sure cabinets object data has loaded

		cabinetStylesArr.$loaded().then(function (data) {
			$scope.cabinetStylesArr = data;
			cabinetStylesArr.$bindTo($scope, 'cabinetStylesArray');
		}); // make sure cabinets array data has loaded

		cabinetColorsObj.$loaded().then(function (data) {
			$scope.cabinetColors = data;
			cabinetColorsObj.$bindTo($scope, 'cabinetColors');
		}); // make sure cabinets object data has loaded

		cabinetColorsArr.$loaded().then(function (data) {
			$scope.cabinetColorsArr = data;
			cabinetColorsArr.$bindTo($scope, 'cabinetColorsArray');
		}); // make sure cabinets array data has loaded

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

		$scope.cabinetWishList = [];

		$scope.addToWishList = function (thisCabinet) {
			//////////////////////
			var tempCabinet = {
				name: thisCabinet.name,
				category: thisCabinet.category,
				style: thisCabinet.style,
				color: $scope.chosenColor,
				width: thisCabinet.width,
				height: thisCabinet.height,
				depth: thisCabinet.depth,
				price: $scope.cabinetprice,
				imageUrl: thisCabinet.ImageUrl,
				date: Firebase.ServerValue.TIMESTAMP
			};
			$scope.cabinetWishList.push(tempCabinet);

//			cabinetsArr.$add(tempCabinet).then(function (ref) {
//
//			});
			//////////////////////

		}; // addToWishList

		$scope.removeFromWishList = function (thisCabinet) {
			$('body').removeClass('modal-open');
			$('.modal-backdrop').remove();
			$scope.cabinetWishList.pop(thisCabinet);
		};

		$scope.addCategory = function () {
			var imgUrl = 'http://placehold.it/190x305';
			$scope.categoryImageUrl = imgUrl;
			var tempCategory = {
				name: $scope.newCategoryName,
				imageUrl: $scope.categoryImageUrl,
				date: Firebase.ServerValue.TIMESTAMP
			};
			cabinetCategoriesArr.$add(tempCategory).then(function (ref) {
				$scope.newCategoryName = '';
				$scope.categoryImageUrl = '';
			});
		}; //addCategory

		$scope.addStyle = function () {
			var imgUrl = 'http://placehold.it/190x305';
			$scope.styleImageUrl = imgUrl;
			var tempStyle = {
				category: $scope.newStyleCategory,
				name: $scope.newStyleName,
				imageUrl: $scope.styleImageUrl,
				date: Firebase.ServerValue.TIMESTAMP
			};
			cabinetStylesArr.$add(tempStyle).then(function (ref) {
				$scope.newStyleName = '';
				$scope.styleImageUrl = '';
			});
		}; //addStyle

		$scope.addColor = function () {
			var imgUrl = 'http://placehold.it/190x305';
			$scope.colorImageUrl = imgUrl;
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
						$scope.tempCategories.push(value.name);
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
			}
			// End style filter

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
