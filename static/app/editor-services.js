'use strict';
var editorServices = angular.module('EditorServices',[])

editorServices.factory('ApiService', function(){
	function apiService(){
			this.baseUrl ='http://127.0.0.1:5000/api/';
			this.model = '';
			this.serchQuery = '';

			this.constructQuerry = function(name, operator, value){
				this.serchQuery='?q={"filters":[{"name":"'
				+name+'","op":"'
				+operator+'","val":"'
				+value+'"}]}';
			}

			this.constructUrl = function(model){
				return this.baseUrl+this.model+this.serchQuery;
			}
	}
	return apiService
});

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

editorServices.factory('HandTool', function(){
	function hand(){
		this.x = 0;
		this.y = 0;
	}
	return hand;
});
