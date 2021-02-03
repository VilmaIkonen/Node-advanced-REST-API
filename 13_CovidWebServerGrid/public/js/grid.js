'use strict';

// area = {x, y, width, height, ratioY}
// options = {color: { axis: 'black', grid:'lightgrey'}, lineWidth: 1, font: '14px monospace'}
class Grid {
  constructor(area, options, maxYData) {
    this.area = area;
    this.options = options;
    this.maxYData = maxYData;
    this.ratio = 1;
  }

  // determine how area is left when the label is in place,
  // returns the "real" area where the chart can be drawn to
  get drawingArea() {
    return {
      x: this.area.x,
      y: this.area.y,
      width: this.area.width - this.area.x, // remaining area will be width of drawing area (excludes label area)
      height: this.area.height - this.area.y,
      ratioY: this.ratio
    }
  }

  draw(ctx) {
    ctx.save();
      const exp = Math.floor(Math.log10(this.maxYData)); // see below
      const step = Math.pow(10, exp); // eg. exp = 2 --> step = 100
      const upperLimit = Math.ceil(this.maxYData/step)*step; // eg. maxYData = 834 --> exp = 2 --> step = 100. this.maxYData/step = 834/100 = 8,34 --> ceil --> 9 --> 9 * step --> upperLimit = 900      
      const labels = [];
      for (let i = 0; i <= upperLimit; i += step) {
        labels.push(i);
      };

      this.ratio = this.area.height/upperLimit;

      // space taken by the font/label
      ctx.font = this.options.font;
      const maxWidth = Math.ceil(ctx.measureText(upperLimit).width);
      this.area.x += maxWidth;

      // change drawingarea origin (x and y), line starts from here:
      ctx.translate(this.area.x, this.area.y);
  
      ctx.beginPath(); 
      ctx.strokeStyle = this.options.color.grid;
      ctx.fillStyle = this.options;
      for(let label of labels) {
        const y = Math.floor(this.ratio * label);
        ctx.fillText(label, -this.maxYData, -y) // text x cordinate is the left lower corner --> -this.maxYData
        ctx.moveTo(0, -y); // label starts always from x=0
        ctx.lineTo(this.area.width, -y); 
        ctx.stroke();
      }

      ctx.strokeStyle = this.options.color.axis;
      ctx.beginPath();
      ctx.lineWidth = this.options.lineWidth;
      ctx.moveTo(0, 0);
      ctx.lineTo(0, -this.area.height); // remaining height of the area
      ctx.moveTo(0, -this.options.lineWidth); // go back to beginning position
      ctx.lineTo(this.area.width, -this.options.lineWidth);
      ctx.stroke();

    ctx.restore();
  }
  // end of draw

  static getLabelAreaWidth(ctx, label, font) {
    ctx.save();
      ctx.font = font;
      const labelLenght = Math.ceil(ctx.measureText(label).width);
    ctx.restore();
    return labelLenght;
  }
}

// Different scenarios for label ticks:

// 36540 cases (max data)
// minimum 0

// 40000 
// 30000
// 20000
// 10000
// 0
// --> 
// log10(10000) = 4



// 867 cases (max data)
// minimum 0

// 900
// 800
// 700
// ...
// 0
// --> 
// log10(100) = 2
// log10(800) = 2.9

// --> log 10 of max cases --> Math.floor --> integer --> 10^integer --> interval of ticks