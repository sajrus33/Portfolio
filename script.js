
function init() {
    const myDOM = {
        link: [
            about = document.querySelector(".nav__link--about"),
            skills = document.querySelector(".nav__link--skills"),
            progress = document.querySelector(".nav__link--progress"),
            projects = document.querySelector(".nav__link--projects"),
            footer = document.querySelector(".nav__link--footer"),
        ],
        // listen: function () {
        //     myDOM.link["about"] = document.querySelector(".nav__link--about");
        //     myDOM.link["skills"] = document.querySelector(".nav__link--skills");
        //     myDOM.link["progress"] = document.querySelector(".nav__link--progress");
        //     myDOM.link["projects"] = document.querySelector(".nav__link--projects");
        //     myDOM.link["footer"] = document.querySelector(".nav__link--footer");
        // },

        header: document.querySelector(".header"),
        about: document.querySelector(".main__section--about"),
        skills: document.querySelector(".main__section--skills"),
        progress: document.querySelector(".main__section--progress"),
        projects: document.querySelector(".main__section--projects"),
        footer: document.querySelector(".main__section--footer"),

        paralax: document.querySelector(".paralax"),
        arrow: document.querySelector(".arrow"),




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
    function listen() {
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
    }
    listen();
    // myDOM.link.about.addEventListener("click", function () {
    //     const targetName = this.classList.value.slice(21, this.classList.value.length)
    //     console.log(targetName);
    //     console.log("click works", myDOM[targetName]);
    // });

    // let mySize = {

    // }






}

window.onload = init;

// window.addEventListener("resize", function () {
//     console.log("header.offSetBottom");

//     console.log(myDOM.about.offsetTop);
//     console.log(myDOM.header.offsetHeight);

// });



