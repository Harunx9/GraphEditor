var editorControllers = angular.module('EditorControllers',[]);


editorControllers.controller('LoginController', 
	['$scope', '$location', 
	function($scope, $location){
	
	$scope.login = function(user){
		console.log(user);
	}

}]);

editorControllers.controller('HomeController', 
	['$scope', '$location', 
	function($scope, $location){
	
}]);

editorControllers.controller('EditorController', 
	['$scope', '$location', 
	function($scope, $location){
	
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


