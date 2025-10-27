// Espera a que el DOM estigui carregat
document.addEventListener('DOMContentLoaded', function() {
    // Animació del menú responsive amb GSAP
    const navbarNav = document.getElementById('navbarNav');
    const navLinks = navbarNav.querySelectorAll('.nav-link');

    // Inicialitza els elements fora de la pantalla (per animació d'entrada)
    gsap.set(navLinks, { y: -20, opacity: 0 });

    // Event per quan el menú s'obre (collapse show)
    const collapseElement = new bootstrap.Collapse(navbarNav, {
        toggle: false // No togglear automàticament
    });

    const toggler = document.querySelector('.navbar-toggler');
    toggler.addEventListener('click', function() {
        if (navbarNav.classList.contains('show')) {
            // Animació d'entrada quan s'obre
            gsap.to(navLinks, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1, // Desplaçament temporal entre elements
                ease: "power2.out"
            });
        } else {
            // Animació de sortida quan es tanca (opcional, per suavitzar)
            gsap.to(navLinks, {
                y: -20,
                opacity: 0,
                duration: 0.3,
                stagger: 0.05,
                ease: "power2.in"
            });
        }
    });

    // Per detectar el tancament automàtic (clic fora), utilitza l'event hidden
    navbarNav.addEventListener('hidden.bs.collapse', function() {
        gsap.set(navLinks, { y: -20, opacity: 0 });
    });

    // Configuració del carrusel amb Bootstrap (ja inclou auto-avanç i fletxes)
    // Si vols una animació més personalitzada amb GSAP, pots reemplaçar això amb un carrusel custom
    const carousel = new bootstrap.Carousel(document.getElementById('carouselAmics'), {
        interval: 3000, // 3 segons d'auto-avanç
        pause: 'hover' // Pausa en hover per millor UX
    });

    // Opcional: Afegir animacions GSAP addicionals al carrusel (ex: escalat en transició)
    const carouselInner = document.querySelector('#carouselAmics .carousel-inner');
    const carouselItems = document.querySelectorAll('#carouselAmics .carousel-item');

    carouselInner.addEventListener('slid.bs.carousel', function (e) {
        // Animació d'entrada per l'item actiu
        gsap.fromTo(e.target.querySelector('.carousel-card'), 
            { scale: 0.9, opacity: 0.8 }, 
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
        );
    });
});