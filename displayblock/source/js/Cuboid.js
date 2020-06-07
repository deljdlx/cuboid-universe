class Cuboid extends Item
{


  width = 100;
  height = 100;
  depth = 100;


  topContent = '';


  constructor(width, height, depth) {

    super();

    if(typeof(width) !== 'undefined' && width !== null) {
      this.width = width;
    }
    
    if(typeof(height) !== 'undefined' && height !== null) {
      this.height = height;
    }

    if(typeof(depth) !== 'undefined' && depth !== null) {
      this.depth = depth;
    }

    this.elements = [];


    this.element.classList.add('cuboid');
    

    this.element.style.width = this.width + this.unit;
    this.element.style.height = this.height + this.unit;

    this.topContentElement = null;
   
  }


  setTopContent(content) {
    this.topContent = content;
    if(this.topElement) {
      this.topElement.innerHTML = content;
    }
  }

  centerOrigin() {
    this.originX = Math.floor(this.width / -2);
    this.originY = Math.floor(this.height / -2);
    this.originZ = Math.floor(this.depth / 2);

    this.wrapper.style.transformOrigin =
      Math.floor(this.width / 2) + 'px '
      + Math.floor(this.height / 2) + 'px '
      + (this.depth / -2 ) + 'px '
    ;

  }


  setDepth(height) {
    this.depth = height;
    this.draw();
  }

  
  getTopContentElement()
  {
    return this.topContentElement;
  }

  addClass(cssClass) {
    this.element.classList.add(cssClass);
  }


  rotate(x,y,z, duration) {

    super.rotate(x, y, z, duration);

  }


  draw() {



    this.topElement.style.width = this.width + this.unit;
    this.topElement.style.height = this.height + this.unit;
    this.topElement.innerHTML = this.topContent;
    

    this.frontElement.style.width = this.width + this.unit;
    this.frontElement.style.height = this.depth + this.unit;
    //this.frontElement.style.transform = 'translateZ(' + this.depth  + this.unit + ')';


    
    this.rightElement.style.width = this.depth + this.unit;
    this.rightElement.style.height = this.height+ this.unit;
    
    //this.rightElement.style.transform = 'translateZ(' + this.depth  + this.unit + ')';
    
    this.leftElement.style.width = this.depth + this.unit;
    this.leftElement.style.height = this.height + this.unit;
    //this.leftElement.style.transform = 'translateZ(' + this.depth  + this.unit + ')';

    this.backElement.style.width = this.width + this.unit;
    this.backElement.style.height = this.depth + this.unit;
    //this.backElement.style.transform = 'translateZ(' + this.depth  + this.unit + ')';

    this.bottomElement.style.width = this.width + this.unit;
    this.bottomElement.style.height = this.height + this.unit;
    this.bottomElement.style.transform = 'translateZ(-' + this.depth  + this.unit + ')';
    

    super.draw();
 
  }



  generate() {

    this.wrapper.style.width = this.width + this.unit;
    this.wrapper.style.height = this.height + this.unit;

    this.topElement = document.createElement('div');
    this.topElement.classList.add('cuboid-side');
    this.topElement.classList.add('cuboid-side-top');
   
    this.topContentElement = document.createElement('div');
    this.topContentElement.classList.add('side-top-content');
    this.topElement.appendChild(this.topContentElement);
    this.element.appendChild(this.topElement);

    this.frontElement = document.createElement('div');
    this.frontElement.classList.add('cuboid-side-front');
    this.frontElement.classList.add('cuboid-side');
    this.element.appendChild(this.frontElement);

    this.rightElement = document.createElement('div');
    this.rightElement.classList.add('cuboid-side-right');
    this.rightElement.classList.add('cuboid-side');
    this.element.appendChild(this.rightElement);
    
    this.leftElement = document.createElement('div');
    this.leftElement.classList.add('cuboid-side-left');
    this.leftElement.classList.add('cuboid-side');
    this.element.appendChild(this.leftElement);

    this.backElement = document.createElement('div');
    this.backElement.classList.add('cuboid-side-back');
    this.backElement.classList.add('cuboid-side');
    this.element.appendChild(this.backElement);

    this.bottomElement = document.createElement('div');
    this.bottomElement.classList.add('cuboid-side');
    this.bottomElement.classList.add('cuboid-side-bottom');
    this.element.appendChild(this.bottomElement);


  }


  addElement(element) {

    let container = document.createElement('div');
    container.classList.add('cuboid-wrapper');
    

    let left = this.cellSize / 2 * (this.elements.length % 2);
    let top = this.cellSize / 2 * Math.floor(this.elements.length/2);


    container.appendChild(element);
    this.topElement.appendChild(container);
    container.style.left = left + this.unit;
    container.style.top = top + this.unit;

    this.elements.push(container);
  }


  randomizeTopColor() {
    let random = Math.floor(Math.random()*5);
    this.element.classList.add('cube__' + random);

  }




}
