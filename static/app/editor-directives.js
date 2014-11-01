var editorDirectives = angular.module('EditorDirectives', []);

editorDirectives.directive('drawgraph',['NodeTool', 'LineTool',
function(NodeTool, LineTool){
	return{
		restrict: 'A',
		link: function(scope, element){
			var ctx = element[0].getContext('2d');
			console.log(ctx);
			var mouseX;
			var mouseY;
			console.log(scope);
			element.bind('mousedown', function(event){
				var currentTool = scope.tool;
				var mouseX = event.offsetX;
				var mouseY = event.offsetY;
				console.log(currentTool);
				if(currentTool instanceof NodeTool)
				{
					currentTool.x = mouseX;
					currentTool.y = mouseY;

				}else{

				}
			});

			element.bind('mousemove', function(event){

			});

			element.bind('mouseup', function(event){

			});

			function drawNode(){

			}

			function drawLine(){
				
			}
		}
	};

}]);
