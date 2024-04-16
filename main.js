import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js' //Clase para verificar si WebGl es compatible en el navegador
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js' //Clase para generar texto con geometria
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; //Importamos la clase GLTFLoader para cargar modelos 3D - GBL || GLTF
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js'; //Importamos la clase FBXLoader para cargar modelos 3D - FBX (three/examples/jsm/Addons.js)

const scene = new THREE.Scene(); // Crea una escena
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 ); // Crea una cámara con perspectiva
camera.position.set(200, 240, 500); // Establece la posición de la cámara 10, 12, 12
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
line.scale.set(30, 30, 30);
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
line02.scale.set(50, 50, 50);
scene.add(line02);
//************************//

//Creating texture for add to the cube//
const textureObj = new THREE.TextureLoader();
const texture = textureObj.load('./textures/water.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set( 4, 4 );
//************************//

//Set up for create a cube 3D in movemente//
const geometry = new THREE.BoxGeometry(1, 1, 1); //Crea las geometrias
//const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); //Crea un material básico verde
const material = new THREE.MeshBasicMaterial( {map: texture} ); //Crea un material estandar y le asigna la textura cargada
const cube = new THREE.Mesh(geometry, material); //Combina geometria y material en un mesh (objeto visible)
cube.scale.set(100, 100, 100);
scene.add(cube); //Agrega el mesh a la escena
//************************//

//Procedural Text Geometry//
const loader = new FontLoader();
loader.load('./fonts/gentilis_regular.typeface.json', function (font) {
    const textGeometry = new TextGeometry(
        'Jhon A. Sossa G.',
        {
            font: font,
            size: 80,
            depth: 0,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 1,
            bevelOffset: 0,
            bevelSegments: 10
        }
    );

    textGeometry.computeBoundingBox(); // Calculate bounding

    const centerOffset = -0.5 * ( textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x );
    const hover = 30;
    const text = new THREE.Mesh( textGeometry, new THREE.MeshBasicMaterial( {color: 0x00ffff} ) );
    
    text.position.x = centerOffset;
    text.position.y = hover;
    text.position.z = 0;

    const group = new THREE.Group();
    group.position.y = -400;

    group.add(text);
    scene.add(group);
});
//************************//

//ImageBitmapLoader//
//proporciona una vía asincrónica y eficiente en cuanto a recursos para preparar texturas para renderizar en WebGL.//
let mesh;
const loaderImageBitmap = new THREE.ImageBitmapLoader();
loaderImageBitmap.setOptions({ imageOrientation: 'flipY' });

loaderImageBitmap.load(
    './textures/water.jpg',
    function (imageBitmap) {
        const texture = new THREE.CanvasTexture(imageBitmap);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        const box = new THREE.BoxGeometry(1, 1, 1);
        mesh = new THREE.Mesh(box, material);

        mesh.scale.set(100, 100, 100);
        mesh.position.set(250, 250, 0);
        scene.add(mesh);
    },
    undefined,
    function (error) {
        console.error(error);
    }
)
//************************//

//Loading Model 3D - GLB//
const loaderModel3D = new GLTFLoader();

loaderModel3D.load('./models/Spiderman.glb', function ( gltf ) {
    gltf.scene.scale.set(2, 2, 2);
    gltf.scene.position.set(300, -200, 0);
    scene.add( gltf.scene );
}, undefined, function ( error ) {
    console.error( error );
});
//************************//

//Loading Model 3D - FBX//
const loaderModel3DFBX = new FBXLoader();
let mixer;

loaderModel3DFBX.load("./models/SoccerPenaltyKick.fbx", function( fbx ) {
    fbx.scale.set(1, 1, 1);
    fbx.position.set(-200, -100, 0);
    fbx.rotation.y = (13 * Math.PI) / 6;

    //Adding Animation Model 3D - FBX//
    mixer = new THREE.AnimationMixer(fbx);
    const action = mixer.clipAction(fbx.animations[0]);
    action.play();
    action.timeScale = 1.25; // Adjust the animation speed
    //************************//

    scene.add(fbx);
}, undefined, function ( error ) {
    console.error( error );
});
//************************//

//Creating a direction light//
const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
directionalLight.position.set(0, 10, 0);
scene.add(directionalLight);
//************************//

//Creating a ambient light//
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);
//************************//

//How to dispose of objects//
/*
BufferGeometry.dispose(): Si una geometría queda obsoleta en su aplicación, 
ejecute el método para liberar todos los recursos relacionados.

Material.dispose(): eliminación de materiales, el shader solo puede ser borrado
unicamente si primero se elimino el material.

Texture.dispose(): eliminación de la instacia creada por la texture en three js (WebGLTexture)

ImageBitmap.close(): es usado cuando se usa ImageBitmap para la textura
esto se encargará de eliminar los recursos del lado de la CPU.

Render Targets: objetos de tipo WebGLRenderTarget, son desasignados ejecutando WebGLRenderTarget.dispose() 
*/
//************************//

//Function to rendering scene
function animate() {
    requestAnimationFrame( animate );

    cube.rotation.x += 0.01; // Rota el cubo en el eje X
    cube.rotation.y += 0.01; // Rota el cubo en el eje Y
    line02.rotation.x += 0.001; // Rota la linea en el eje X
    line02.rotation.y += 0.001; // Rota la linea en el eje Y
    line02.rotation.z += 0.001; // Rota la linea en el eje Z

    if (mesh != null) {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
    }
    
    if (mixer != null) mixer.update(0.01); //(deltaTime/1000)/60
    renderer.render(scene, camera); // Renderiza la escena
}

//Function para resize window
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

window.addEventListener('resize', onWindowResize);

//Verificar si el navegador soporta webgl antes de renderizar la escena
if ( WebGL.isWebGLAvailable() ) {
    animate();
}
else {
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById('BrowserNoCompatibility').appendChild(warning);
}