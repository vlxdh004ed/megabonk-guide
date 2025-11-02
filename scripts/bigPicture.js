var galleryLightbox = new SimpleLightbox('.lightbox', {
    nav: false, 
    showCounter: false,
    disableScroll: true, 
    swipe: false, 
    keyboard: false,
    animationSpeed: 70,
});

const body = document.body;
const html = document.documentElement;

function toggleScrollBlock(isOpen) {
    if (isOpen) {
        body.classList.add('lightbox-open');
        html.classList.add('lightbox-open');
    } else {
        setTimeout(() => {
            body.classList.remove('lightbox-open');
            html.classList.remove('lightbox-open');
        }, 50); 
    }
}

galleryLightbox.on('opened.simplelightbox', function () {
    toggleScrollBlock(true);
});
galleryLightbox.on('closed.simplelightbox', function () {
    toggleScrollBlock(false);
});