'use strict';
var editorDirectives = angular.module('EditorDirectives', []);

editorDirectives.directive('drawgraph',
	['NodeTool', 'LineTool', 'HandTool', 'DeleteTool',
function(NodeTool, LineTool, HandTool, DeleteTool){
	return{
		restrict: 'A',
		link: function(scope, element){
			var ctx = element[0].getContext('2d');
			var mouseX;
			var mouseY;
			var drawingLine = false;
			var dragged = false;

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
				}else if(currentTool instanceof HandTool){
						currentTool.selected_object = checkIfIobjectIsClicked(mouseX, mouseY);
						if(currentTool.selected_object != null)dragged = true;
				}else if(currentTool instanceof DeleteTool){
						deleteElement(mouseX, mouseY);
						redraw();
				}
			});

			element.bind('mousemove', function(event){
				var currentTool = scope.tool;
				if(currentTool instanceof HandTool && dragged)
				{
					if(currentTool.selected_object.type == 'node')
					{
						currentTool.selected_object.obj.x = event.offsetX;
						currentTool.selected_object.obj.y = event.offsetY;
					}else{
						if(currentTool.selected_object.type == 'nodeStart'){
							currentTool.selected_object.obj.nodeStart.x = event.offsetX;
							currentTool.selected_object.obj.nodeStart.y = event.offsetY;
						}else if(currentTool.selected_object.type == 'nodeEnd'){
							currentTool.selected_object.obj.nodeEnd.x = event.offsetX;
							currentTool.selected_object.obj.nodeEnd.y = event.offsetY;
						}
					}
					redraw();
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
				}else if(currentTool instanceof HandTool){
					currentTool.selected_object = null;
					dragged = false;
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

			function redraw(){
				ctx.canvas.width = scope.canvasWidth;
				loadGraph(scope.graph);
			}

			function deleteElement(x, y){
				var onX = false;
				var onY = false;
				for (var i = 0; i < scope.graph.nodes.length; i++) {
					var node = scope.graph.nodes[i];
					if(x < (node.x + (node.dimension /2))
						&& x > (node.x - (node.dimension /2))){
							onX = true;
						}
					if(y < (node.y + (node.dimension /2))
						&& y > (node.y - (node.dimension /2))){
							onY = true;
						}
					if(onX && onY){
						scope.graph.nodes.splice(i,1);
					}
				}

			}

			function checkIfIobjectIsClicked(x, y){
				var onX = false;
				var onY = false;
				for (var i = 0; i < scope.graph.nodes.length; i++) {
					var node = scope.graph.nodes[i];
					if(x < (node.x + (node.dimension /2))
						&& x > (node.x - (node.dimension /2))){
							onX = true;
						}
					if(y < (node.y + (node.dimension /2))
						&& y > (node.y - (node.dimension /2))){
							onY = true;
						}
					if(onX && onY){
						return {obj: node, type:'node'};
					}
				}

				for (var i = 0; i < scope.graph.edges.length; i++) {
					var line = scope.graph.edges[i];
					if(x < (line.nodeStart.x + 10)
						&& x > (line.nodeStart.x - 10)){
							onX = true;
						}
					if(y < (line.nodeStart.y + 10)
						&& y > (line.nodeStart.y - 10)){
							onY = true;
						}
					if(onX && onY){
						return {obj: line, type:'nodeStart'};
					}
					if(x < (line.nodeEnd.x + 10)
						&& x > (line.nodeEnd.x - 10)){
							onX = true;
					}
					if(y < (line.nodeEnd.y + 10)
						&& y > (line.nodeEnd.y - 10)){
							onY = true;
					}
					if(onX && onY){
						return {obj: line, type:'nodeEnd'};
					}
				}
			}

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
					case 'rectangle':
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
