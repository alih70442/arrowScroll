
{// new updates:
    // js classify or jquery each
    // scroll amount -> half of scroll__outer
    // rtl & ltr option
    // right to left scroll
    // option to always show buttons
    // different animations
    // specific file for basic & minify
    // stylize
    // auto impelement

    // selectors
    let scroll = '.js-arrowScroll';
    let scroll__outer = '.js-arrowScroll__outer';
    let scroll__inner = '.js-arrowScroll__inner';
    let scroll__up = '.js-arrowScroll__up'
    let scroll__down = '.js-arrowScroll__down';

    class ArrowScroll {
        constructor(selector) {
            // selectors
            this.sc = selector;
            this.sc_outer = $(this.sc).find(scroll__outer);
            this.sc_inner = $(this.sc).find(scroll__inner);
            this.sc_up = $(this.sc).find(scroll__up);
            this.sc_down = $(this.sc).find(scroll__down);

            this.events();
        }

        events() {
            // restore object pointer
            let obj = this;

            // if scroll is disable -> inner.height < outer.height
            obj.sc_outer.each(function () {

                if ($(this).height() > obj.sc_inner.height()) {
                    obj.sc_up.css('display', 'none');
                    obj.sc_down.css('display', 'none');
                }
            })

            obj.sc_up.addClass('arrowScroll__up-disable');
            obj.sc_outer.on({

                // hide & show buttons
                mouseenter: function () {
                    // if scroll__inner has overflowed
                    if ($(this).height() < obj.sc_inner.height()) {
                        obj.sc_up.addClass('arrowScroll__up-active');
                        obj.sc_down.addClass('arrowScroll__down-active');
                    }
                },

                // hide & show buttons
                mouseleave: function () {
                    obj.sc_up.removeClass('arrowScroll__up-active');
                    obj.sc_down.removeClass('arrowScroll__down-active');
                },

                // scroll event listener -> hide & show buttons 
                scroll: function () {

                    if (0 == $(this).scrollTop())
                        obj.sc_up.addClass('arrowScroll__up-disable');
                    else
                        obj.sc_up.removeClass('arrowScroll__up-disable');

                    if ($(this).get(0).scrollHeight == ($(this).scrollTop() + $(this).innerHeight() - 17))
                        obj.sc_down.addClass('arrowScroll__down-disable');
                    else
                        obj.sc_down.removeClass('arrowScroll__down-disable');
                }
            })

            // button top functionality
            $(scroll__up).click(function () {
                obj.sc_outer.css('scroll-behavior', 'smooth');
                obj.sc_outer.scrollTop(obj.sc_outer.scrollTop() - 100);
                obj.sc_outer.css('scroll-behavior', 'unset');
            })

            // button bottom functionality
            $(scroll__down).click(function () {
                obj.sc_outer.css('scroll-behavior', 'smooth');
                obj.sc_outer.scrollTop(obj.sc_outer.scrollTop() + 100);
                obj.sc_outer.css('scroll-behavior', 'unset');
            })
        }
    }

    // initilize
    document.querySelectorAll('.js-arrowScroll').forEach(function (item) {
        new ArrowScroll(item);
    })
}