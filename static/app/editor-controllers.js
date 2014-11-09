'use strict';
var editorControllers = angular.module('EditorControllers',[]);


editorControllers.controller('LoginController',
	['$scope', '$location', '$http', 'UserService','ApiService',
	function($scope, $location, $http, UserService, ApiService){
		$scope.isLogin = false

	$scope.login = function(user){
		var url = new ApiService;
		url.model = 'user';
		url.constructQuerry('name', 'eq', user.name);
		$http.get(url.constructUrl())
		.success(function(data,status){
			if(data.objects.length !== 0)
				UserService.isLogged = true;
				$scope.isLogin = true;
				$loacation.path('/user/'+user.name);
		})
		.error(function(data, status){
				//to do error message handling
		});
	}

	$scope.logOut = function(){
		UserService.isLogged = false;
		$scope.isLogin = false;
	}

}]);

editorControllers.controller('HomeController',
	['$scope', '$location',
	function($scope, $location){

}]);

editorControllers.controller('EditorController',
	['$scope', '$location','NodeTool','LineTool','HandTool',
	function($scope, $location, NodeTool, LineTool, HandTool){
	$scope.tool = undefined;
	$scope.graph = undefined;
	if($scope.graph == undefined){
		$scope.graph = {
			nodes:[],
			edges:[]
		}
	}

	$scope.nodeTool = function(){
		if(!$scope.tool instanceof NodeTool)
			$scope.tool = new NodeTool;
	}

	$scope.lineTool = function(){
		if(!$scope.tool instanceof LineTool)
			$scope.tool = new LineTool;
	}

	$scope.handTool = function(){
		if(!$scope.tool instanceof HandTool)
			$scope.tool = new HandTool;
	}

}]);

editorControllers.controller('UserController',
	['$scope', '$location',
	function($scope, $location){
		$scope.userProjects = undefined;

}]);

editorControllers.controller('RegistrationController',
	['$scope', '$location', '$http',
	function($scope, $location, $http){

	$scope.register = function(user){
		$http.post('http://127.0.0.1:5000/api/user', user)
		.success(function(data, status){
			console.log(status)
		})
		.error(function(data, status){
			console.log(status)
		});
	}

}]);
