myApp.controller('DoorsController', ['$scope', '$rootScope', '$firebase', '$firebaseObject', '$firebaseArray', 'FIREBASE_URL', 
	function($scope, $rootScope, $firebase, $firebaseObject, $firebaseArray, FIREBASE_URL) {

		var refDoors = new Firebase(FIREBASE_URL + '/products/doors');

		var doorsObj = $firebaseObject(refDoors);
		var doorsArr = $firebaseArray(refDoors);

		doorsObj.$loaded().then(function(data) {
			$scope.doors = data;
			doorsObj.$bindTo($scope, 'doors');
		}); // make sure doors data has loaded

		

		doorsArr.$loaded().then(function(data) {
			$scope.doorsArr = data;
			doorsArr.$bindTo($scope, 'doorsArray');
		});

		$scope.addDoor = function() {
			var tempDoor = {
				name: $scope.doorname,
				category: $scope.doorcategory,
				style: $scope.doorstyle,
				width: $scope.doorwidth,
				height: $scope.doorheight, 
				color: $scope.doorcolor,
				price: $scope.doorprice,
				date: Firebase.ServerValue.TIMESTAMP
			}

			doorsArr.$add(tempDoor).then(function(ref) {
				$scope.doorname = '';
				$scope.doorcategory = '';
				$scope.doorstyle = '';
				$scope.doorcolor = '';
				$scope.doorwidth = '';
				$scope.doorheight = '';
				$scope.doorprice = '';
			});

		}; //addDoor

		$rootScope.getUniqueCats = function() {
			var tempCats = [];
			$rootScope.tempDoors = [];
			angular.forEach(doorsArr, function(value, key) {
				if(tempCats.length < 1) {
					tempCats.push(value.category);
					$rootScope.tempDoors.push(value);
				} else if ( ($.inArray( value.category, tempCats ) < 0) ){
					tempCats.push(value.category);
					$rootScope.tempDoors.push(value);
				}
			});
			return [tempCats,$rootScope.tempDoors];
		};

		$rootScope.getUniqueStyles = function(cat) {
			var tempStyles = [];
			$rootScope.tempDoors = [];
			angular.forEach(doorsArr, function(value, key) {
				if( value.category === cat ) {
					if(tempStyles.length < 1) {
						tempStyles.push(value.category);
						$rootScope.tempDoors.push(value);
					} else if ( ($.inArray( value.style, tempStyles ) < 0) ){
						tempStyles.push(value.style);
						$rootScope.tempDoors.push(value);
					}
				}
			});
			return [tempStyles,$rootScope.tempDoors];
		};

		$rootScope.getUniqueColors = function(theStyle) {
			var tempColors = [];
			var tempDoors = [];
			angular.forEach(doorsArr, function(value, key) {
				if( value.style === theStyle ) {
					if(tempColors.length < 1) {
						tempColors.push(value.color);
						tempDoors.push(value);
					} else if ( ($.inArray( value.color, tempColors ) < 0) ){
						tempColors.push(value.color);
						tempDoors.push(value);
					}
				}
			});
			return [tempColors,tempDoors];
		};

		$rootScope.getUniqueDoors = function(theColor) {
			var tempDoorNames = [];
			var tempDoors = [];
			angular.forEach(doorsArr, function(value, key) {
				if( value.color === theColor ) {
					if(tempDoorNames.length < 1) {
						tempDoorNames.push(value.name);
						tempDoors.push(value);
					} else if ( ($.inArray( value.name, tempDoorNames ) < 0) ){
						tempDoorNames.push(value.name);
						tempDoors.push(value);
					}
				}
			});
			return [tempDoorNames,tempDoors];
		};

		$rootScope.setCat = function(key) {
			$rootScope.selectedCat = key;
		};

		$rootScope.setStyle = function(key) {
			$rootScope.selectedStyle = key;
		};

		$rootScope.setColor = function(key) {
			$rootScope.selectedColor = key;
		};

		$rootScope.setDoor = function(key) {
			$rootScope.selectedDoor = key;
		};

		$scope.resetDoor = function() {
			$rootScope.selectedCat = '';
			$rootScope.selectedStyle = '';
			$rootScope.selectedColor = '';
			$rootScope.selectedDoor = '';
		};

		$scope.removeDoor = function(key) {
			doorsArr.$remove(key);
		};


	}]);