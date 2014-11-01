var editorServices = angular.module('EditorServices',[])

editorServices.factory('UserService', function(){
	var udo = {
		isLogged: false,
	}

	return udo;
});

editorServices.factory('CanvasService', function(){
	var dimension = {
		width: 0,
		height: 0
	}

	return dimension;
});

editorServices.factory('NodeTool', function(){
	var node = {
		x:0,
		y:0,
		nodeType:'circle',
		dimension:10,
		color: '#3399FF'
	}

	return node;
})

editorServices.factory('LineTool', function(){
	var line ={
		nodeStart: null,
		nodeEnd: null,
		color: '#3399FF',
		thickness: 3
	}

	return line;
});
