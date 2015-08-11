// let's create a re-usable factory that generates the $firebaseAuth instance
myApp.factory("User", ["$firebaseAuth", "FIREBASE_URL",
  function($firebaseAuth, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL + '/users/');
    return $firebaseAuth(ref);
  }
]);