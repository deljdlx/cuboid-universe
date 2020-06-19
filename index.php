<!doctype html>
<html>
<head>
    
<link rel="stylesheet" href="./displayblock/source/css/style.css" />
<link rel="stylesheet" href="./displayblock/source/css/Scene.css" />
<link rel="stylesheet" href="./displayblock/source/css/Board.css" />

<link rel="stylesheet" href="./displayblock/source/css/Item.css" />

<link rel="stylesheet" href="./displayblock/source/css/Cuboid.css" />
<link rel="stylesheet" href="./displayblock/source/css/Cube.css" />

<link rel="stylesheet" href="asset/style.css" />

<style>
body {
    /*background: radial-gradient(circle, rgba(13,140,192,1) 0%, rgba(9,55,102,1) 58%);*/
    background-image:
        radial-gradient(circle, rgba(0,4,33,0.9) 0%, rgba(0,1,14,0.8) 58%),
        url(https://cdn.spacetelescope.org/archives/images/screen/heic1620a.jpg);
    background-size: cover;
    /*background: radial-gradient(circle, rgba(0,4,33,1) 0%, rgba(0,1,14,1) 58%);*/
}

.orbit {
    position: absolute;
    border: dashed 1px rgba(100,255,255, 0.5);
    background-color:rgba(255,255,255, 0.002);
    border-radius: 100%;
}



.the-boss .cuboid-side {
    background-image: url(fantasy/the-boss.jpg);
    background-size: cover;
    background-color:rgba(255,255, 200, 0.8);
    box-shadow: 0 0 30px 30px rgba(255,255, 200, 0.7);
    border: solid 1px #FFF;

}




.cuboid.axis .cuboid-side {
    background-color:rgba(255, 255, 255, 0.4);
    border: none;
 }

h1 {
    color:  rgba(255,255,255,0.9);
    text-shadow: 0 0 20px rgba(255,255,200,0.9);
}
.cuboid-side {
    background-size: cover;
}

<?php

for($i = 0; $i < 45 ; $i++) {
    //$imageNumber = str_pad($i, 2, '0', STR_PAD_LEFT);
    $imageNumber = str_pad(rand(0,45), 2, '0', STR_PAD_LEFT);
    echo "
        .item-".$i." .cuboid-side {
            background-image: url('fantasy/".$imageNumber.".jpg');
        }
    ";
}

?>


</style>


<title>Fantasy System</title>

</head>

<body>

<h1>Fantasy System</h1>


<script src="./displayblock/source/js/Viewport.js"></script>
<script src="./displayblock/source/js/Board.js"></script>
<script src="./displayblock/source/js/Board/Free.js"></script>
<script src="./displayblock/source/js/Item.js"></script>
<script src="./displayblock/source/js/Cuboid.js"></script>
<script src="./displayblock/source/js/Cube.js"></script>

<script>
<?php
$number = 10;
if(isset($_GET['number'])) {
    $number = $_GET['number'];
}

$maxAngle = 20;
if(isset($_GET['maxAngle'])) {
    $maxAngle = $_GET['maxAngle'];
}
?>

function rotateBoard(board, interval, x0, y0, z0, x1, y1, z1) {
    setTimeout(function() {
        board.rotate(x1 , y1 ,z1 , interval, () => {
            board.setRotation(x0, y0, z0);
            rotateBoard(board, interval, x0, y0, z0, x1, y1, z1);
        });
    },0);
}



let boards = {}
let maxParticules = <?=$number;?>;
let maxAngle = <?=$maxAngle;?>;
let cubes = [];


let viewport = new Viewport(document.body);


let x = document.body.offsetWidth/2;
let y = document.body.offsetHeight/2;
let z = 0;

let size = 100;


let xAxis = new Cuboid(2000, 1, 1);
xAxis.addClass('axis');
viewport.addItem(xAxis, -1000 + x, y, z);


let yAxis = new Cuboid(1, 2000, 1);
yAxis.addClass('axis');
viewport.addItem(yAxis, x, -1000 + y, z);

let zAxis = new Cuboid(1, 1, 2000);
zAxis.addClass('axis');
viewport.addItem(zAxis, x, y, 1000 + z);



let cube = new Cube(size, size);
cube.centerOrigin();
cube.addClass('the-boss')
viewport.addItem(cube, x, y, z);


//=================================================================



for(let i = 0 ; i < maxParticules ; i++) {

    let size = 10;
    if(maxParticules>10) {
        console.log('ici');
        size = 30 + Math.trunc(Math.random() * 30);
    }
    else {
        size = 30 + Math.trunc(Math.random() * 50);
    }
    
    let angle0 = Math.trunc(Math.random() * maxAngle);

    if(Math.random()>0.5) {
        angle0 *= -1;
    }
    let angle1 = Math.trunc(Math.random() * 360);


    let boardName = 'board-' + i;
    let board = new Free(viewport);
    boards[boardName] = board;
    board.rotate(0, 0, 0);
    viewport.addBoard(boardName, board);
    viewport.rotateScene(boardName, angle0, 0, angle1);

    
    let cube = new Cube(size, size);
    cube.centerOrigin();
    cube.addClass('item-' + i);

    let by = y + 20 + Math.trunc(Math.random() * 800);
    let bx = x + 20 + Math.trunc(Math.random() * 800);

    viewport.addItem(cube, bx, by , 0, boardName);
    let scene = viewport.getScene(boardName);

    let orbit = document.createElement('div');
    orbit.classList.add('orbit');
    let rayon = Math.sqrt(
        Math.pow((bx - x), 2) +
        Math.pow((by - y), 2)
    );
    orbit.style.width = rayon * 2 + 'px';
    orbit.style.height = rayon * 2 + 'px';
    orbit.style.left = x - rayon + 'px';
    orbit.style.top = y - rayon + 'px';
    scene.appendChild(orbit);

    var interval = 5000 + Math.trunc(Math.random() * 10000);
}


viewport.generate();


viewport.setRotation(0, 0, 0);


if(maxParticules>10) {
    viewport.setRotation(45, 0, 45);
    viewport.scale = 0.6;
    viewport.disableZoom = true;
    viewport.applyTransformations();
}



for(let i = 0 ; i < maxParticules ; i++) {
    let boardName = 'board-' + i;
    var interval = 5000 + Math.trunc(Math.random() * 9000);
    rotateBoard(boards[boardName], interval, 0, 0, 0, 0, 0, 360);
}




x = Math.floor(Math.random() * 360);
y = Math.floor(Math.random() * 360);
z = Math.floor(Math.random() * 360);

cube.rotate(x, y, z, 0);
cube.draw();

setInterval(function() {
    var x = Math.floor(Math.random() * 360);
    var y = Math.floor(Math.random() * 360);
    var z = Math.floor(Math.random() * 360);

    cube.rotate(x, y, z, 10000);
    cube.draw();

}, 10000)





</script>





</body>
</html>
