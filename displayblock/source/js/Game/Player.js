class Player
{

  constructor(id)
  {
    this.unit = 'px';
    this.id = id;

    this.height = 50;

    this.image = null;

    this.cube = new Cube(this.height, this.height);

    this.generateElement();
  }

  setImage(image) {
    this.image = image;
    this.avatarElement.style.backgroundImage = 'url(' + image + ')';
  }

  getId() {
    return this.id;
  }

  getElement() {
    return this.element;
  }

  generateElement() {

    this.cube.generate();
    this.element = this.cube.getElement();
    this.cube.addClass('player');

    this.avatarElement = document.createElement('div');
    this.avatarElement.classList.add('player-side-avatar', 'player-side');
    this.avatarElement.style.transform = `
      translateZ(` + this.height * 1.5 + this.unit + `)
      translateY(` + this.height / 2 + this.unit + `)
      translatex(` + this.height / 2 + this.unit + `)
      rotateX(-90deg)
      rotateY(45deg)`;
    this.element.appendChild(this.avatarElement);


    return;

    this.element = document.createElement('div');
    this.element.classList.add('player');
    this.element.style.transform = 'translateZ(' + this.height + this.unit + ')';

    this.topElement = document.createElement('div');
    this.topElement.classList.add('player-side-top', 'player-side');
    this.element.appendChild(this.topElement);

    this.rightElement = document.createElement('div');
    this.rightElement.classList.add('player-side-right', 'player-side');
    this.rightElement.style.width =  this.height + this.unit;
    this.element.appendChild(this.rightElement);


    this.frontElement = document.createElement('div');
    this.frontElement.classList.add('player-side-front', 'player-side');
    this.frontElement.style.height =  this.height + this.unit;
    this.element.appendChild(this.frontElement);


    this.bottomElement = document.createElement('div');
    this.bottomElement.classList.add('player-side-bottom', 'player-side');
    this.bottomElement.style.transform = 'translateZ(-' + this.height + this.unit + ')';
    this.element.appendChild(this.bottomElement);


    this.avatarElement = document.createElement('div');
    this.avatarElement.classList.add('player-side-avatar', 'player-side');
    this.avatarElement.style.transform = `
      translateZ(` + this.height * 1.5 + this.unit + `)
      translateY(` + this.height / 2 + this.unit + `)
      translatex(` + this.height / 2 + this.unit + `)
      rotateX(-90deg)
      rotateY(45deg)`;
    this.element.appendChild(this.avatarElement);



    return this.element;

  }


}