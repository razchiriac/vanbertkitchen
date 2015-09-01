myApp.controller('DoorsController', ['$scope', '$rootScope', '$firebase', '$firebaseObject', '$firebaseArray', 'FIREBASE_URL',
	function ($scope, $rootScope, $firebase, $firebaseObject, $firebaseArray, FIREBASE_URL) {

        var refDoors = new Firebase(FIREBASE_URL + '/products/doors');

        var doorsObj = $firebaseObject(refDoors);
        var doorsArr = $firebaseArray(refDoors);

        doorsObj.$loaded().then(function (data) {
            $scope.doors = data;
            doorsObj.$bindTo($scope, 'doors');
        }); // make sure doors data has loaded



        doorsArr.$loaded().then(function (data) {
            $scope.doorsArr = data;
            doorsArr.$bindTo($scope, 'doorsArray');
        });

        $scope.addDoor = function () {
            var imgUrl = 'http://placehold.it/190x305';
            $scope.doorImageUrl = imgUrl;
            var tempDoor = {
                name: $scope.doorname,
                category: $scope.selectedCat.category,
                style: $scope.selectedStyle.style,
                color: $scope.selectedColor.color,
                price: $scope.doorprice,
                imageUrl: $scope.doorImageUrl,
                date: Firebase.ServerValue.TIMESTAMP
            };

            doorsArr.$add(tempDoor).then(function (ref) {
                $scope.doorname = '';
                $scope.selectedCat.category = '';
                $scope.selectedStyle.style = '';
                $scope.selectedColor.color = '';
                $scope.doorprice = '';
                $scope.doorImageUrl = '';
            });

        }; //addDoor

        $rootScope.getUniqueCats = function () {
            $rootScope.tempCats = [];
            $rootScope.tempDoors = [];
            angular.forEach(doorsArr, function (value, key) {
                if ($rootScope.tempCats.length < 1) {
                    $rootScope.tempCats.push(value.category);
                    $rootScope.tempDoors.push(value);
                } else if (($.inArray(value.category, $rootScope.tempCats) < 0)) {
                    $rootScope.tempCats.push(value.category);
                    $rootScope.tempDoors.push(value);
                }
            });
            return [$rootScope.tempCats, $rootScope.tempDoors];
        };

        $rootScope.getUniqueStyles = function (cat) {
            $rootScope.tempStyles = [];
            $rootScope.tempDoors = [];
            angular.forEach(doorsArr, function (value, key) {
                if (value.category === cat) {
                    if ($rootScope.tempStyles.length < 1) {
                        $rootScope.tempStyles.push(value.category);
                        $rootScope.tempDoors.push(value);
                    } else if (($.inArray(value.style, $rootScope.tempStyles) < 0)) {
                        $rootScope.tempStyles.push(value.style);
                        $rootScope.tempDoors.push(value);
                    }
                }
            });
            return [$rootScope.tempStyles, $rootScope.tempDoors];
        };

        $rootScope.getUniqueColors = function (theStyle) {
            $rootScope.tempColors = [];
            $rootScope.tempDoors = [];
            angular.forEach(doorsArr, function (value, key) {
                if (value.style === theStyle) {
                    if ($rootScope.tempColors.length < 1) {
                        $rootScope.tempColors.push(value.color);
                        $rootScope.tempDoors.push(value);
                    } else if (($.inArray(value.color, $rootScope.tempColors) < 0)) {
                        $rootScope.tempColors.push(value.color);
                        $rootScope.tempDoors.push(value);
                    }
                }
            });
            return [$rootScope.tempColors, $rootScope.tempDoors];
        };

        $rootScope.getUniqueDoors = function (theColor) {
            $rootScope.tempDoorNames = [];
            $rootScope.tempDoors = [];
            angular.forEach(doorsArr, function (value, key) {
                if (value.color === theColor) {
                    if ($rootScope.tempDoorNames.length < 1) {
                        $rootScope.tempDoorNames.push(value.name);
                        $rootScope.tempDoors.push(value);
                    } else if (($.inArray(value.name, $rootScope.tempDoorNames) < 0)) {
                        $rootScope.tempDoorNames.push(value.name);
                        $rootScope.tempDoors.push(value);
                    }
                }
            });
            return [$rootScope.tempDoorNames, $rootScope.tempDoors];
        };


        $rootScope.setCat = function (key) {
            $rootScope.selectedCat = key;
        };

        $rootScope.setStyle = function (key) {
            $rootScope.selectedStyle = key;
        };

        $rootScope.setColor = function (key) {
            $rootScope.selectedColor = key;
        };

        $rootScope.setDoor = function (key) {
            $rootScope.selectedDoor = key;
        };

        $scope.resetDoor = function () {
            $rootScope.selectedCat = '';
            $rootScope.selectedStyle = '';
            $rootScope.selectedColor = '';
            $rootScope.selectedDoor = '';
        };

        $scope.removeDoor = function (key) {
            doorsArr.$remove(key);
        };




	}]);
