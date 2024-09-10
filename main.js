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

function animate() {

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );

}