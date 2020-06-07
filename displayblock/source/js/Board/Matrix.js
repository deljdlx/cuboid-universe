class Matrix extends Free
{


  width = 16;
  height = 16;


  _optimize = true;
  matrix = {};


  constructor(width, height, viewport)
  {
    super(viewport);

    this.width = width;
    this.height = height;

    for(let y = 0 ; y < this.height ; y++) {
      
      for(let x = 0 ; x < this.width ; x++) {
        if(typeof(this.matrix[x]) === 'undefined') {
          this.matrix[x] = {};
        }
        this.matrix[x][y] = false;
      }
    }
  }

  optimize(value = null) {
    if(value !== null) {
      this._optimize = value;
      return this;
    }
    return this._optimize;
  }


  enable(x, y, value = true) {
    this.matrix[x][y] = value;
  }


  generateBackground() {
      this.background = document.createElement('div');
      this.background.classList.add('board-background');
      this.background.style.position = 'absolute';
      this.background.style.top = 0;
      this.background.style.left = 0;
      this.background.style.width = this.width * this.cellSize + this.unit;
      this.background.style.height = this.height * this.cellSize + this.unit;
      this.element.appendChild(this.background);
  }

  enabled(x,y) {
    if(typeof(this.matrix[x]) !== 'undefined') {
      if(typeof(this.matrix[x][y]) !== 'undefined') {
        return this.matrix[x][y];
      }
    }

    return false;
  }


  generateOptimized(container) {
    this.generateBackground();



    //!row optimisation=============================================================

    for(let y = 0 ; y < this.height ; y++) {

      let left = null;
      let top = null;
      let segmentLength = 0;

      for(let x = 0 ; x < this.width ; x++) {

        

        if(this.enabled(x, y)) {
          segmentLength++;
          if(left === null) {
            left = (x) * parseInt(this.cellSize);
          }
          if(segmentLength > 1) {
            this.enable(x, y, 2);
            this.enable(x - 1, y, 2);
          }
          
        }
        else {

          if(left !== null && segmentLength > 1) {
            top =  y * parseInt(this.cellSize);
            let width = segmentLength * this.cellSize;
            let cube = new Cuboid(width, this.cellSize, this.cellSize);
            this.viewport.addItem(cube, left, top, this.cellSize);
          }
          segmentLength = 0;
          left = null;
        }
      }

      if(left !== null && segmentLength > 1) {

        top =  y * parseInt(this.cellSize);
        let width = segmentLength * this.cellSize;
        let cube = new Cuboid(width, this.cellSize, this.cellSize);

        this.viewport.addItem(cube, left, top, this.cellSize);
        segmentLength = 0;
        left = null;
      }
    }
    //!================================================================================



    //!cols optimisation=============================================================

    for(let x = 0 ; x < this.width ; x++) {
      let top = null;
      let segmentLength = 0;

      for(let y = 0 ; y < this.height ; y++) {

        if(this.enabled(x, y) !== false && this.enabled(x, y) !== 2) {
          if(top === null) {
            top = y * parseInt(this.cellSize);
          }
          segmentLength++;
        }
        else {
          if(top !== null) {

            let left = x * this.cellSize;
            let height = segmentLength * this.cellSize;

            let cube = new Cuboid(this.cellSize, height, this.cellSize);
            this.viewport.addItem(cube, left, top, this.cellSize);
          }
          segmentLength = 0;
          top = null;
        }
      }
      if(top !== null) {

        let left = x * this.cellSize;
        let height = segmentLength * this.cellSize;

        let cube = new Cuboid(this.cellSize, height, this.cellSize);
        this.viewport.addItem(cube, left, top, this.cellSize);
        segmentLength = 0;
        top = null;
      }
    }


    const scene = this.viewport.getScene();
    scene.style.width = this.getOffsetWidth() + 'px';
    scene.style.height = this.getOffsetHeight() + 'px';


    this.generateBorders();
    this.generateAxes();

    super.generate(container);
    return;
  }


  generate(container) {

    if(this.optimize()) {
      return this.generateOptimized(container);
    }


    this.generateBackground();


    for(let y = 0 ; y < this.height ; y++) {
      for(let x = 0 ; x < this.width ; x++) {
        if(this.enabled(x, y)) {
          let left = x * parseInt(this.cellSize);
          let cube = new Cube(this.cellSize, 100);
          cube.setTopContent(x + ':' +y);
          let top =  y * parseInt(this.cellSize);
          this.viewport.addItem(cube, left, top, this.cellSize);
        }
      }
    }

    const scene = this.viewport.getScene();
    scene.style.width = this.getOffsetWidth() + 'px';
    scene.style.height = this.getOffsetHeight() + 'px';
    
    //(this.getOffsetWidth()/2, this.getOffsetHeight()/2, 0);

    this.generateBorders();
    this.generateAxes();

    super.generate(container);
    return this;
  }

  getOffsetWidth() {
    return this.width * this.cellSize;
  }


  getOffsetHeight() {
    return this.height * this.cellSize;
  }



  generateAxes() {
    let zAxe = new Cuboid(4, 4, 4000);
    zAxe.classList.add('axe');
    this.viewport.addItem(zAxe, this.getOffsetWidth()/2, this.getOffsetHeight()/2, 2000);


    let xAxe = new Cuboid(4000, 4, 4);
    xAxe.classList.add('axe');
    this.viewport.addItem(xAxe, -2000 + this.getOffsetWidth() / 2, this.getOffsetHeight()/2, 0);

    let yAxe = new Cuboid(4, 4000, 4);
    yAxe.classList.add('axe');
    this.viewport.addItem(yAxe, this.getOffsetWidth()/2, -2000 + this.getOffsetHeight() / 2, 0);


  }



  generateBorders() {

    const heightMultiplicator = 0.5;
    const sideWeight = 0.5;

    let topSide = new Cuboid(this.cellSize * this.width, this.cellSize * sideWeight, this.cellSize * heightMultiplicator);
    let top =  -1 * parseInt(this.cellSize * sideWeight);
    topSide.classList.add('matrix-border');
    this.viewport.addItem(topSide, 0, top, this.cellSize * heightMultiplicator);


    let bottomSide = new Cuboid(this.cellSize * this.width, this.cellSize * sideWeight, this.cellSize * heightMultiplicator);
    top =  (this.height) * parseInt(this.cellSize);
    bottomSide.classList.add('matrix-border');
    this.viewport.addItem(bottomSide, 0, top, this.cellSize * heightMultiplicator);


    let leftSide = new Cuboid(this.cellSize * sideWeight, this.cellSize * (this.height + 1), this.cellSize * heightMultiplicator);
    top =  -1 * parseInt(this.cellSize) * sideWeight;
    leftSide.classList.add('matrix-border');
    this.viewport.addItem(leftSide, this.cellSize * -1 * sideWeight, top, this.cellSize * heightMultiplicator);

    let rightSide = new Cuboid(this.cellSize * sideWeight, this.cellSize * (this.height + 1), this.cellSize * heightMultiplicator);
    top =  -1 * parseInt(this.cellSize) * sideWeight;
    rightSide.classList.add('matrix-border');
    this.viewport.addItem(rightSide, this.width * this.cellSize, top, this.cellSize * heightMultiplicator);



  }

  
  generatePlayers() {
    for(let id in this.players) {
      let player = this.players[id].player;
      let cell = this.players[id].cell;

      this.getCellByIndex(cell).addElement(player.getElement());
    }
  } 


}