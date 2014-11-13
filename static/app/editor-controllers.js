'use strict';
var editorControllers = angular.module('EditorControllers',[]);


editorControllers.controller('LoginController',
	['$scope', '$location', '$http', 'UserService',
	function($scope, $location, $http, UserService){
		$scope.isLogin = false
		$scope.errorMessage = undefined;

		$scope.login = function(user){
			$http.post('http://127.0.0.1:5000/userlogin', angular.copy(user))
			.success(function(data, status){
				$scope.isLogin = data.isLogged;
				UserService.isLogged = data.isLogged;
				UserService.user_name = data.user_name;
				$location.path('/user');
			})
			.error(function(data, status){
				$scope.errorMessage = 'login or password is incorrect';
			});
		}

		$scope.logOut = function(){
			UserService.isLogged = false;
			UserService.user_name = '';
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
	'CanvasService','ProjectService', 'UserService', 'UpdateService',
	function($scope, $location, $http, NodeTool, LineTool, HandTool,
		CanvasService, ProjectService, UserService, UpdateService){
	if(UserService.isLogged)
	{
		$scope.canvasWidth = CanvasService.width;
		$scope.canvasHeight = CanvasService.height;

		$scope.tool = undefined;
		$scope.toolOption = undefined;
		$scope.graph = undefined;
		if($scope.graph == undefined){
			$scope.graph = ProjectService.scheme_body;
		}

		$scope.changeNodeType = function(nodeType){
			$scope.tool.nodeType = nodeType;
		}

		$scope.nodeTool = function(){
				$scope.toolOption = 'NodeTool';
				$scope.tool = new NodeTool;
		}

		$scope.lineTool = function(){
				$scope.toolOption = 'LineTool';
				$scope.tool = new LineTool;
		}

		$scope.handTool = function(){
				$scope.toolOption = undefined;
				$scope.tool = new HandTool;
		}

		$scope.saveProject = function(){
			ProjectService.scheme_body = JSON.stringify($scope.graph);
			ProjectService.creation_date = new Date();
			ProjectService.project_width = $scope.canvasWidth;
			ProjectService.project_height = $scope.canvasHeight;
			$http.post('http://127.0.0.1:5000/api/scheme', angular.copy(ProjectService))
			.success(function(data, status){
				$location.path('/user')
			})
			.error(function(data, status){
				//TODO error handling
			});
		}

		$scope.updateProject = function(){
			ProjectService.scheme_body = JSON.stringify($scope.graph);
			$http.put('http://127.0.0.1:5000/api/scheme/'+UpdateService.id, angular.copy(ProjectService))
			.success(function(data, status){
				$location.path('/user');
			})
			.error(function(data, status){
				//TODO error handling
			});
		}
	}else{
		$location.path('/');
	}
}]);

editorControllers.controller('UserController',
	['$scope', '$location', '$http', 'UserService', 'ApiService',
	'CanvasService','ProjectService', 'UpdateService',
	function($scope, $location, $http, UserService, ApiService,
		CanvasService, ProjectService, UpdateService){
	if(UserService.isLogged)
	{
		$scope.userProjects = undefined;
		$scope.loadMessage = undefined;
		$scope.option = 'MyProjects';

		var api = new ApiService;
		api.model = 'scheme';
		api.constructQuerry('user_name','eq',UserService.user_name);

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
			UpdateService.id = 0;
			UpdateService.toUpdate = false;
			ProjectService.scheme_name = project.name;
			ProjectService.user_name = UserService.user_name;
			ProjectService.scheme_body = {
				nodes:[],
				edges:[]
			}
			$location.path('/editor');
		}

		$scope.loadProject = function(project_id){
			$http.get("http://127.0.0.1:5000/api/scheme/"+project_id)
			.success(function(data, status){
				UpdateService.id = project_id;
				UpdateService.toUpdate = true;
				ProjectService.scheme_name = data.scheme_name;
				ProjectService.scheme_body = JSON.parse(data.scheme_body);
				ProjectService.user_name = data.user_name;
				ProjectService.deleted = data.deleted;
				ProjectService.creation_date = data.creation_date;
				ProjectService.project_width = data.project_width;
				ProjectService.project_height = data.project_height;
				CanvasService.width = data.project_width;
				CanvasService.height = data.project_height;
				$location.path('/editor');
			})
			.error(function(data, status){
				//TODO error handling
			});
		}

		$scope.deleteProject = function(project_id){
			$http.delete('http://127.0.0.1:5000/api/scheme/'+project_id)
			.success(function(data, status){
				//delete $scope.userProjects[project_id];
			})
			.error(function(data, status){

			});
		}
	}else{
		$location.path('/');
	}
}]);

editorControllers.controller('RegistrationController',
	['$scope', '$location', '$http',
	function($scope, $location, $http){
	$scope.errorMessage = undefined;

	$scope.register = function(user){
		$http.post('http://127.0.0.1:5000/api/user', user)
		.success(function(data, status){
			if($scope.errorMessage !== undefined)
				$scope.errorMessage = undefined;
			$location.path('/');
		})
		.error(function(data, status){
			$scope.errorMessage = 'This user name is exist choose different';
		});
	}

}]);

editorControllers.controller('ChangeLogController',
	['$scope', '$http', '$location',
	function($scope, $http, $location){
			$scope.changeLog = undefined;
			$http.get('http://127.0.0.1:5000/api/log')
			.success(function(data, status){
				$scope.changeLog = data.objects;
			})
			.error(function(data, status){
				$scope.errorMessage = 'Ops something went wrong!';
			});
}]);
