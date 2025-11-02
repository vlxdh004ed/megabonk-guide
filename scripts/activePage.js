document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;

    const navLinks = document.querySelectorAll('.header__nav-link');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href'); 
            
            
        if (currentPath.endsWith(linkPath) || (currentPath.endsWith('/') && linkPath === 'index.html')) {
            link.classList.add('is-active');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;

    const navLinks = document.querySelectorAll('.header__nav-link');

    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        if (currentPath.endsWith(linkHref)) {
            link.classList.add('is-active');
        } 
        
        else if (currentPath.endsWith('/') && linkHref === 'index.html') {
            link.classList.add('is-active');
        }
        
        else if (linkHref === 'guides.html') {
            if (currentPath.includes('/guides/')) {
                link.classList.add('is-active');
            }
        }
    });
});