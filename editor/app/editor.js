var editorApp = angular.module('EditorApp',['ngRoute', 'EditorControllers']);

editorApp.config(['$routeProvider',
	function($routeProvider) {
	$routeProvider.
		when('/',{
			templateUrl: 'templates/main.html',
			controller: 'HomeController'
		}).
		when('/editor',{
			templateUrl: 'templates/editor.html',
			controller: 'EditorController'
		}).
		when('/user/:nick',{
			templateUrl: 'templates/user.html',
			controller: 'UserController'
		}).
		when('/register',{
			templateUrl: 'templates/registration.html',
			controller: 'RegistrationController'
		}).
		when('/login',{
			templateUrl: 'templates/login.html',
			controller: 'LoginController'
		});
}]);