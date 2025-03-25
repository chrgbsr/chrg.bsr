// Three.js Configuration
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('canvas-container').appendChild(renderer.domElement);
// Scroll Animation System
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            // Reset animation when element leaves view
            entry.target.classList.remove('active'); 
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -10px 0px'
});

// Apply to all animated elements
document.querySelectorAll('[data-scroll]').forEach((el, index) => {
    // Add staggered delay based on element index
    el.style.transitionDelay = `${index * 0.15}s`;
    scrollObserver.observe(el);
});
// 3D Object
const geometry = new THREE.TorusKnotGeometry(3, 1, 256, 32);
const material = new THREE.MeshBasicMaterial({ 
    color: 0xff2a2a,
    wireframe: true,
    transparent: true,
    opacity: 0.1
});
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

camera.position.z = 5;

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    torus.rotation.x += 0.005;
    torus.rotation.y += 0.005;
    renderer.render(scene, camera);
}
animate();

// Scroll Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .project-card, .testimonial-card').forEach(el => {
    observer.observe(el);
});

// Cursor Effects
document.addEventListener('mousemove', (e) => {
    const cursor = document.querySelector('.cursor');
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Resize Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
