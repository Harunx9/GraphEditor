'use strict';
var editorDirectives = angular.module('EditorDirectives', []);

editorDirectives.directive('drawgraph',['NodeTool', 'LineTool',
function(NodeTool, LineTool){
	return{
		restrict: 'A',
		link: function(scope, element){
			var ctx = element[0].getContext('2d');
			var mouseX;
			var mouseY;

			element.bind('mousedown', function(event){
				var currentTool = scope.tool;
				var mouseX = event.offsetX;
				var mouseY = event.offsetY;
				if(currentTool instanceof NodeTool)
				{
					currentTool.x = mouseX;
					currentTool.y = mouseY;
					drawNode(mouseX, mouseY, currentTool.nodeType, currentTool.dimension, currentTool.color);
					console.log(currentTool);
					scope.graph.nodes.push(angular.copy(currentTool));
				}else{

				}
			});

			element.bind('mousemove', function(event){

			});

			element.bind('mouseup', function(event){

			});

			function drawNode(x, y, nodeType, nodeDimension, nodeColor){
				switch(nodeType){
					case 'circle':
						ctx.beginPath();
						ctx.arc(x, y, nodeDimension, 0, 2*Math.PI, false);
						ctx.fillStyle = nodeColor;
						ctx.fill();
						ctx.strokeStyle = nodeColor;
						break;
					case 'rectange':
						break;
					case 'triangle':
						break;
				}

				ctx.stroke();
			}

			function drawLine(nodeStart, nodeEnd, lineColor, lineThickness){

			}
		}
	};

}]);
