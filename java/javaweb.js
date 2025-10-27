// Espera a que el DOM estigui carregat
document.addEventListener('DOMContentLoaded', function() {
    // Animació del menú responsive amb GSAP (sobre Bootstrap collapse)
    const navbarNav = document.getElementById('navbarNav');
    const navLinks = navbarNav.querySelectorAll('.nav-link');

    // Inicialitza els elements per animació (només en mòbil)
    gsap.set(navLinks, { y: -20, opacity: 0 });

    // Detecta quan s'obre el collapse (Bootstrap event)
    navbarNav.addEventListener('shown.bs.collapse', function() {
        gsap.to(navLinks, {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        });
    });

    // Detecta quan es tanca el collapse
    navbarNav.addEventListener('hidden.bs.collapse', function() {
        gsap.to(navLinks, {
            y: -20,
            opacity: 0,
            duration: 0.3,
            stagger: 0.05,
            ease: "power2.in"
        });
    });

    // Configuració extra del carrusel amb Bootstrap + GSAP animacions
    const carousel = new bootstrap.Carousel(document.getElementById('carouselAmics'), {
        interval: 3000, // 3 segons d'auto-avanç
        pause: 'hover' // Pausa en hover
    });

    // Afegir animació GSAP a cada transició del carrusel
    document.getElementById('carouselAmics').addEventListener('slid.bs.carousel', function (e) {
        // Animació d'entrada per l'item actiu (scale + opacity)
        const activeCard = e.relatedTarget ? e.relatedTarget.querySelector('.carousel-card') : e.target.querySelector('.carousel-card');
        if (activeCard) {
            gsap.fromTo(activeCard, 
                { scale: 0.9, opacity: 0.8 }, 
                { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
            );
        }
    });

    // Opcional: Animació inicial per al primer item
    gsap.fromTo(document.querySelector('#carouselAmics .carousel-item.active .carousel-card'), 
        { scale: 0.9, opacity: 0.8 }, 
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
    );
});