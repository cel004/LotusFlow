// imports the three.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// allows imports of .gltf files
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Wait until the document is fully loaded
window.addEventListener("load", function() {
    // Delay the scroll reset slightly to avoid jumping
    setTimeout(() => {
        console.log("Resetting scroll position to the top.");
        window.scrollTo(0, 0);
    }, 100); // Adjust the delay as needed (100 milliseconds)
});

// creates three.js scene
const scene = new THREE.Scene();
// create new camera w/ positons & angles
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// keep 3d object on global variable (able to access later)
let object;
// allows camera to move around scene
let controls;

// sets logo to render
let objToRender = 'logo';

const loader = new GLTFLoader();

// load file

loader.load(
    `assets/lotusflow_logo.gltf`,
    function(gltf){
        // if file is loaded, add to scene
        object = gltf.scene;

        object.traverse(function(node) {
            if (node.isMesh) {
                // ensure the mesh has a standard material with color
                node.material = new THREE.MeshStandardMaterial({ color: 0xffffff });
            }
        });
        scene.add(object);
    },
    function(xhr){
        // while loaded, log progress
        console.log((xhr.loaded / xhr.total * 100) * '% loaded');
    },
    function(error){
        // if theres an error, log it
        console.error(error);
    }
);

// instantiate new renderer and set to size (to screen)
const renderer = new THREE.WebGLRenderer({alpha: true, antialias: true}); 
renderer.setSize(window.innerWidth, window.innerHeight);

// add renderer to DOM
document.getElementById("lotusflow-logo").appendChild(renderer.domElement);

// sets how far camera is from 3d models
camera.position.z = 30;

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.98);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0x333333, 1);
scene.add(ambientLight);

// scroll rotate animation
let lastScrollTop = 0;

// add scroll event listener
window.addEventListener('scroll', function () {
    // get current scroll position
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // check if scroll down or up
    if (scrollTop > lastScrollTop) {
        if (object) object.rotation.y += 0.2; 
    } else {
        if (object) object.rotation.y -= 0.2; 
    }

    // update last scroll position
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// renders scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

// start 3d render
animate();