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
					drawNode(mouseX, mouseY, currentTool.nodeType,
						currentTool.dimension, currentTool.color);
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
					drawLine(currentTool.nodeStart, currentTool.nodeEnd,
						currentTool.color, currentTool.thickness);
					scope.graph.edges.push(angular.copy(currentTool));
					drawingLine = false;
				}
			});

			function init(){
				ctx.canvas.width = scope.canvasWidth;
				ctx.canvas.height = scope.canvasHeight;
				if(scope.graph.nodes.length !== 0 || scope.graph.edges.length !== 0){
					loadGraph(scope.graph);
				}
			}

			init();

			function loadGraph(graph){
				graph.nodes.forEach(function(node){
					drawNode(node.x, node.y, node.nodeType, node.dimension, node.color);
				});

				graph.edges.forEach(function(edge){
					drawLine(edge.nodeStart, edge.nodeEnd, edge.color, edge.thickness);
				});
			}

			function drawNode(x, y, nodeType, nodeDimension, nodeColor){
				ctx.beginPath();
				switch(nodeType){
					case 'circle':
						ctx.arc(x, y, nodeDimension, 0, 2*Math.PI, false);
						break;
					case 'rectange':
						ctx.rect(x,y, nodeDimension, nodeDimension);
						break;
					case 'triangle':
						ctx.moveTo(x,y);
						ctx.lineTo(x + (nodeDimension / 2), y + (nodeDimension / 2));
						ctx.lineTo(x - (nodeDimension / 2), y + (nodeDimension / 2));
						break;
				}
				ctx.fillStyle = nodeColor;
				ctx.fill();
				ctx.strokeStyle = nodeColor;
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
