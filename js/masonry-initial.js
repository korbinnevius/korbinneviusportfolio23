// external js: masonry.pkgd.js, imagesloaded.pkgd.js

// init Masonry
var grid = document.querySelector('.grid');

grid.style.opacity = '0';
grid.style.transition = 'opacity 0.4s ease';

var msnry = new Masonry(grid, {
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true
    // gutter: 5
});

imagesLoaded(grid).on('always', function () {
    msnry.layout();
    grid.style.opacity = '1';
});