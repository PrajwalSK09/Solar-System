// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Sun
const sunGeometry = new THREE.SphereGeometry(3, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffcc00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Planets
const planets = [];
const planetData = [
    { size: 0.5, color: 0xaaaaaa, distance: 5, speed: 0.02 },  // Mercury
    { size: 0.8, color: 0xff6600, distance: 8, speed: 0.015 }, // Venus
    { size: 1, color: 0x0000ff, distance: 11, speed: 0.01 },   // Earth
    { size: 0.7, color: 0xff0000, distance: 15, speed: 0.008 } // Mars
];

planetData.forEach(data => {
    const geometry = new THREE.SphereGeometry(data.size, 32, 32);
    const material = new THREE.MeshStandardMaterial({ color: data.color });
    const planet = new THREE.Mesh(geometry, material);
    planet.userData = { distance: data.distance, speed: data.speed, angle: Math.random() * Math.PI * 2 };
    scene.add(planet);
    planets.push(planet);
});

// Lighting
const light = new THREE.PointLight(0xffffff, 1.5);
light.position.set(0, 0, 0);
scene.add(light);

// Camera position
camera.position.z = 20;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate planets around the Sun
    planets.forEach(planet => {
        planet.userData.angle += planet.userData.speed;
        planet.position.x = Math.cos(planet.userData.angle) * planet.userData.distance;
        planet.position.z = Math.sin(planet.userData.angle) * planet.userData.distance;
    });

    renderer.render(scene, camera);
}

animate();

// Resize handling
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
