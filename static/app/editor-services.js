'use strict';
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
	function node (){
		this.x = 0;
		this.y = 0;
		this.nodeType = 'circle';
		this.dimension = 10;
		this.color = '#3399FF';
	}
	return node;
})

editorServices.factory('LineTool', function(){
	function line (){
		this.nodeStart = null;
		this.nodeEnd = null;
		this.color = '#3399FF';
		this.thickness = 3;
	}
	return line;
});
