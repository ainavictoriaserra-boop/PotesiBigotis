// Espera a que el DOM estigui carregat (UN SOL BLOCK)
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregat! GSAP version:', gsap ? gsap.version : 'NO CARREGAT');

    
    // Animació del menú responsive amb GSAP
    const navbarNav = document.getElementById('navbarNav');
    if (navbarNav) {
        const navLinks = navbarNav.querySelectorAll('.nav-link');
        gsap.set(navLinks, { y: -20, opacity: 100 });

        navbarNav.addEventListener('shown.bs.collapse', function() {
            gsap.to(navLinks, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out"
            });
        });

        navbarNav.addEventListener('hidden.bs.collapse', function() {
            gsap.to(navLinks, {
                y: -20,
                opacity: 0,
                duration: 0.3,
                stagger: 0.05,
                ease: "power2.in"
            });
        });
    }

    // Carrusel
    const carouselEl = document.getElementById('carouselAmics');
    if (carouselEl) {
        const carousel = new bootstrap.Carousel(carouselEl, {
            interval: 3000,
            pause: 'hover'
        });

        carouselEl.addEventListener('slid.bs.carousel', function (e) {
            const activeCard = e.relatedTarget ? e.relatedTarget.querySelector('.carousel-card') : e.target.querySelector('.carousel-item.active .carousel-card');
            if (activeCard) {
                gsap.fromTo(activeCard, 
                    { scale: 0.9, opacity: 0.8 }, 
                    { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
                );
            }
        });

        const firstCard = document.querySelector('#carouselAmics .carousel-item.active .carousel-card');
        if (firstCard) {
            gsap.fromTo(firstCard, 
                { scale: 0.9, opacity: 0.8 }, 
                { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)" }
            );
        }
    }

    // Animació marquee per la franja superior
    const marqueeEl = document.querySelector('.marquee');
    if (marqueeEl) {
        const marqueeContent = marqueeEl.querySelector('.marquee-content');
        const textWidth = marqueeContent.scrollWidth / 2; // Mitat perquè està duplicat
        const speed = 50; // Velocitat en px/s (ajusta segons necessitis)

        let marqueeTl = gsap.to(marqueeContent, {
            xPercent: -50,
            duration: textWidth / speed,
            ease: "none",
            repeat: -1
        });

        // Responsive: pausa en mòbil (max-width: 767px, igual que el menú Bootstrap)
        const mm = gsap.matchMedia();
        mm.add("(max-width: 767px)", () => {
            marqueeTl.pause();
            gsap.set(marqueeContent, { xPercent: 0 }); // Centra el text
            document.querySelector('.top-strip').style.justifyContent = 'center';
        });

        mm.add("(min-width: 768px)", () => {
            marqueeTl.play();
            gsap.set(marqueeContent, { xPercent: 0 }); // Reinicia posició
            document.querySelector('.top-strip').style.justifyContent = 'flex-start';
        });
    }
});