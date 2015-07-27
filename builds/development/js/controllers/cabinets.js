myApp.controller('CabinetsController', ['$scope', '$rootScope', '$firebase', '$firebaseObject', '$firebaseArray', 'FIREBASE_URL', 
	function($scope, $rootScope, $firebase, $firebaseObject, $firebaseArray, FIREBASE_URL) {

		var refCabinets = new Firebase(FIREBASE_URL + '/products/cabinets');

		var cabinetsObj = $firebaseObject(refCabinets);
		var cabinetsArr = $firebaseArray(refCabinets);

		cabinetsObj.$loaded().then(function(data) {
			$scope.cabinets = data;
			cabinetsObj.$bindTo($scope, 'cabinets');
		}); // make sure cabinets data has loaded

		cabinetsArr.$loaded().then(function(data) {
			$scope.cabinetsArr = data;
			cabinetsArr.$bindTo($scope, 'cabinetsArray');
		});

		$scope.addCabinet = function() {
			var imgUrl = 'http://placehold.it/190x305';
			if( $scope.cabinetImageUrl === '' ) { $scope.cabinetImageUrl = imgUrl }; 
			var tempCabinet = {
				name 		: $scope.cabinetname,
				category 	: $scope.cabinetcategory,
				style 		: $scope.cabinetstyle,
				color 		: $scope.cabinetcolor,
				width 		: $scope.cabinetwidth,
				height 		: $scope.cabinetheight, 
				price 		: $scope.cabinetprice,
				imageUrl 	: $scope.cabinetImageUrl,
				date 		: Firebase.ServerValue.TIMESTAMP
			}

			cabinetsArr.$add(tempCabinet).then(function(ref) {
				$scope.cabinetname 		= '';
				$scope.cabinetcategory 	= '';
				$scope.cabinetstyle 	= '';
				$scope.cabinetcolor 	= '';
				$scope.cabinetwidth 	= '';
				$scope.cabinetheight 	= '';
				$scope.cabinetprice 	= '';
				$scope.cabinetImageUrl 	= '';
			});

		}; //addCabinet

		$scope.getUniqueCats = function() {
			$scope.tempCats = [];
			$scope.tempCabinets = [];
			angular.forEach(cabinetsArr, function(value, key) {
				if($scope.tempCats.length < 1) {
					$scope.tempCats.push(value.category);
					$scope.tempCabinets.push(value);
				} else if ( ($.inArray( value.category, $scope.tempCats ) < 0) ){
					$scope.tempCats.push(value.category);
					$scope.tempCabinets.push(value);
				}
			});
			return [$scope.tempCats,$scope.tempCabinets];
		};

		$scope.getUniqueStyles = function(cat) {
			$scope.tempStyles = [];
			$scope.tempCabinets = [];
			angular.forEach(cabinetsArr, function(value, key) {
				if( value.category === cat ) {
					if($scope.tempStyles.length < 1) {
						$scope.tempStyles.push(value.category);
						$scope.tempCabinets.push(value);
					} else if ( ($.inArray( value.style, $scope.tempStyles ) < 0) ){
						$scope.tempStyles.push(value.style);
						$scope.tempCabinets.push(value);
					}
				}
			});
			return [$scope.tempStyles,$scope.tempCabinets];
		};

		$scope.getUniqueColors = function(theStyle) {
			$scope.tempColors = [];
			$scope.tempCabinets = [];
			angular.forEach(cabinetsArr, function(value, key) {
				if( value.style === theStyle ) {
					if($scope.tempColors.length < 1) {
						$scope.tempColors.push(value.color);
						$scope.tempCabinets.push(value);
					} else if ( ($.inArray( value.color, $scope.tempColors ) < 0) ){
						$scope.tempColors.push(value.color);
						$scope.tempCabinets.push(value);
					}
				}
			});
			return [$scope.tempColors,$scope.tempCabinets];
		};

		$scope.getUniqueCabinets = function(theColor) { 
			$scope.tempCabinetNames = [];
			$scope.tempCabinets = [];
			angular.forEach(cabinetsArr, function(value, key) {
				if( value.color === theColor ) {
					if($scope.tempCabinetNames.length < 1) {
						$scope.tempCabinetNames.push(value.name);
						$scope.tempCabinets.push(value);
					} else if ( ($.inArray( value.name, $scope.tempCabinetNames ) < 0) ){
						$scope.tempCabinetNames.push(value.name);
						$scope.tempCabinets.push(value);
					}
				}
			});
			return [$scope.tempCabinetNames,$scope.tempCabinets];
		};


		$scope.setCat = function(key) {
			$scope.selectedCat = key;
		};

		$scope.setStyle = function(key) {
			$scope.selectedStyle = key;
		};

		$scope.setColor = function(key) {
			$scope.selectedColor = key;
		};

		$scope.setCabinet = function(key) {
			$scope.selectedCabinet = key;
		};

		$scope.resetCabinet = function() {
			$scope.selectedCat = '';
			$scope.selectedStyle = '';
			$scope.selectedColor = '';
			$scope.selectedCabinet = '';
		};

		$scope.removeCabinet = function(key) {
			cabinetsArr.$remove(key);
		};

		


	}]);