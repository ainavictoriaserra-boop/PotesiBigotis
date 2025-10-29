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

    // Animació marquee per la franja superior (CORREGIT: DRETA, sense espai blanc)
    const marqueeEl = document.querySelector('.marquee');
    if (marqueeEl) {
        const marqueeContent = marqueeEl.querySelector('.marquee-content');
        const containerWidth = marqueeEl.clientWidth; // Amplada visible del contenidor (per precisió)
        const totalWidth = marqueeContent.scrollWidth; // Amplada total del text (amb duplicats)
        const speed = 60; // px/s (ajusta si vols més/menys ràpid)

        console.log('Marquee iniciat: Amplada contenidor=', containerWidth, 'Total text=', totalWidth, 'Velocitat=', speed); // Debug

        // Posició inicial: desplaçat a l'esquerra perquè el duplicat entri des de la dreta quan es mou a dreta
        gsap.set(marqueeContent, { x: -containerWidth });

        let marqueeTl = gsap.to(marqueeContent, {
            x: 0,  // Mou a DRETA fins a posició 0 (text entra des de l'esquerra, surt per dreta)
            duration: containerWidth / speed,  // Temps basat en l'ample visible / velocitat (cicle perfecte)
            ease: "none",
            repeat: -1,
            force3D: true  // Millora rendiment en mòbils
        });

        // Reinicia després de delay (per mòbils lents)
        setTimeout(() => {
            marqueeTl.restart();
            console.log('Marquee reiniciat'); // Debug
        }, 500);

        marqueeTl.play();

        // Responsive: ajusta estil sense pausar (igual velocitat a tot arreu)
        const mm = gsap.matchMedia();  // ← AFEGEIX AQUESTA LÍNYA (faltava!)
        mm.add("(max-width: 767px)", () => {
            marqueeTl.play();  // Assegura actiu
            gsap.set(marqueeContent, { x: -containerWidth });  // Reinicia posició inicial per dreta
            document.querySelector('.top-strip').style.justifyContent = 'center';
            // Opcional: ajusta velocitat si vols més lenta en mòbils (comenta si no)
            // marqueeTl.duration(containerWidth / 40);  // Ex: 40 px/s més lent
        });

        mm.add("(min-width: 768px)", () => {
            marqueeTl.play();
            gsap.set(marqueeContent, { x: -containerWidth });  // Reinicia posició inicial
            document.querySelector('.top-strip').style.justifyContent = 'flex-start';
            // Restaura velocitat original si vas ajustar a mòbils
            marqueeTl.duration(containerWidth / speed);
        });
    }
});