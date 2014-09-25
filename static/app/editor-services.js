var editorServices = angular.module('EditorServices',[])

editorServices.factory('UserService', function(){
	var udo = {
		isLogged: false,
		hash: null
	}

	return udo;
});

