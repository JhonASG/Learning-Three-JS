import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js'

const scene = new THREE.Scene(); // Crea una escena
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 ); // Crea una cámara con perspectiva
camera.position.set(10, 12, 12); // Establece la posición de la cámara
camera.lookAt(0, 0, 0); // La cámara estará mirando el centro de la escena

const renderer = new THREE.WebGLRenderer(); // Crea un renderizador WebGL
//setSize(window.innerWidth/2, window.innerHeight/2, false) 
//el parametro false indica que la imagen será renderizada a mitad de su resolución original
renderer.setSize( window.innerWidth, window.innerHeight ); // Establece el tamaño del renderizador igual al viewport
document.body.appendChild( renderer.domElement ); // Añade el elemento canvas al DOM

//Set up for drawing lines//
const materialLine = new THREE.LineBasicMaterial({
  color: 0x0000ff
}); // Creamos un material básico para la linea que vamos a dibujar (azul)

//Creamos una geometria con varios vertices
const points = [];
points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));

const geometryLine = new THREE.BufferGeometry().setFromPoints( points ); // Crea una geometria a través de puntos

const line = new THREE.Line( geometryLine, materialLine ); // Creamos la línea usando los puntos y el material
scene.add(line);

//Testing drawing line - Cubo 3D with lines
const materialLine2 = new THREE.LineBasicMaterial({color: 0xff0000});

const points2 = [];
points2.push(new THREE.Vector3(-2, 2, -2));
points2.push(new THREE.Vector3(-2, 2, 2));
points2.push(new THREE.Vector3(2, 2, 2));
points2.push(new THREE.Vector3(2, 2, -2));
points2.push(new THREE.Vector3(-2, 2, -2));
points2.push(new THREE.Vector3(-2, -2, -2));
points2.push(new THREE.Vector3(2, -2, -2));
points2.push(new THREE.Vector3(2, 2, -2));
points2.push(new THREE.Vector3(-2, 2, 2));
points2.push(new THREE.Vector3(-2, -2, 2));
points2.push(new THREE.Vector3(-2, -2, -2));
points2.push(new THREE.Vector3(2, -2, 2));
points2.push(new THREE.Vector3(2, -2, -2));
points2.push(new THREE.Vector3(-2, -2, 2));
points2.push(new THREE.Vector3(2, -2, 2));
points2.push(new THREE.Vector3(2, 2, 2));

const geometryLine02 = new THREE.BufferGeometry().setFromPoints( points2 );

const line02 = new THREE.Line( geometryLine02, materialLine2 );
scene.add(line02);
//************************//

//Set up for create a cube 3D in movemente//
const geometry = new THREE.BoxGeometry(1, 1, 1); //Crea las geometrias
const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); //Crea un material básico verde
const cube = new THREE.Mesh(geometry, material); //Combina geometria y material en un mesh (objeto visible)
scene.add(cube); //Agrega el mesh a la escena
//************************//

//Function to rendering scene
function animate() {
    requestAnimationFrame( animate );
    cube.rotation.x += 0.01; // Rota el cubo en el eje X
    cube.rotation.y += 0.01; // Rota el cubo en el eje Y
    line02.rotation.x += 0.001; // Rota la linea en el eje X
    line02.rotation.y += 0.001; // Rota la linea en el eje Y
    line02.rotation.z += 0.001; // Rota la linea en el eje Z
    renderer.render(scene, camera); // Renderiza la escena
}

//Verificar si el navegador soporta webgl antes de renderizar la escena
if ( WebGL.isWebGLAvailable() ) {
    animate();
}
else {
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById('BrowserNoCompatibility').appendChild(warning);
}