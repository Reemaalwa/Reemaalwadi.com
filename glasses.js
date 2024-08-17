var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.5, 1000);
camera.position.set(25, 6, 25);
var renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setClearColor(0x000000, 0);
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container-3d').appendChild(renderer.domElement);

// Lighting
var ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);

// Controls
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Raycaster for object picking
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();


// GLTF Loader
var loader = new THREE.GLTFLoader();
loader.load('../3d/matrix_sunglasses/scene.gltf', function (gltf) {
    scene.add(gltf.scene);
    gltf.scene.position.set(1, 0, 7);
    animate();
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

window.addEventListener('resize', onWindowResize, false);
window.addEventListener('click', onMouseClick, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onMouseClick(event) {
    event.preventDefault();

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        var object = intersects[0].object;
        zoomToObject(object);
    }
}

function zoomToObject(object) {
    var zoomTargetPosition = object.position.clone().add(new THREE.Vector3(-4, 0, 10));
    camera.position.copy(zoomTargetPosition);
    camera.lookAt(object.position);
    setTimeout(function() {
        window.location.href = "../loading/loading.html"; // Change the URL to your desired page
    }, 2000);
}
