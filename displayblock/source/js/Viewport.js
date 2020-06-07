
class Viewport
{


    items = [];

    states = {
        drag: {
            enable: false,
            left: null,
            top: null
        },
        rotation: {
            enable: false,
            rotationX: null,
            rotationY: null,
            rotationZ:null
        }
    };

    unit = 'px';

    perspective = 1600;

    translation = 0;
    //rotationX = 45;
    rotationX = 0;
    rotationY = 0;
    //rotationZ = 45;
    rotationZ = 0;

    scale = 1;
    saleIncrement = 0.15;

    transformOrigin = '50% 50% 0';

    left = 0;
    top = 0;
    

    container = null;
    layout = null;
    
    perspective;

    boards = {};
    scenes = {};
    constructor(container)
    {

        this.container = container;

        this.layout = document.createElement('div');
        this.layout.classList.add('layout');


        this.perspective = document.createElement('div');
        this.perspective.classList.add('perspective');


        this.applyTransformations();
        
        this.layout.appendChild(this.perspective);

        this.addBoard('default', new Free(this));

        document.body.addEventListener('wheel', (evt) => this.handleWheel(evt));
        document.body.addEventListener('mousedown', (evt) => this.dragStart(evt));
        document.body.addEventListener('mouseup', (evt) => this.dragStop(evt));
        document.body.addEventListener('mousemove', (evt) => this.drag(evt));

        document.body.addEventListener('contextmenu', (evt) => {evt.preventDefault()});
    }


    createScene(name) {
        this.scenes[name] = document.createElement('div');
        this.scenes[name].classList.add('perspective', 'scene');
    }

    getScene(name) {
        return this.scenes[name];
    }


    addBoard(name, board) {
        board.setViewport(this);
        this.createScene(name);
        this.boards[name] = board;
        
    }

    addItem(item, x, y, z, board = null) {
        if(board === null) {
            board = 'default';
        }

        this.items.push(item);
        this.boards[board].addItem(item, x, y, z);
    }


    drag(evt) {

        evt.preventDefault();

        if(this.states.drag.enable) {
            let xDelta = (evt.clientX - this.states.drag.left); // (this.perspective / 20);
            this.left = xDelta;
            let yDelta = (evt.clientY - this.states.drag.top); // (this.perspective / 20);
            this.top = yDelta;
            this.applyTransformations();
        }
        else if(this.states.rotation.enable) {

            let xDelta = (evt.clientX - this.states.rotation.left); // (this.perspective / 20);
            let yDelta = (evt.clientY - this.states.rotation.top); // (this.perspective / 20);

            this.rotationZ = Math.round(this.states.rotation.rotationZ + xDelta / 10);
            this.rotationX = Math.round(this.states.rotation.rotationX + yDelta/10);

            this.applyTransformations();
        }
    }

    dragStart(evt) {
        console.log('drag-start');
        evt.preventDefault();

        if(evt.which == 1) {
            this.states.drag.enable = true;
            this.states.drag.left = evt.clientX - this.left;
            this.states.drag.top = evt.clientY - this.top;
        }
        else if(evt.which == 3) {
            this.states.rotation.enable = true;

            this.states.rotation.left = evt.clientX;
            this.states.rotation.top = evt.clientY;

            this.states.rotation.rotationX = this.rotationX;
            this.states.rotation.rotationY = this.rotationY;
            this.states.rotation.rotationZ = this.rotationZ;
        }

    }

    dragStop(evt) {
        
        evt.preventDefault();


        this.states.drag.enable = false;
        this.states.drag.left = null;
        this.states.drag.top = null;

        this.states.rotation.enable = false;
        this.states.rotation.left = null;
        this.states.rotation.top = null;
        this.states.rotation.rotationX = this.rotationX;
        this.states.rotation.rotationY = this.rotationY;
        this.states.rotation.rotationZ = this.rotationZ;

    }
    

    handleWheel(evt) {
        //evt.preventDefault();

        let delta = evt.deltaY;
        if(delta > 0) {
            this.zoom(-this.saleIncrement);
        }
        else {
            this.zoom(this.saleIncrement);
        }


        this.applyTransformations();
    }

    zoom(value) {

        if(this.scale + value > 0) {
            this.scale += value;
        }
        
        this.applyTransformations();
    }

    applyTransformations()
    {
        
        this.layout.style.left = this.left + this.unit;
        this.layout.style.top = this.top + this.unit;

        this.perspective.style.transformOrigin = '50% 50% ' + (this.translation * 1) + 'px ';
        this.perspective.style.transform = `
            rotateX(` + this.rotationX + `deg)
            rotateY(` + this.rotationY + `deg)
            rotateZ(` + this.rotationZ + `deg)
            scaleX(` + this.scale+ `)
            scaleY(` + this.scale+ `)
            scaleZ(` + this.scale+ `)
        `;
    }

    getPerspective() {
        return this.perspective;
    }

    generate() {
   
        this.container.appendChild(this.layout);
        
        for(let name in this.scenes) {
            let scene = this.scenes[name];
            this.perspective.appendChild(scene);
        }

        for(let name in this.boards) {
            let board = this.boards[name];
            board.generate(
                this.scenes[name]
            );
        }

        this.applyTransformations();
    }




    setRotation(x, y, z) {
        this.perspective.style.transition = 'none';
        this.rotationX = x;
        this.rotationY = y;
        this.rotationZ = z;
        this.applyTransformations();
        console.log(this);
    }

    rotate(x, y, z, duration, callback) {
        this.rotationX = x;
        this.rotationY = y;
        this.rotationZ = z;

        this.perspective.style.transition = 'transform ' + duration + 'ms linear';

        /*
        this.scene.addEventListener(this.getTransitionEndEventName(), function() {
            this.scene.style.transition = 'none';
            if(callback) {
                callback();
            }
        }.bind(this));
        */
        
        this.applyTransformations();
    }

    rotateScene(name, x, y, z, duration, callback) {

        let scene = this.scenes[name];
        scene.style.transition = 'transform ' + duration + 'ms linear';
        scene.style.transform = `
            rotateX(` + x + `deg)
            rotateY(` + y + `deg)
            rotateZ(` + z + `deg)
        `;

        /*
        this.scene.addEventListener(this.getTransitionEndEventName(), function() {
            this.scene.style.transition = 'none';
            if(callback) {
                callback();
            }
        }.bind(this));
        */ 
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


    getBoard(name) {
        return this.boards[name];
    }

    randomize() {
      this.board.randomize();
    }



    setTransformOrigin(x, y, z) {
        this.transformOrigin = x + ' ' + y + ' ' + z;
    }


}