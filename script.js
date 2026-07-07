document.addEventListener("DOMContentLoaded", function () {

    // Seleccionar todos los elementos que tienen la clase 'fade-in'
    const fadeElements = document.querySelectorAll('.fade-in');

    // Configuración del Intersection Observer
    const observerOptions = {
        root: null, // usa el viewport del navegador
        rootMargin: '0px',
        threshold: 0.15 // El 15% del elemento debe ser visible para disparar la animación
    };

    // Crear el observador
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            // Si el elemento entra en la vista
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Dejar de observar el elemento una vez que ya apareció
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Aplicar el observador a cada elemento
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Efecto sutil en la barra de navegación al hacer scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(11, 19, 32, 0.85)';
            navbar.style.backdropFilter = 'blur(15px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.05)';
            navbar.style.backdropFilter = 'blur(12px)';
        }
    });
});

