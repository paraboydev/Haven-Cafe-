document.addEventListener('DOMContentLoaded', () => {
    // Intercept clicks on internal links for transition
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        const href = link.getAttribute('href');
        
        // Match only internal links ending in .html (or relative roots) and not hash links
        if (href && (href.endsWith('.html') || href === '/' || href.startsWith('./')) && !href.startsWith('#')) {
            link.addEventListener('click', (e) => {
                // If it's opened in a new tab or modifier key is pressed, let it behave normally
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || link.target === '_blank') {
                    return;
                }
                
                e.preventDefault();
                
                // Add fade-out class to body
                document.body.classList.add('fade-out');
                
                // Navigate after animation completes
                setTimeout(() => {
                    window.location.href = href;
                }, 300); // matches the CSS fadeOutPage animation duration (0.3s)
            });
        }
    });

    const header = document.querySelector('header');
    const navbar = document.querySelector('.navbar');

    if (header && navbar) {
        const toggle = document.createElement('button');
        toggle.type = 'button';
        toggle.className = 'nav-toggle';
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Toggle navigation');
        toggle.innerHTML = '<span></span><span></span><span></span>';

        header.insertBefore(toggle, navbar);

        toggle.addEventListener('click', () => {
            const isOpen = header.classList.toggle('nav-open');
            toggle.classList.toggle('active', isOpen);
            toggle.setAttribute('aria-expanded', isOpen);
        });

        navbar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (header.classList.contains('nav-open')) {
                    header.classList.remove('nav-open');
                    toggle.classList.remove('active');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        });

        document.addEventListener('click', (event) => {
            if (header.classList.contains('nav-open') && !header.contains(event.target)) {
                header.classList.remove('nav-open');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
});

window.addEventListener('pageshow', (event) => {
    // If navigated via back/forward browser cache, remove fade-out
    if (event.persisted) {
        document.body.classList.remove('fade-out');
    }
});
