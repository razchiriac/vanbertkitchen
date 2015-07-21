var myApp = angular.module('myApp', [
	'ngRoute', 
	'ui.router',
	'firebase',
	'appControllers'
]).constant('FIREBASE_URL', 'https://vanbertkitchens.firebaseio.com');

var appControllers = angular.module('appControllers', ['firebase']);

myApp.config(['$stateProvider', '$urlRouterProvider',function($stateProvider, $urlRouterProvider) {

	// For any unmatched url, send to /route1
	$urlRouterProvider.otherwise("/home")

	$stateProvider
	.state('home', {
		url: '/home',
		templateUrl: 'views/home.html'
	})
	.state('doors', {
		url: '/doors',
		templateUrl: 'views/doors.html',
		controller: 'DoorsController'
	})
	.state('doors.category', {
		url: '/category',
		templateUrl: 'views/doors.category.html',
		controller: 'DoorsController'
	})
	.state('doors.style', {
		url: '/style',
		templateUrl: 'views/doors.style.html',
		controller: 'DoorsController'
	})
	.state('doors.color', {
		url: '/color',
		templateUrl: 'views/doors.color.html',
		controller: 'DoorsController'
	})
	.state('doors.door', {
		url: '/door',
		templateUrl: 'views/doors.door.html',
		controller: 'DoorsController'	
	})
	.state('doors.admin', {
		url: '/admin',
		templateUrl: 'views/doors.admin.html',
		controller: 'DoorsController'
	})


}]);