document.addEventListener("DOMContentLoaded", () => {
    
    // --- Sticky Navbar Setup ---
    const header = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // --- Mobile Hamburger Menu ---
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu ul li a");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        const isExpanded = hamburger.getAttribute("aria-expanded") === "true";
        hamburger.setAttribute("aria-expanded", !isExpanded);
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");
        });
    });

    // --- Subtle Scroll Animations ---
    // Uses IntersectionObserver to trigger smooth fade-ups when elements enter the viewport.
    const revealElements = document.querySelectorAll('.reveal');

    // Only apply animations if user has not disabled them in their OS settings
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target); // Run once per element
                }
            });
        }, {
            root: null,
            threshold: 0.15, // Triggers when 15% of element is visible
            rootMargin: "0px 0px -50px 0px"
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        // If reduced motion is requested, show elements immediately
        revealElements.forEach(element => {
            element.classList.add('active');
            element.style.transition = 'none';
        });
    }
});