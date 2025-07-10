/** GENERALS */
/** ===================== */

var win = $(window);

// viewport dimensions
var ww = win.width();
var wh = win.height();

$(document).ready(function () {

    // load functions
    imageBG();
    grid();

    // isotope filters
    $('#filters li a').on('click', function (e) {
        e.preventDefault();

        var filter = $(this).attr('href');

        $('#filters li a').removeClass('active');
        $(this).addClass('active');

        $('.grid').isotope({
            filter: filter
        });
    });
});

win.on('load', function () {
    setTimeout(function () {
        $('#preloader').addClass('hide');
    }, 1000);

    // load functions
    grid();
});

win.on('resize', function () {
    // viewport dimensions
    ww = win.width();
    wh = win.height();

    // reload grid
    grid();
});


/** SHOW/HIDE HEADER */
/** ===================== */

function show_hide_header() {
    var last_scroll = 0;

    win.on('scroll', function () {
        if (!$('#about').hasClass('visible')) {
            var scroll = $(this).scrollTop();

            if (scroll > last_scroll) {
                $('#main-header').addClass('hide');
            } else {
                $('#main-header').removeClass('hide');
            }

            last_scroll = scroll;
        }
    });
}


/** BACKGROUND IMAGES */
/** ===================== */

function imageBG() {
    $('.imageBG').each(function () {
        var image = $(this).data('img');

        $(this).css({
            backgroundImage: 'url(' + image + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        });
    });
}


/** GRID */
/** ===================== */

function grid() {
    var container = $('.grid');

    for (var i = 0; i < container.length; i++) {
        var active_container = $(container[i]);
        var container_width = active_container.width();

        var items = active_container.find('.entry');

        var cols = parseInt(active_container.data('cols'), 10);
        var margin = parseInt(active_container.data('margin'), 10);
        var height = parseFloat(active_container.data('height'));
        var double_height = parseFloat(active_container.data('double-height'));

        if (!margin) margin = 0;
        if (!double_height) double_height = 2;

        active_container.css('margin', -Math.floor(margin / 2) + 'px');

        if (ww >= 1000) {
            if (!cols) cols = 3;
        } else if (ww >= 700) {
            if (cols !== 1) cols = 2;
        } else {
            cols = 1;
        }

        var items_width = Math.floor((container_width / cols) - margin);
        var items_height = Math.floor(items_width * height);
        var items_double_height = items_height * double_height;
        var items_margin = Math.floor(margin / 2);

        items.each(function () {
            $(this).css('width', items_width + 'px');
            $(this).css('height', items_height + 'px');
            $(this).css('margin', items_margin + 'px');

            if (!height) $(this).css('height', 'auto');
            if ($(this).hasClass('w2') && ww >= 500) {
                $(this).css('width', (items_width * 2) + (items_margin * 2) + 'px');
            }
            if ($(this).hasClass('h2') && ww >= 500) {
                $(this).css('height', items_double_height + (items_margin * 2) + 'px');
            }
        });

        // init isotope
        active_container.isotope({
            itemSelector: '.entry',
            transitionDuration: '.2s',
            hiddenStyle: {
                opacity: 0
            },
            visibleStyle: {
                opacity: 1
            },
            masonry: {
                columnWidth: items_width + margin
            }
        });

        $(document).ready(function () {
    // Preview modal logic
    $('.preview-link').on('click', function (e) {
        e.preventDefault();
        var src = $(this).attr('href');
        $('#modal-img').attr('src', src);
        $('#image-modal').fadeIn();
    });

    $('.close, #image-modal').on('click', function () {
        $('#image-modal').fadeOut();
    });

    $('#modal-img').on('click', function (e) {
        e.stopPropagation(); // evita que al hacer clic en la imagen se cierre el modal
    });
});

    }
}



