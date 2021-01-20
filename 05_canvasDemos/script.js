'use strict';

const drawingCanvas = document.getElementById('drawingcanvas');
const context = drawingCanvas.getContext('2d');
context.fillStyle = 'grey';
context.fillRect(0, 0, drawingCanvas.clientWidth, drawingCanvas.height);

// Black rectangle
context.fillStyle = 'black';
context.fillRect(10, 10, 200, 50); // x, y, width, height. Coordinates 0,0 is at top left. 

// Orange rectangle
context.fillStyle = 'orange'
context.fillRect(100, 100, 200, 50); 

// Green rectangle w red stroke
context.fillStyle = 'green'
context.fillRect(100, 200, 200, 50); 
context.lineWidth = 5; 
context.strokeStyle ='red';
context.strokeRect(100, 200, 200, 50); 

// Only strokelining w red stroke
context.lineWidth = 3; 
context.strokeStyle = 'red';
context.strokeRect(200, 350, 200, 50);

// Adding text, filled or stroke:
context.font = '35pt serif';
context.fillText('Text example fill', 40, 100); // text and coordinates (x, y for left lower corner of the text)

context.font = '25pt serif';
context.lineWidth = 1; 
context.strokeStyle = 'black';
context.strokeText('Text example stroke', 40, 200); // text and coordinates (x, y for left lower corner of the text)

context.font = '50pt serif';
context.fillStyle = 'orange';
context.fillText('Text example fill', 10, 300);
context.lineWidth = 3; 
context.strokeText('Text example fill+stroke', 10, 300); // text and coordinates (x, y for left lower corner of the text)
