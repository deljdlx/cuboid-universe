class Cell
{
    constructor(board, cellSize, cellHeight) {
        this.unit = 'px';

        this.board = board;
        this.container = board.getElement();

        this.cube = new Cube(cellSize, cellHeight);

        this.left = 0;
        this.top = 0;

        this.elements = [];
    }

    getCube() {
        return this.cube;
    }

    addClass(cssClass) {
        this.cube.addClass(cssClass);
    }

    getElement() {
        return this.cube.getElement();
    }

    generate(left, top) {

        this.cube.generate(left, top);
        this.container.appendChild(this.cube.getElement());

        return this;
    }



    addElement(element) {
        this.cube.addElement(element);
        return;

    }

    randomizeTopColor()
    {
        this.cube.randomizeTopColor();
        return;

    }
}
