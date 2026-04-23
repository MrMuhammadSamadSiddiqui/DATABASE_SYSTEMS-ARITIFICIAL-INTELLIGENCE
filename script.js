let cursor=document.getElementById('cursor')
let mx=0
let my=0
document.addEventListener('mousemove',e=>{
    mx=e.clientX
    my=e.clientY
    cursor.style.left=e.clientX+'px'
    cursor.style.top=e.clientY+'px'
})
let ring=document.getElementById('ring')
let rx=0
let ry=0;
(function loop() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(loop);
})();