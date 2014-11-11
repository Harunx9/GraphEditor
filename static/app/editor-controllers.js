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
	['$scope', '$location', '$http','NodeTool','LineTool','HandTool',
	'CanvasService','ProjectService', 'UserService',
	function($scope, $location, $http, NodeTool, LineTool, HandTool,
		CanvasService, ProjectService, UserService){
		$scope.canvasWidth = CanvasService.width;
		$scope.canvasHeight = CanvasService.height;

		$scope.tool = undefined;
		$scope.graph = undefined;

		if($scope.graph == undefined){
			$scope.graph = ProjectService.scheme_body;
			console.log($scope.graph);
		}

		$scope.nodeTool = function(){
				$scope.tool = new NodeTool;
		}

		$scope.lineTool = function(){

				$scope.tool = new LineTool;
		}

		$scope.handTool = function(){
				$scope.tool = new HandTool;
		}

		$scope.saveProject = function(){
			ProjectService.scheme_body = JSON.stringify($scope.graph);
			ProjectService.creation_date = new Date();
			console.log(angular.copy(ProjectService));
			$http.post('http://127.0.0.1:5000/api/scheme', angular.copy(ProjectService))
			.success(function(data, status){
				$location.path('/user/'+UserService.login)
			})
			.error(function(data, status){
				//TODO error handling
			});
		}
}]);

editorControllers.controller('UserController',
	['$scope', '$location', '$http', 'UserService', 'ApiService',
	'CanvasService','ProjectService',
	function($scope, $location, $http, UserService, ApiService,
		CanvasService, ProjectService){
		$scope.userProjects = undefined;
		$scope.loadMessage = undefined;
		$scope.option = 'MyProjects';

		var api = new ApiService;
		api.model = 'scheme';
		api.constructQuerry('user_name','eq',UserService.login);

		$http.get(api.constructUrl())
		.success(function(data, status){
				if(data.objects.length !== 0){
						$scope.userProjects = data.objects;
				}else{
						$scope.loadMessage = 'You have no projects';
				}
		});

		$scope.myProjects = function(){
			$scope.option = 'MyProjects';
		}

		$scope.newProject = function(){
			$scope.option = 'NewProject';
		}

		$scope.createProject = function(project){
			CanvasService.width = project.width;
			CanvasService.height = project.height;
			ProjectService.scheme_name = project.name;
			ProjectService.user_name = UserService.login;
			ProjectService.scheme_body = {
				nodes:[],
				edges:[]
			}
			$location.path('/editor');
		}

		$scope.loadProject = function(project_id){
			$http.get("http://127.0.0.1:5000/api/scheme/"+project_id)
			.success(function(data, status){
				ProjectService = data;
				$location.path('/editor');
			})
			.error(function(data, status){
				//TODO error handling
			});
		}
}]);

editorControllers.controller('RegistrationController',
	['$scope', '$location', '$http',
	function($scope, $location, $http){

	$scope.register = function(user){
		$http.post('http://127.0.0.1:5000/api/user', user)
		.success(function(data, status){
			$location.path('/');
		})
		.error(function(data, status){
			console.log(status)
		});
	}

}]);
