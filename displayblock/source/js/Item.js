class Item
{
  id = null;
  generated = false;



  _animated = false;

  wrapper = null;
  element = null;

  unit = 'px';
  rotationUnit = 'deg';



  originX = 0;
  originY = 0;
  originZ = 0;

  x = 0;
  y = 0;
  z = 0;

  rotationX = 0;
  rotationY = 0;
  rotationZ = 0;

  transitionDuration = 500;
  transitionDurationUnit = 'ms';


  element = null;

  constructor(id)
  {

    if(typeof(id) === 'undefined') {
      this.id = "item-" + Math.random() + '-' + (new Date()).getTime();
    }

    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('item-wrapper');

    this.element = document.createElement('div');
    this.element.classList.add('item');

    this.classList = this.element.classList;


    this.wrapper.appendChild(this.element);
  }

  
  animate(value) {
    this._animated = value;
    if(value) {
      this.element.classList.add('animated');
    }
    else {
      this.element.classList.remove('animated');
    }
    return this;
  }




  draw() {

    this.wrapper.style.transition = 'all ' + this.transitionDuration + this.transitionDurationUnit + ' linear';


    this.wrapper.style.transform  = `
      translateX(` + (this.x + this.originX) + this.unit + `)
      translateY(` + (this.y + this.originY) + this.unit + `)
      translateZ(` + (this.z + this.originZ) + this.unit + `)

      rotateX(` + (this.rotationX) + this.rotationUnit + `)
      rotateY(` + (this.rotationY) + this.rotationUnit + `)
      rotateZ(` + (this.rotationZ) + this.rotationUnit + `)
    `;
  }


  setPosition(x,y,z) {
    if(typeof(x) !== 'undefined') {
      this.x = x;
    }
    
    if(typeof(y) !== 'undefined') {
      this.y = y;
    }
    
    if(typeof(z) !== 'undefined') {
      this.z = z;
    }
  }

  setTransitionDuration(duration) {
    this.transitionDuration = duration;
  }


  rotate(x,y,z, duration) {

    if(typeof(x) !== 'undefined' && x!== null) {
      this.rotationX = x;
    }
    if(typeof(y) !== 'undefined' && y!== null) {
      this.rotationY = y;
    }
    if(typeof(z) !== 'undefined' && z!== null) {
      this.rotationZ = z;
    }

    if(typeof(duration) !== 'undefined' && duration!== null) {
      this.setTransitionDuration(duration);
    }
  }


  getId() {
    return this.id;
  }

  setId() {
    this.id = id;
    return this;
  }



  getWrapper() {
    if(!this.generated) {
      this.generate();
    }

    this.setPosition();
    return this.wrapper;
  }

  getElement() {
    if(!this.generated) {
      this.generate();
    }
    return this.element;
  }

}