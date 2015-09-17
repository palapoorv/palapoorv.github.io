
$(document).ready(function(e) {
    $('.with-hover-text, .regular-link').click(function(e){
        e.stopPropagation();
    });

    /***************
     * Hover text *
     * The appearace of text when hovered over
     * as in the contact us section.
     ***************/
    $('.with-hover-text').hover(
        function(e) {
            $(this).css('overflow', 'visible');
            $(this).find('.hover-text')
                .show()
                .css('opacity', 0)
                .delay(200)
                .animate(
                {
                    paddingTop: '25px',
                    opacity: 1
                },
                'fast',
                'linear'
            );
        },
        function(e) {
            var obj = $(this);
            $(this).find('.hover-text')
                .animate(
                {
                    paddingTop: '0',
                    opacity: 0
                },
                'fast',
                'linear',
                function() {
                    $(this).hide();
                    $( obj ).css('overflow', 'hidden');
                }
            );
        }
    );

    $(document).scroll(function(e) {
        delay(function() {

                var tops = [];

                $('.story').each(function(index, element) {
                    tops.push( $(element).offset().top - 200 );
                });

                var scroll_top = $(this).scrollTop();

                var lis = $('.nav > li');

                for ( var i=tops.length-1; i>=0; i-- ) {
                    if ( scroll_top >= tops[i] ) {
                        menu_focus( lis[i], i+1 );
                        break;
                    }
                }
            },
            10);
    });
});

var delay = (function(){
    var timer = 0;
    return function(callback, ms){
        clearTimeout (timer);
        timer = setTimeout(callback, ms);
    };
})();

function menu_focus( element, i ) {

    if ( $(element).hasClass('active') ) {
        if ( i == 6 ) {
            if ( $('.navbar').hasClass('inv') == false )
                return;
        } else {
            return;
        }
    }

    if ( i == 1 || i == 4 )
        $('.navbar').removeClass('inv');
    else
        $('.navbar').addClass('inv');

    $('.nav > li').removeClass('active');
    $(element).addClass('active');

    var icon = $(element).find('.icon');

    var left_pos = icon.offset().left - $('.nav').offset().left;
    var el_width = icon.width() + $(element).find('.text').width() + 10;

    $('.active-menu').stop(false, false).animate(
        {
            left: left_pos,
            width: el_width
        },
        1500,
        'easeInOutQuart'
    );
}

/*************
 * Parallax *
 *************/
jQuery(document).ready(function ($) {

    //cache
    var links = $('.nav').find('li');
    var slide = $('.slide');
    var button = $('.button');
    var htmlbody = $('html,body');

    //Create a function that will be passed a slide number and then will scroll to that slide using jquerys animate. The Jquery
    //easing plugin is also used, so we passed in the easing method of 'easeInOutQuint' which is available throught the plugin.
    function goToByScroll(dataslide) {
        var offset_top = ( dataslide == 1 ) ? '0px' : $('.slide[data-slide="' + dataslide + '"]').offset().top;

        htmlbody.stop(false, false).animate({
            scrollTop: offset_top
        }, 1500, 'easeInOutQuart');
    }

    //When the user clicks on the navigation links, get the data-slide attribute value of the link and pass that variable to the goToByScroll function
    links.click(function (e) {
        e.preventDefault();
        var dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);
        $(".nav-collapse").collapse('hide');
    });

    //When the user clicks on the navigation links,
    //get the data-slide attribute value of the link and pass that variable
    //to the goToByScroll function
    $('.navigation-slide').click(function (e) {
        e.preventDefault();
        var dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);
        $(".nav-collapse").collapse('hide');
    });
});

/***************
 *Menu hover *
 ***************/
jQuery(document).ready(function ($) {
    //cache
    var menu_item = $('.nav').find('li');

    menu_item.hover(
        function(e) {
            var icon = $(this).find('.icon');

            var left_pos = icon.offset().left - $('.nav').offset().left;
            var el_width = icon.width() + $(this).find('.text').width() + 10;

            var hover_bar = $('<div class="active-menu special-active-menu"></div>')
                .css('left', left_pos)
                .css('width', el_width)
                .attr('id', 'special-active-menu-' + $(this).data('slide') );

            $('.active-menu').after( hover_bar );
        },
        function(e) {
            $('.special-active-menu').remove();
        }
    );
});
