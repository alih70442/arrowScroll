
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
            this.sc_outer;
            this.sc_inner;
            this.sc_up;
            this.sc_down;

            this.init_html();
            this.is_enable();
            this.events();
        }

        events() {
            // restore object pointer
            let obj = this;

            obj.sc_up.addClass('arrowScroll__up-disable');
            obj.sc_outer.on({

                // hide & show buttons
                mouseenter: function () {
                    // if scroll__inner has overflowed
                    if (obj.is_enable() == true) {
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

                    if ($(this).get(0).scrollHeight == ($(this).scrollTop() + $(this).height()))
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

        init_html() {
            $(this.sc).wrapInner(`<div class="arrowScroll__outer js-arrowScroll__outer"><div class="arrowScroll__inner js-arrowScroll__inner"></div></div>`);
            $(this.sc).find('.js-arrowScroll__outer').prepend(`
                <button class="arrowScroll__up js-arrowScroll__up">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 10" width="20" height="10"
                        style="transform: rotate(180deg);">
                        <path fill="none" stroke="white" stroke-width="1.5" d="M2 1l8 8 8-8"></path>
                    </svg>
                </button>

                <button class="arrowScroll__down js-arrowScroll__down">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 10" width="20" height="10">
                        <path fill="none" stroke="white" stroke-width="1.5" d="M2 1l8 8 8-8"></path>
                    </svg>
                </button>
            `);

            // set pointers
            this.sc_outer = $(this.sc).find(scroll__outer);
            this.sc_inner = $(this.sc).find(scroll__inner);
            this.sc_up = $(this.sc).find(scroll__up);
            this.sc_down = $(this.sc).find(scroll__down);
        }

        is_enable() {
            if (this.sc_outer.height() >= this.sc_inner.height()) {
                this.sc_up.css('display', 'none');
                this.sc_down.css('display', 'none');
                return false
            } else {
                this.sc_up.css('display', 'block');
                this.sc_down.css('display', 'block');
                return true;
            }
        }
    }

    // initialize
    document.querySelectorAll('.js-arrowScroll').forEach(function (item) {
        new ArrowScroll(item);
    })
}