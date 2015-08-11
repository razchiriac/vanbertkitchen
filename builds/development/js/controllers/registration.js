myApp.controller('RegistrationController', ["$scope", "$firebaseAuth", "$location", "Auth", "FIREBASE_URL",
	function ($scope, $firebaseAuth, $location, Auth, FIREBASE_URL) {

		$scope.auth = Auth;

		$scope.login = function (provider) {
			$scope.authData = null;
			$scope.error = null;
			if (provider) {
				Auth.$authWithOAuthPopup(provider, function (error, authData) {
					if (error) {
						console.log("Login Failed!", error);
					} else {
						$location.path("/home");
						$scope.user.fname = authData.google.displayName;
						console.log("Authenticated successfully with payload:", authData);
					}
				});
			} else {
				Auth.$authWithPassword({
					email: $scope.user.email,
					password: $scope.user.password
				}).then(function (authData) {
					$scope.authData = authData;
					$location.path("/home");
				}).catch(function (error) {
					$scope.error = error;
				});
			}
		};

		$scope.register = function () {
			$scope.authData = null;
			$scope.error = null;

			Auth.$createUser({
				email: $scope.user.email,
				password: $scope.user.password,
				fname: $scope.user.fname,
				lname: $scope.user.lname
			}).then(function (authData) {
				$scope.login();
				$scope.authData = authData;
				$location.path("/home");
			}).catch(function (error) {
				$scope.error = error;
			});
		};

		$scope.logout = function () {
			Auth.unauth();
		};

		// any time auth status updates, add the user data to scope
		$scope.auth.$onAuth(function (authData) {
			$scope.authData = authData;
		});

}]); //RegistrationController