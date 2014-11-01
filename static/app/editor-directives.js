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
			var drawingLine = false;
			element.bind('mousedown', function(event){
				var currentTool = scope.tool;
				mouseX = event.offsetX;
				mouseY = event.offsetY;
				if(currentTool instanceof NodeTool)
				{
					currentTool.x = mouseX;
					currentTool.y = mouseY;
					drawNode(mouseX, mouseY, currentTool.nodeType, currentTool.dimension, currentTool.color);
					scope.graph.nodes.push(angular.copy(currentTool));
				}else if (currentTool instanceof LineTool){
					var nodeStart = {
						x: mouseX,
						y: mouseY,
					}
					currentTool.nodeStart = nodeStart;
					drawingLine = true;
				}
			});

			element.bind('mouseup', function(event){
				var currentTool = scope.tool
				if(currentTool instanceof LineTool && drawingLine === true)
				{
					mouseX = event.offsetX;
					mouseY = event.offsetY;
					var nodeEnd = {
						x: mouseX,
						y: mouseY
					}
					currentTool.nodeEnd = nodeEnd;
					drawLine(currentTool.nodeStart, currentTool.nodeEnd, currentTool.color, currentTool.thickness);
					scope.graph.edges.push(angular.copy(currentTool));
					drawingLine = false;
				}
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
						ctx.beginPath();
						ctx.rect(x,y, nodeDimension, nodeDimension);
						ctx.fillStyle = nodeColor;
						ctx.fill();
						ctx.strokeStyle = nodeColor;
						break;
					case 'triangle':
						ctx.beginPath();
						ctx.moveTo(x,y);
						ctx.lineTo(x + (nodeDimension / 2), y + (nodeDimension / 2));
						ctx.lineTo(x - (nodeDimension / 2), y + (nodeDimension / 2));
						ctx.fillStyle = nodeColor;
						ctx.fill();
						ctx.strokeStyle = nodeColor;
						break;
				}
				ctx.stroke();
				ctx.closePath();
			}

			function drawLine(nodeStart, nodeEnd, lineColor, lineThickness){
				ctx.lineWidth = lineThickness;
				ctx.beginPath();
				ctx.moveTo(nodeStart.x, nodeStart.y);
				ctx.lineTo(nodeEnd.x, nodeEnd.y);
				ctx.strokeStyle = lineColor;
				ctx.stroke();
				ctx.closePath();
			}
		}
	};

}]);
