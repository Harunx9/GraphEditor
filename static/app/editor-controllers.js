'use strict';
var editorControllers = angular.module('EditorControllers',[]);


editorControllers.controller('LoginController',
	['$scope', '$location', '$http', 'UserService','ApiService',
	function($scope, $location, $http, UserService, ApiService){
		$scope.isLogin = false
		$scope.errorMessage = undefined;
		$scope.login = function(user){
			var url = new ApiService;
			url.model = 'user';
			url.constructQuerry('name', 'eq', user.name);
			$http.get(url.constructUrl())//todo auth in python app by post method
			.success(function(data,status){
				if(data.objects.length !== 0){
					UserService.login = user.name;
					UserService.password = user.password;
					UserService.isLogged = true;
					$scope.isLogin = true;
					$location.path('/user/'+user.name);
				}
			})
			.error(function(data, status){
					$scope.errorMessage = 'login or password is incorrect';
			});
		}

		$scope.logOut = function(){
			UserService.isLogged = false;
			$scope.isLogin = false;
			$location.path('/');
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
	['$scope', '$location', '$http', 'UserService', 'ApiService',
	function($scope, $location, $http, UserService){
		$scope.userProjects = undefined;
		$scope.loadMessage = undefined;
		$scope.option = 'MyProjects'
		var api = new ApiService;
		api.model = 'scheme';
		api.constructQuerry('user_name','eq',UserService.login);

		$http.get(api.constructUrl())
		.success(function(data, status){
				if(data.objects.length !== 0)
				{
						$scope.userProjects = data.objects;
				}else{
						$scope.loadMessage = 'You have no projects';
				}
		});
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
