function toggleStrip(head) {
    const strip = head.parentElement;
    const body = head.nextElementSibling;
    const arrow = head.querySelector('.strip-arrow');
    const isOpen = body.classList.contains('open');

    body.classList.toggle('open', !isOpen);
    arrow.classList.toggle('open', !isOpen);
    strip.classList.toggle('open-strip', !isOpen);

    if (!isOpen) {
        body.querySelectorAll('.res-item').forEach((el, i) => {
            el.style.animation = 'none';
            el.offsetHeight;
            el.style.animationDelay = (0.05 + i * 0.06) + 's';
            el.style.animation = 'fadeIn 0.3s ease forwards';
        });
    }
}

function toggleSub(head) {
    const body = head.nextElementSibling;
    const arrow = head.querySelector('.sub-arrow');
    const isOpen = body.classList.contains('open');

    body.classList.toggle('open', !isOpen);
    arrow.classList.toggle('open', !isOpen);

    if (!isOpen) {
        body.querySelectorAll('.res-item').forEach((el, i) => {
            el.style.animation = 'none';
            el.offsetHeight;
            el.style.animationDelay = (0.04 + i * 0.06) + 's';
            el.style.animation = 'fadeIn 0.3s ease forwards';
        });
    }
}