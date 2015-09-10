var myApp = angular.module('myApp', [
	'ngRoute',
	'ui.router',
	'firebase',
	'appControllers'
]).constant('FIREBASE_URL', 'https://vanbertkitchens.firebaseio.com');

var appControllers = angular.module('appControllers', ['firebase']);

myApp.run(["$rootScope", "$state", function ($rootScope, $state) {
    $rootScope.$on("$stateChangeError", function (event, toState, toParams, fromState, fromParams, error) {
        // We can catch the error thrown when the $requireAuth promise is rejected
        // and redirect the user back to the home page
        if (error === "AUTH_REQUIRED") {
            $state.go("home");
        }
    });
}]);


myApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    Stripe.setPublishableKey('pk_test_PTQxPyzUAucunSs2MkXAuaPo');

    // For any unmatched url, send to /route1
    $urlRouterProvider.otherwise("/home")

    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html'
        })
        /* LOGIN & REGISTER */
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'RegistrationController'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'views/register.html',
            controller: 'RegistrationController'
        })
        /* END OF LOGIN & REGISTER */
        .state('admin', {
            url: '/admin',
            templateUrl: 'views/admin.html',
            resolve: {
                // controller will not be loaded until $requireAuth resolves
                // Auth refers to our $firebaseAuth wrapper in the example above
                "currentAuth": ["Auth", function (Auth) {
                    // $requireAuth returns a promise so the resolve waits for it to complete
                    // If the promise is rejected, it will throw a $stateChangeError (see above)
                    return Auth.$requireAuth();
      }]
            }
        })
        .state('admin.doors', {
            url: '/admin-doors',
            templateUrl: 'views/admin.doors.html',
            controller: 'DoorsController',
            resolve: {
                // controller will not be loaded until $requireAuth resolves
                // Auth refers to our $firebaseAuth wrapper in the example above
                "currentAuth": ["Auth", function (Auth) {
                    // $requireAuth returns a promise so the resolve waits for it to complete
                    // If the promise is rejected, it will throw a $stateChangeError (see above)
                    return Auth.$requireAuth();
      }]
            }
        })
        .state('admin.cabinets', {
            url: '/admin-cabinets',
            templateUrl: 'views/admin.cabinets.html',
            controller: 'CabinetsController',
            resolve: {
                // controller will not be loaded until $requireAuth resolves
                // Auth refers to our $firebaseAuth wrapper in the example above
                "currentAuth": ["Auth", function (Auth) {
                    // $requireAuth returns a promise so the resolve waits for it to complete
                    // If the promise is rejected, it will throw a $stateChangeError (see above)
                    return Auth.$requireAuth();
      }]
            }
        })
        /* DOORS */
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
        .state('doors.all', {
            url: '/all',
            templateUrl: 'views/doors.all.html',
            controller: 'DoorsController'
        })
        /* END OF DOORS */
        /* CABINETS */
        /* END OF CABINETS */
        /* CHECKOUT */

    .state('checkout', {
        url: '/checkout',
        templateUrl: 'views/checkout.html',
        controller: 'StripeController'
    })

    /* END OF CHECKOUT */


}]);
