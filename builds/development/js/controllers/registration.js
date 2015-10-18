myApp.controller('RegistrationController', ["$scope", "$rootScope", "$firebaseAuth", "$location", "Auth", "FIREBASE_URL",
	function ($scope, $rootScope, $firebaseAuth, $location, Auth, FIREBASE_URL) {

		$rootScope.auth = Auth;



		$rootScope.login = function (provider) {
			$rootScope.authData = null;
			$rootScope.error = null;
			if (provider) {
				Auth.$authWithOAuthPopup(provider, function (error, authData) {
					if (error) {
						console.log("Login Failed!", error);
					} else {
						$location.path("/home");
						$rootScope.user.fname = authData.google.displayName;
						console.log("Authenticated successfully with payload:", authData);
					}
				});
			} else {
				Auth.$authWithPassword({
					email: $rootScope.user.email,
					password: $rootScope.user.password
				}).then(function (authData) {
					$rootScope.authData = authData;
					$location.path("/home");
				}).catch(function (error) {
					$rootScope.error = error;
				});
			}
		};


		$rootScope.register = function () {
			$rootScope.authData = null;
			$rootScope.error = null;

			Auth.$createUser({
				email: $rootScope.user.email,
				password: $rootScope.user.password,
				fname: $rootScope.user.fname,
				lname: $rootScope.user.lname
			}).then(function (authData) {
				$rootScope.login();
				$rootScope.authData = authData;
				$location.path("/home");
			}).catch(function (error) {
				$rootScope.error = error;
			});
		};

		$rootScope.logout = function () {
			Auth.unauth();
			$location.path("/home");
		};

		$rootScope.checkRole = function (id) {
			if (id === "103811676446098468781" || id === "102571556401844835615") return true
			return false
		};

		// any time auth status updates, add the user data to scope
		$rootScope.auth.$onAuth(function (authData) {
			$rootScope.authData = authData;
			$rootScope.wishListInit();
			$rootScope.cartInit();

		});

}]); //RegistrationController
