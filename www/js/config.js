'use strict';

angular.module('appTest').config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('signin', {
		url: '/signin',
		templateUrl: 'views/users/login.html',
		controller: 'UserController'
	});

	$stateProvider.state('signup', {
		url: '/signup',
		templateUrl: 'views/users/signup.html',
		controller: 'UserController'
	});

	$stateProvider.state('home', {
		url: '/home',
		templateUrl: 'views/home/home.html',
		controller: 'UserController'
	});

	$urlRouterProvider.otherwise('/signin');

}).run(function($ionicPlatform, $ionicPopup, $cordovaNetwork) {
   $ionicPlatform.ready(function() {
   	
  //     if ($cordovaNetwork.isOffline()) {
  //        $ionicPopup.confirm({
  //           title: "Internet is not working",
  //           content: "Internet is not working on your device."
  //        }).then(function(result) {
		// 	if(!result) {
		// 		ionic.Platform.exitApp()
		// 	};
		// });
  //    }

   });

});