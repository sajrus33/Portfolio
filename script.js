window.onload = app;
function app() {
    const mySetUp = {
        // for ".project__iframe" || for myDOM.iframes.srcs
        iframesSrcs: ["https://sajrus33.github.io/Flubmaster-web/", "https://sajrus33.github.io/Escape-Layout/", "https://sajrus33.github.io/App-ToDo/index.html", "https://sajrus33.github.io/Card-game-prototype/", "https://sajrus33.github.io/Escape-Layout/", "https://sajrus33.github.io/Flubmaster-web/"]
    }
    const myDOM = {

        nav: {
            ham: document.querySelector(".ham"),
            bar1: document.querySelector(".ham__bar--first"),
            bar2: document.querySelector(".ham__bar--second"),
            bar3: document.querySelector(".ham__bar--thirt"),
            hamList: document.querySelector(".ham__list"),
            hamLinks: [...document.querySelectorAll(".ham__link")],
            links: [...document.querySelectorAll(".nav__link")]

        },
        header: document.querySelector(".header"),
        about: document.querySelector(".main__section--about"),
        skills: document.querySelector(".main__section--skills"),

        progress: document.querySelector(".main__section--progress"),
        progressCircles: document.querySelectorAll(".progress__circle"),

        projects: document.querySelector(".main__section--projects"),
        footer: document.querySelector(".main__section--footer"),

        paralax: document.querySelector(".paralax"),
        arrow: document.querySelector(".arrow"),

        iframes: {
            srcs: mySetUp.iframesSrcs,
            iframes: [...document.querySelectorAll(".project__iframe")],
            check: [...document.querySelectorAll(".project__check")],
            code: [...document.querySelectorAll(".project__code")],
        },


        setUpSrcs: function () {
            myDOM.iframes.iframes.forEach((iframe, i) => {
                iframe.src = myDOM.iframes.srcs[i];
                console.log(iframe.src);

            });
        },


        scrollTo: function (target = myDOM.footer, duration = 200) {
            myDOM.paralax.style.animation = "fadeOut .1s forwards";

            // const target = target;
            console.log({ target });

            const targetPosition = target.offsetTop;//top of target
            const startPosition = window.pageYOffset;//window se

            const distance = targetPosition - startPosition;
            // const duration = duration;
            let startTime = null;

            function ease(time, start, distance, duration) {
                time /= duration / 2;
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
        },


        createProgressCircle: function (container = myDOM.progressCircles[0]) {
            const canvas = document.createElement("canvas");
            container.appendChild(cavas);
            canvas.style.width = "100%";
            canvas.style.height = "100%";

            const ctx = canvas.getContext("2d");

            function animate() {

            };

        },
        listen: function () {


            // Event listeners init

            // main nav  && hamburge nav  links"on clicks"
            myDOM.nav.links.forEach((link, i) => {
                const targetName = link.classList.value.slice(21, link.classList.value.length)
                console.log(targetName);
                link.addEventListener("click", function () {
                    console.log(targetName);
                    const scrollTime = myDOM[targetName].offsetTop / 2;
                    myDOM.scrollTo(myDOM[targetName], scrollTime);
                });
                myDOM.nav.hamLinks[i].addEventListener("click", function () {
                    console.log(targetName);
                    const scrollTime = myDOM[targetName].offsetTop / 2;
                    setTimeout(() => {
                        myDOM.scrollTo(myDOM[targetName], scrollTime);
                        myDOM.nav.ham.click();
                    }, 300);
                });
            });
            // hamburger ico menu on click
            myDOM.nav.ham.addEventListener("click", function () {
                // hamburger ico change  ||| -> X
                myDOM.nav.bar1.classList.toggle("ham__bar--firstA");
                myDOM.nav.bar2.classList.toggle("ham__bar--secondA");
                myDOM.nav.bar3.classList.toggle("ham__bar--thirtA");
                // display mobile nav
                myDOM.nav.hamList.classList.toggle("flex");

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


        }



    };

    function init() {
        myDOM.listen();
        // slow !!!!!!!!
        myDOM.setUpSrcs();
    }
    init();
}


// window.addEventListener("resize", function () {
//     console.log("header.offSetBottom");

//     console.log(myDOM.about.offsetTop);
//     console.log(myDOM.header.offsetHeight);

// });



