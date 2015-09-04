myApp.controller('DoorsController', ['$scope', '$rootScope', '$firebase', '$firebaseObject', '$firebaseArray', 'FIREBASE_URL',
	function ($scope, $rootScope, $firebase, $firebaseObject, $firebaseArray, FIREBASE_URL) {

        var refDoors            = new Firebase(FIREBASE_URL + '/products/doors');
        var refDoorCategories   = new Firebase(FIREBASE_URL + '/products/door-categories');
        var refDoorStyles       = new Firebase(FIREBASE_URL + '/products/door-styles');

        var doorsObj            = $firebaseObject(refDoors);
        var doorsArr            = $firebaseArray(refDoors);

        var doorCategoriesObj   = $firebaseObject(refDoorCategories);
        var doorCategoriesArr   = $firebaseArray(refDoorCategories);

        var doorStylesObj       = $firebaseObject(refDoorStyles);
        var doorStylesArr       = $firebaseArray(refDoorStyles);

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

        $scope.addDoor = function () {
            var imgUrl = 'http://placehold.it/190x305';
            $scope.doorImageUrl = imgUrl;
            var tempDoor = {
                name:       $scope.doorname,
                category:   $scope.selectedCat,
                style:      $scope.selectedStyle,
                color:      $scope.selectedColor,
                price:      $scope.doorprice,
                imageUrl:   $scope.doorImageUrl,
                date:       Firebase.ServerValue.TIMESTAMP
            };

            doorsArr.$add(tempDoor).then(function (ref) {
                $scope.doorname = '';
                $scope.selectedCat = '';
                $scope.selectedStyle = '';
                $scope.selectedColor = '';
                $scope.doorprice = '';
                $scope.doorImageUrl = '';
            });

            //add category to list of categories

            doorCategoriesArr.$add(tempDoor.category);

        }; //addDoor

        $scope.addCategory = function () {
            var imgUrl = 'http://placehold.it/190x305';
            $scope.categoryImageUrl = imgUrl;
            var tempCategory = {
                name:       $scope.newCategoryName,
                imageUrl:   $scope.categoryImageUrl,
                date:       Firebase.ServerValue.TIMESTAMP
            };
            doorCategoriesArr.$add(tempCategory).then(function (ref) {
                $scope.newCategoryName = '';
                $scope.categoryImageUrl = '';
            });
        }; //addCategory

        $scope.addStyle = function () {
            var imgUrl = 'http://placehold.it/190x305';
            $scope.styleImageUrl = imgUrl;
            var tempStyle = {
                category:   $scope.newStyleCategory,
                name:       $scope.newStyleName,
                imageUrl:   $scope.styleImageUrl,
                date:       Firebase.ServerValue.TIMESTAMP
            };
            doorStylesArr.$add(tempStyle).then(function (ref) {
                $scope.newStyleName = '';
                $scope.styleImageUrl = '';
            });
        }; //addStyle

        $scope.getUniqueCategories = function ( field ) {
            $scope.tempCategories = [];
            angular.forEach( doorCategoriesArr, function ( value, key ) {
                if ( ( $scope.tempCategories.length < 1 ) || ( $.inArray( value, $scope.tempCategories ) < 0 ) ) {
                    if ( field === 'name' || !field ) {
                        $scope.tempCategories.push( value.name );
                    }
                }
            });
            return $scope.tempCategories;
        }; // getUniqueCategories

//  DEPRECATED
//        $scope.getUniqueCats = function () {
//            $scope.tempCats = [];
//            $scope.tempDoors = [];
//            angular.forEach(doorsArr, function (value, key) {
//                if ($scope.tempCats.length < 1) {
//                    $scope.tempCats.push(value.category);
//                    $scope.tempDoors.push(value);
//                } else if (($.inArray(value.category, $scope.tempCats) < 0)) {
//                    $scope.tempCats.push(value.category);
//                    $scope.tempDoors.push(value);
//                }
//            });
//            return [$scope.tempCats, $scope.tempDoors];
//        };

        $scope.getUniqueStyles = function ( selectedCategory ) {
            $scope.tempStyles = [];
            angular.forEach( doorStylesArr, function ( value, key ) {
                if ( ( $scope.tempStyles.length < 1 ) || ( $.inArray( value, $scope.tempStyles ) < 0 ) ) {
                    if ( selectedCategory ) {
                        if ( value.category === selectedCategory ) {
                            $scope.tempStyles.push( value.name );
                        }
                    } else {
                        $scope.tempStyles.push( value.name );
                    }
                }
            });
            return $scope.tempStyles;
        }; // getUniqueStyles

        $scope.getUniqueColors = function (theStyle) {
            $scope.tempColors = [];
            $scope.tempDoors = [];
            angular.forEach(doorsArr, function (value, key) {
                if (value.style === theStyle) {
                    if ($scope.tempColors.length < 1) {
                        $scope.tempColors.push(value.color);
                        $scope.tempDoors.push(value);
                    } else if (($.inArray(value.color, $scope.tempColors) < 0)) {
                        $scope.tempColors.push(value.color);
                        $scope.tempDoors.push(value);
                    }
                }
            });
            return [$scope.tempColors, $scope.tempDoors];
        };

        $scope.getUniqueDoors = function (theColor) {
            $scope.tempDoorNames = [];
            $scope.tempDoors = [];
            angular.forEach(doorsArr, function (value, key) {
                if (value.color === theColor) {
                    if ($scope.tempDoorNames.length < 1) {
                        $scope.tempDoorNames.push(value.name);
                        $scope.tempDoors.push(value);
                    } else if (($.inArray(value.name, $scope.tempDoorNames) < 0)) {
                        $scope.tempDoorNames.push(value.name);
                        $scope.tempDoors.push(value);
                    }
                }
            });
            return [$scope.tempDoorNames, $scope.tempDoors];
        };


        $scope.setCat = function (key) {
            $scope.selectedCat = key;
        };

        $scope.setStyle = function (key) {
            $scope.selectedStyle = key;
        };

        $scope.setColor = function (key) {
            $scope.selectedColor = key;
        };

        $scope.setDoor = function (key) {
            $scope.selectedDoor = key;
        };

        $scope.resetDoor = function () {
            $scope.selectedCat = '';
            $scope.selectedStyle = '';
            $scope.selectedColor = '';
            $scope.selectedDoor = '';
        };

        $scope.removeDoor = function (key) {
            doorsArr.$remove(key);
        };

        $scope.removeCategory = function (key) {
            doorCategoriesArr.$remove(key);
        };

	}]);
