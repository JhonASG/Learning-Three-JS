import * as THREE from 'three';

const scene = new THREE.Scene(); // Crea una escena
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 ); // Crea una cámara con perspectiva

const renderer = new THREE.WebGLRenderer(); // Crea un renderizador WebGL
//setSize(window.innerWidth/2, window.innerHeight/2, false) 
//el parametro false indica que la imagen será renderizada a mitad de su resolución original
renderer.setSize( window.innerWidth, window.innerHeight ); // Establece el tamaño del renderizador igual al viewport
document.body.appendChild( renderer.domElement ); // Añade el elemento canvas al DOM

//Crear un cubo 3D
const geometry = new THREE.BoxGeometry(1, 1, 1); //Crea las geometrias
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); //Crea un material básico verde
const cube = new THREE.Mesh(geometry, material); //Combina geometria y material en un mesh (objeto visible)
scene.add(cube); //Agrega el mesh a la escena

camera.position.z = 5; //Establece la posición Z del observador

function animate() {
    requestAnimationFrame( animate );
    cube.rotation.x += 0.01; // Rota el cubo en el eje X
    cube.rotation.y += 0.01; // Rota el cubo en el eje Y
    renderer.render(scene, camera); // Renderiza la escena
}

animate();