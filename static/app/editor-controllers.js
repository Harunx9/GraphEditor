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
					$location.path('/user');
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
