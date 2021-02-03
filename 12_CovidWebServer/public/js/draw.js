'use strict';

// Common functions for all 'draws'. Init() and element gathering are in the html-files

function drawBars(ctx, data, barWidth, height) {
  ctx.save();
    const casesPerPixel = Math.max(...data)/(height*0.9);
    // starting point for the bars:
    ctx.translate(0, height);
    ctx.fillStyle = 'red';
    
    // Bar = 2px wide, gap 1px. start x from 0, increase by 3 = 1px wider than the bar
    for (let i=0, x=0; i<data.length; i++, x+=barWidth+1) {
      const bar = Math.floor(data[i]/casesPerPixel);// next - previous data
      ctx.fillRect(x, -bar, barWidth, bar);
    }
  ctx.restore();
}

function drawCurve(ctx, data, lineSegmentLength, height) {
  ctx.save();
    const casesPerPixel = Math.max(...data)/(height*0.9);
    ctx.translate(0, height);
    ctx.scale(1, -1);
    ctx.moveTo(0, data[0]); // moveTo 1st height of the data 1st line should not start from 0, but from first case count
    ctx.strokeStyle = 'black';

    for(let i=0, x=lineSegmentLength; i<data.length; i++, x+=lineSegmentLength) {
      ctx.lineTo(x, Math.floor(data[i]/casesPerPixel));
    }

    ctx.stroke();
  ctx.restore();
}



