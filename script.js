const items = document.querySelectorAll('.floating');

window.addEventListener('scroll', () => {

    const scroll = window.scrollY;

    items.forEach((item, index) => {

        let x = 0;
        let y = scroll * 0.15;

        switch(index % 5) {

            case 0:
                x = scroll * 0.08;
                break;

            case 1:
                x = -scroll * 0.06;
                break;

            case 2:
                x = Math.sin(scroll * 0.002) * 120;
                break;

            case 3:
                x = Math.cos(scroll * 0.002) * 80;
                break;

            case 4:
                x = Math.sin(scroll * 0.0015) * 180;
                break;
        }

        const scale =
            1 + Math.sin(scroll * 0.001 + index) * 0.08;

        item.style.transform =
            `translate(${x}px, ${y}px) scale(${scale})`;
    });

});
