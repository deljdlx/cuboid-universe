class Square extends Free
{


  width = 16;
  height = 16;
  


  generateBackground()
  {
      this.background = document.createElement('div');
      this.background.classList.add('board-background');
      this.background.style.position = 'absolute';
      this.background.style.top = 0;
      this.background.style.left = 0;
      this.background.style.width = this.width * this.cellSize + this.unit;
      this.background.style.height = this.height * this.cellSize + this.unit;
      this.element.appendChild(this.background);
  }

  generate(container) {

    this.generateBackground();


    for(let i = 0 ; i < this.width ; i++) {
      let x = i * parseInt(this.cellSize);
      let y = 0;

      let cube = new Cube(this.cellSize, 100);
      this.viewport.addItem(cube, x, y, 0);
    }


    for(let i = 1 ; i < this.height - 1 ; i++) {

      let x = (this.width - 1) * parseInt(this.cellSize);
      let y = i * parseInt(this.cellSize);

      let cube = new Cube(this.cellSize, 100);
      this.viewport.addItem(cube, x, y, 0);
    }

    for(let i = 0 ; i < this.width ; i++) {

      let y = (this.height -1) * parseInt(this.cellSize);
      let x = (this.width - 1 - i) * parseInt(this.cellSize);

      let cube = new Cube(this.cellSize, 100);
      this.viewport.addItem(cube, x, y, 0);
    }

    for(let i = 1 ; i < this.height - 1 ; i++) {
      
      let y = (this.height - 1 - i ) * parseInt(this.cellSize);
      let x = 0;

      let cube = new Cube(this.cellSize, 100);
      this.viewport.addItem(cube, x, y, 0);
    }





    super.generate(container);

    return;

    let cellNumber = 0;

    for(let i = 0 ; i < this.width ; i++) {

        let cell = new Cell(this, this.cellSize, 100);


        let left = i * parseInt(this.cellSize);
        let top = 0;

        cell.generate(left, top);
        cell.addClass('cell-top');

        this.cells[cellNumber] = cell;
        cellNumber++;
    }

    for(let i = 1 ; i < this.height - 1 ; i++) {
        let cell = new Cell(this, this.cellSize, 100);
        let top = i * parseInt(this.cellSize);
        let left = (this.width - 1) * parseInt(this.cellSize);

        cell.generate(left, top);
        cell.addClass('cell-right');

        
        this.cells[cellNumber] = cell;
        cellNumber++;
    }

    for(let i = 0 ; i < this.width ; i++) {
        let cell = new Cell(this, this.cellSize, 100);
        let top = (this.height -1) * parseInt(this.cellSize);
        let left = (this.width - 1 - i) * parseInt(this.cellSize);

        cell.generate(left, top);
        cell.addClass('cell-bottom');

        this.cells[cellNumber] = cell;
        cellNumber++;
    }



    for(let i = 1 ; i < this.height - 1 ; i++) {
        let cell = new Cell(this, this.cellSize, 100);
        let top = (this.height - 1 - i ) * parseInt(this.cellSize);
        let left = 0;
        cell.generate(left, top);
        cell.addClass('cell-left');

        this.cells[cellNumber] = cell;
        cellNumber++;
    }

    this.generatePlayers();

  }

  
  generatePlayers() {
    for(let id in this.players) {
      let player = this.players[id].player;
      let cell = this.players[id].cell;

      this.getCellByIndex(cell).addElement(player.getElement());
    }
  } 


}