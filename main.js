import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Create scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);
var button=document.getElementById('button');
button.addEventListener('click',function(){
  flipPage();
});
// Create cubes
const geometry = new THREE.BoxGeometry(4, 4, 0.1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const material1 = new THREE.MeshBasicMaterial({ color: 0x00ffff });
const lowerCube = new THREE.Mesh(geometry, material);
const upperCube = new THREE.Mesh(geometry, material1);
// upperCube.position.y = 5; // Position upper cube above lower cube
scene.add(lowerCube);
scene.add(upperCube);

// Set up camera
camera.position.z = 10;

// Set up controls
const controls = new OrbitControls(camera, renderer.domElement);

// Function to flip page
function flipPage() {
    const flipDuration = 1000; // Duration of the flip animation in milliseconds
    const flipAngle = Math.PI / 2; // Angle to flip the page

    // Rotate upper cube around its own y-axis
    const initialRotation = { y: upperCube.rotation.y };
    const targetRotation = { y: upperCube.rotation.y + flipAngle };
    const rotationTween = new TWEEN.Tween(initialRotation)
        .to(targetRotation, flipDuration)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
            upperCube.rotation.y = initialRotation.y;
        })
        .start();

    // Scale upper cube along the x-axis to simulate flipping
    const initialScale = { x: 1 };
    const targetScale = { x: 0 };
    const scaleTween = new TWEEN.Tween(initialScale)
        .to(targetScale, flipDuration)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
            upperCube.scale.x = initialScale.x;
        })
        .start();
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();
    renderer.render(scene, camera);
}

animate();


