var TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function () {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function () {
        that.tick();
    }, delta);
};

window.onload = function () {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.14em solid #FFE17D}";
    document.body.appendChild(css);
};

// scroll up
var target = document.getElementById("breakUp");

var scrollToTopBtn = document.querySelector(".scrollToTopBtn");
var rootElement = document.documentElement;

function callback(entries, observer) {

    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Show button
            scrollToTopBtn.classList.add("showBtn");
        } else {
            // Hide button
            scrollToTopBtn.classList.remove("showBtn");
        }
    });
}

function scrollToTop() {
    rootElement.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}
scrollToTopBtn.addEventListener("click", scrollToTop);

let observer = new IntersectionObserver(callback);

observer.observe(target);

//mobile menu
const navBar = document.querySelector('.navBarMenu');
const navToggle = document.querySelector('.navToggle');

navToggle.addEventListener('click', () => {
    const show = navBar.getAttribute('data-visible')
    if (show === "false") {
        navBar.setAttribute('data-visible', true);
    } else if (show === "true"){
        navBar.setAttribute('data-visible', false);
    }
});