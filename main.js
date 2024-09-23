import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );

const cor1 = new THREE.MeshBasicMaterial( { color: new THREE.Color('rgb(194, 34, 53)') } );
const cor2 = new THREE.MeshBasicMaterial( { color: new THREE.Color('rgb(34, 194, 53)') } );

// Atribuindo cores diferentes para cada face do cubo
const materials = [
    cor1,
    new THREE.MeshBasicMaterial({ color: 0x222222 }),
    new THREE.MeshBasicMaterial({ color: 0x113f4b }),
    cor2,
    new THREE.MeshBasicMaterial({ color: 0xeae3dc }),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
];

// Atribuindo os materiais às faces do cubo
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);

camera.position.z = 5;

// Variáveis para as interações
let rotationSpeedX = 0.01;
let rotationSpeedY = 0.01;
let cubeColorIndex = 0;

// Função que alterna as cores do cubo
function changeCubeColor() {
    const colors = [cor1, cor2];
    cube.material[0] = colors[cubeColorIndex % colors.length]; // Muda a primeira face
    cube.material[3] = colors[cubeColorIndex % colors.length]; // Muda a quarta face
    cubeColorIndex++;
}

// Função que alterna a rotação do cubo
function toggleRotation() {
    rotationSpeedX = rotationSpeedX === 0 ? 0.01 : 0;
    rotationSpeedY = rotationSpeedY === 0 ? 0.01 : 0;
}

// Função para detectar interações com o teclado
document.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'r': // Tecla 'r' reseta a rotação
            cube.rotation.set(0, 0, 0);
            break;
        case 'c': // Tecla 'c' muda as cores do cubo
            changeCubeColor();
            break;
        case 'p': // Tecla 'p' pausa/retoma a rotação
            toggleRotation();
            break;
        default:
            break;
    }
});

// Função para detectar clique do mouse
document.addEventListener('mousedown', (event) => {
    if (event.button === 0) {
        // Clique com o botão esquerdo do mouse
        camera.position.z += 0.5; // Zoom com o botão esquerdo
    } else if (event.button === 2) {
        // Clique com o botão direito do mouse
        camera.position.z -= 0.5; // Zoom inverso com o botão direito
    }
});

// Função de animação
function animate() {
    cube.rotation.x += rotationSpeedX;
    cube.rotation.y += rotationSpeedY;

    renderer.render( scene, camera );
}
