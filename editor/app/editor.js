var editorApp = angular.module('EditorApp',['ngRoute', 'EditorControllers']);

editorApp.config(['$routeProvider',
	function($routeProvider) {
	$routeProvider.
		when('/welcome',{
			templateUrl: 'templates/main.html',
			controller: 'MainController'
		}).
		when('/:nick/editor',{
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