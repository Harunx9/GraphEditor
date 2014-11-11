'use strict';
var editorApp = angular.module('EditorApp',['ngRoute', 'EditorControllers', 'EditorServices', 'EditorDirectives']);

editorApp.config(['$routeProvider',
	function($routeProvider) {
	$routeProvider.
		when('/',{
			templateUrl: 'static/templates/main.html',
			controller: 'HomeController'
		}).
		when('/editor',{
			templateUrl: 'static/templates/editor.html',
			controller: 'EditorController'
		}).
		when('/user/:nick',{
			templateUrl: 'static/templates/user.html',
			controller: 'UserController'
		}).
		when('/register',{
			templateUrl: 'static/templates/registration.html',
			controller: 'RegistrationController'
		}).
		when('/changelog',{
			templateUrl: 'static/templates/changelog.html',
			controller: 'ChangeLogController'
		});
}]);
