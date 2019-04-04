window.onload = app;
function app() {
    const mySetUp = {
        // for ".project__iframe" || for myDOM.iframes.srcs
        iframesSrcs: ["https://sajrus33.github.io/Flubmaster-web/", "https://sajrus33.github.io/Flubmaster-web/", "https://sajrus33.github.io/App-ToDo/index.html", "https://sajrus33.github.io/Flubmaster-web/", "https://sajrus33.github.io/App-ToDo/index.html", "https://sajrus33.github.io/Flubmaster-web/"]
    }
    const myDOM = {
        link: [...document.querySelectorAll(".nav__link")],
        iframes: {
            srcs: mySetUp.iframesSrcs,
            iframes: [...document.querySelectorAll(".project__iframe")],
            check: [...document.querySelectorAll(".project__check")],
            code: [...document.querySelectorAll(".project__code")],
        },

        header: document.querySelector(".header"),
        about: document.querySelector(".main__section--about"),
        skills: document.querySelector(".main__section--skills"),
        progress: document.querySelector(".main__section--progress"),
        projects: document.querySelector(".main__section--projects"),
        footer: document.querySelector(".main__section--footer"),

        paralax: document.querySelector(".paralax"),
        arrow: document.querySelector(".arrow"),

        setUpSrcs: function () {
            myDOM.iframes.iframes.forEach((iframe, i) => {
                iframe.src = myDOM.iframes.srcs[i];
                console.log(iframe.src);

            });
        },


        scrollTo: function (target = myDOM.footer, duration = 200) {
            myDOM.paralax.style.animation = "fadeOut .1s forwards";

            // const target = target;
            console.log(target, "heeere");
            const targetPosition = target.offsetTop;//top of target
            console.log(targetPosition);
            const startPosition = window.pageYOffset;//window se
            console.log(startPosition);

            const distance = targetPosition - startPosition;
            // const duration = duration;
            let startTime = null;

            function ease(time, start, distance, dur) {
                time /= dur / 2;
                if (time < 1) return distance / 2 * time * time + start;
                time--;
                return -distance / 2 * (time * (time - 2) - 1) + start;
            }

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                console.log(startTime);
                const timeElapsed = currentTime - startTime;
                const newPosition = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, newPosition);
                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                } else {
                    myDOM.paralax.style.animation = "fadeIn .5s forwards";

                }
            }
            requestAnimationFrame(animation)
        }


    };

    function init() {

        // Event listeners init
        myDOM.link.forEach(link => {
            const targetName = link.classList.value.slice(21, link.classList.value.length)
            console.log(targetName);
            link.addEventListener("click", function () {
                console.log(targetName);
                const scrollTime = myDOM[targetName].offsetTop / 2;
                myDOM.scrollTo(myDOM[targetName], scrollTime);
            });
        });

        myDOM.arrow.addEventListener("click", function () {
            console.log("click");
            const scrollTime = Math.abs(window.pageYOffset / 3);

            myDOM.scrollTo(myDOM.header, scrollTime);
        });

        myDOM.iframes.code.forEach(iframe => {
            iframe.addEventListener("click", function () {
                const url = this.previousElementSibling.getAttribute("data-code");
                console.log(url);
                window.open(url);
            });

        });
        myDOM.iframes.check.forEach(iframe => {
            iframe.addEventListener("click", function () {
                const url = this.previousElementSibling.previousElementSibling.getAttribute("src");
                console.log(url);
                window.open(url);
            });
        });

        // slow !!!!!!!!!!!

    }
    init();
    myDOM.setUpSrcs();






}


// window.addEventListener("resize", function () {
//     console.log("header.offSetBottom");

//     console.log(myDOM.about.offsetTop);
//     console.log(myDOM.header.offsetHeight);

// });



