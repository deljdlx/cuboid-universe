class Board
{


  items = {};
  cellSize = 100;

  left = 0;
  top = 0;

  rotationX = 0;
  rotationY = 0;
  rotationZ = 0;

  rotationCallback;

  constructor(viewport)
  {

    this.viewport = viewport;

    this.unit = 'px';

    this.cells = {};
    this.container = null;
    this.element = document.createElement('div');
    this.element.classList.add('board');
    this.applyTransformations();
  }


  getElement() {
    return this.element;
  }

  setViewport(viewport) {
    this.viewport = viewport;
  }

  getCellByIndex(index) {
    return this.cells[index];
  }


  applyTransformations()
  {
      
      this.element.style.left = this.left + this.unit;
      this.element.style.top = this.top + this.unit;

      this.element.style.transform = `
          rotateX(` + this.rotationX + `deg)
          rotateY(` + this.rotationY + `deg)
          rotateZ(` + this.rotationZ + `deg)
      `;
  }


  rotate(x, y, z, duration, callback) {
      this.rotationX = x;
      this.rotationY = y;
      this.rotationZ = z;

      this.element.style.transition = 'transform ' + duration + 'ms linear';


      if(this.rotationCallback) {
        this.element.removeEventListener(this.getTransitionEndEventName(), this.rotationCallback);
      }
      this.rotationCallback = function() {
          this.element.style.transition = 'none';
          if(callback) {
              callback();
          }
      }.bind(this);
      
      this.element.addEventListener(this.getTransitionEndEventName(), this.rotationCallback);

      
      this.applyTransformations();
  }


  setRotation(x, y, z) {
    this.element.style.transition = 'none';
    this.rotationX = x;
    this.rotationY = y;
    this.rotationZ = z;
    this.applyTransformations();
}


  getTransitionEndEventName() {
    var transitions = {
        "transition"      : "transitionend",
        "OTransition"     : "oTransitionEnd",
        "MozTransition"   : "transitionend",
        "WebkitTransition": "webkitTransitionEnd"
     }
    let bodyStyle = document.body.style;
    for(let transition in transitions) {
        if(bodyStyle[transition] != undefined) {
            return transitions[transition];
        } 
    }
}




  addItem(item, x, y, z) {

    this.items[item.getId()] = {
      x: x,
      y: y,
      z: z,
      item: item
    };
  }


  setCellSize(cellSize) {
      this.cellSize = cellSize;
  }


  getCellSize() {
      return this.cellSize;
  }

  getElement() {
      return this.element;
  }




  randomize() {
    for(let i in this.cells) {
      this.cells[i].randomizeTopColor();
    }
  }
  
}


