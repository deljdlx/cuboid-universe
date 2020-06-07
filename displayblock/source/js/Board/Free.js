class Free extends Board
{


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
    this.applyTransformations();
    this.container = container;
    this.container.appendChild(this.element);


    for(let id in this.items) {
      let itemData = this.items[id];

      itemData.item.setPosition(
        itemData.x,
        itemData.y,
        itemData.z
      );

      let element = itemData.item.getWrapper();
      this.element.appendChild(element);
      itemData.item.draw();

    }

  }


}