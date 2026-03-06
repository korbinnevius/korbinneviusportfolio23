if (window.matchMedia("(pointer: fine)").matches) {

    let innerCursor = document.querySelector('.inner-cursor')
    let outerCursor = document.querySelector('.outer-cursor')

    document.addEventListener('mousemove', mouseCursor)

    function mouseCursor(e) {
        let x = e.clientX;
        let y = e.clientY;

        // console.log(x, y)

        innerCursor.style.left = `${x}px`;
        innerCursor.style.top = `${y}px`;
        outerCursor.style.left = `${x}px`;
        outerCursor.style.top = `${y}px`;
    }

    let links = Array.from(document.querySelectorAll("a"));

    console.log(links);

    links.forEach(link => {
        link.addEventListener("mouseover", ()=> innerCursor.classList.add("grow"));
        link.addEventListener("mouseover", ()=> outerCursor.classList.add("rotate"));

        link.addEventListener("mouseleave", ()=> innerCursor.classList.remove("grow"));
        link.addEventListener("mouseleave", ()=> outerCursor.classList.remove("rotate"));
    })

}
