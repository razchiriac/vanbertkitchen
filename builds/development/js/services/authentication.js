myApp.factory('Authentication', function($firebase, 
	$firebaseAuth, $routeParams, $rootScope, $location, FIREBASE_URL) {

	var ref 	= new Firebase(FIREBASE_URL);
	var auth 	= $firebaseAuth(ref);

	auth.$onAuth(function(authUser) {
		if(authUser) {	//logged in
			var ref = new Firebase(FIREBASE_URL + '/users/' + authUser.uid);
			var user = $firebase(ref).$asObject();
			$rootScope.currentUser = user;
		} else { 		//logged out
			$rootScope.currentUser = '';
		}
	});

	// temporary object
	var myObject = {

		login: function(user) {
			return auth.$authWithPassword({
				email 		: user.email,
				password 	: user.password
			});
		}, // login

		logout: function(user) {
			return auth.$unauth();
		}, // logout

		register: function(user) {
			return auth.$createUser({
				email 		: user.email,
				password 	: user.password
			}).then(function(regUser){
				var ref 			= new Firebase(FIREBASE_URL + '/users');
				var firebaseUsers 	= $firebase(ref);

				var userInfo = {
					date 		: Firebase.ServerValue.TIMESTAMP,
					regUser 	: regUser.uid,
					firstname 	: user.firstname,
					lastname 	: user.lastname,
					email 		: user.email
				}; //user info

				firebaseUsers.$set(regUser.uid, userInfo);
			}); //promise
		},

		requireAuth: function() {
			return auth.$requireAuth();
		}, // require authentication

		waitForAuth: function() {
			return auth.$waitForAuth();
		} // wait until user is authenticated

	}; // myObject
	return myObject;
}); // myApp Factory