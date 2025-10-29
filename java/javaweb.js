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
    const textWidth = marqueeContent.scrollWidth / 2; // Mitat per duplicats
    const speed = 40; // Velocitat lenta per mòbils/tauletes (ajusta: 15-40 px/s)

    console.log('Marquee iniciat: Amplada text =', textWidth, 'Velocitat =', speed); // Debug: mira a consola

    let marqueeTl = gsap.to(marqueeContent, {
        xPercent: 50,
        duration: textWidth / speed,
        ease: "none",
        repeat: -1,
        force3D: true  // Millora rendiment en mòbils (hardware acceleration)
    });

    // Reinicia l'animació després d'un petit delay (per mòbils lents)
    setTimeout(() => {
        marqueeTl.restart();
        console.log('Marquee reiniciat per mòbils/touch'); // Debug
    }, 500);

    marqueeTl.play();

        mm.add("(min-width: 768px)", () => {
            marqueeTl.play();
            gsap.set(marqueeContent, { xPercent: 0 }); // Reinicia posició
            document.querySelector('.top-strip').style.justifyContent = 'flex-start';
        });
    }
});