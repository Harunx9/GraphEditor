var editorControllers = angular.module('EditorControllers',[]);


editorControllers.controller('LoginController',
	['$scope', '$location', '$http', 'UserService',
	function($scope, $location, $http, UserService){

	$scope.login = function(user){
		$http.get('http://127.0.0.1:5000/api/user?p='+user)
		.success(function(status){
			UserService.isLogged = true;
		});
	}

}]);

editorControllers.controller('HomeController',
	['$scope', '$location',
	function($scope, $location){

}]);

editorControllers.controller('EditorController',
	['$scope', '$location','NodeTool','LineTool',
	function($scope, $location, NodeTool, LineTool){
	$scope.tool = undefined;
	$scope.graph = undefined;
	if($scope.graph == undefined){
		$scope.graph = {
			nodes:[],
			edges:[]
		}
	}


	$scope.nodeTool = function(){
		$scope.tool = new NodeTool;
		console.log($scope.tool);
	}

	$scope.lineTool = function(){
		$scope.tool = new LineTool;
		console.log($scope.tool);
	}

	$scope.handTool = function(){

	}
	console.log($scope.tool);
}]);

editorControllers.controller('UserController',
	['$scope', '$location',
	function($scope, $location){

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
