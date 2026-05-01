document.addEventListener('DOMContentLoaded', () => {
    const interactives = document.querySelectorAll('.strip-head, .sub-head');

    interactives.forEach(header => {
        header.addEventListener('click', function(e) {
            e.stopPropagation();
            const parent = this.parentElement;
            const body = parent.querySelector(':scope > .strip-body') || parent.querySelector(':scope > .sub-body');
            const arrow = this.querySelector('.strip-arrow, .sub-arrow');

            const isOpen = body.style.height !== '0px' && body.style.height !== '';

            if (!isOpen) {
                body.style.height = body.scrollHeight + "px";
                if(arrow) arrow.classList.add('rotate-arrow');
                parent.classList.add('strip-body-active');
                
                const elements = body.querySelectorAll('.sub, .res-item, tr');
                elements.forEach((el, index) => {
                    el.style.transitionDelay = (index * 0.05) + 's';
                });

                setTimeout(() => {
                    if(body.style.height !== '0px') body.style.height = 'auto';
                }, 600);
            } else {
                body.style.height = body.scrollHeight + "px";
                setTimeout(() => { body.style.height = "0px"; }, 10);
                if(arrow) arrow.classList.remove('rotate-arrow');
                parent.classList.remove('strip-body-active');
            }

            let ancestor = parent.closest('.strip-body');
            while (ancestor) {
                ancestor.style.height = 'auto';
                ancestor = ancestor.parentElement.closest('.strip-body');
            }
        });
    });
});