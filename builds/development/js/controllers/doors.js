myApp.controller('DoorsController', ['$scope', '$rootScope', '$firebaseObject', '$firebaseArray', 'FIREBASE_URL', 
	function($scope, $rootScope, $firebaseObject, $firebaseArray, FIREBASE_URL) {

		var refDoors = new Firebase(FIREBASE_URL + '/products/doors');

		var doorsObj = $firebaseObject(refDoors);
		var doorsArr = $firebaseArray(refDoors);

		doorsObj.$loaded().then(function(data) {
			$scope.doors = data;
		}); // make sure doors data has loaded

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

		$rootScope.setCat = function(key) {
			var thisCat = $scope.selectedCat = doorsArr.$getRecord(key).category;
			$rootScope.selectedCat = thisCat;
		};

		$rootScope.setStyle = function(key) {
			var thisStyle = $scope.selectedStyle = doorsArr.$getRecord(key).style;
			$rootScope.selectedStyle = thisStyle;
		};

		$rootScope.setColor = function(key) {
			var thisColor = $scope.selectedColor = doorsArr.$getRecord(key).color;
			$rootScope.selectedColor = thisColor;
		};

		$rootScope.setDoor = function(key) {
			var thisDoor = $scope.selectedDoor = doorsArr.$getRecord(key).name;
			$rootScope.selectedDoor = thisDoor;
		};

		$scope.resetDoor = function() {
			$rootScope.selectedCat = '';
			$rootScope.selectedStyle = '';
			$rootScope.selectedColor = '';
			$rootScope.selectedDoor = '';
		};

		$rootScope.deleteDoor = function(door) {
			alert('1')
			var item = doorsArr.$indexFor(door);
			alert('2')
			doorsArr.$remove(item);
			alert('3')
		}; //deleteDoor

	}]);