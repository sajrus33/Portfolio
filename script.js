"use strict";
window.addEventListener("DOMContentLoaded", app);
function app() {
    let myObjects = {//just object container 
        circles: [],
        circlesRunning: false
    }
    const mySetUp = {//Here you can set up page app, circles parametrs.. for now.
        myName: "Brian",
        myEmail: "brianwala22@gmail.com",
        // progress
        speed: [
            75 * 1,
            50 * 1,
            35 * 1,
            15 * 1,
            20 * 1

        ],
        progress: [
            .75,
            .50,
            .35,
            .15,
            .20
        ],
        text: [
            "BEM, SEMANTIC TAGS, HTML5 STANDARDS, basic SEO, flex, grid, bootrstrap4, Old tehchnologys (inline-block, float-left etc.), Responsive desgine. I am using for testing: HTML Validator, lighthouse audits and gtmetrix history. Currently working on: PSD cut to HTML/CSS",
            "Vanilla, ES6, arrow functions, this, bind, class, extends, exports, require, canvas context, jquery lib, emailjs lib, leaflet lib, ProgressBar.js lib(my own), npm. Currently learning: express. Currently working on: cards game + multiplayer ",
            "npm,gulp, watch, css-clean, task, pipe, wrapper function, exports, require, jsno-package config, git. Currently learning express. Currently working on: cards game + multiplayer"

        ],
        // for ".project__iframe" || for myDOM.iframes.srcsttps://sajrus33.github.io/App-ToDo/index.html", "https://sajrus33.github.io/Card-game-prototype/", "https://sajrus33.github.io/Escape-Layout/", "https://sajrus33.github.io/Flubmaster-web/"]
        // iframesSrcs: ["https://sajrus33.github.io/Flubmaster-web/", "https://sajrus33.github.io/Escape-Layout/", "https://sajrus33.github.io/App-ToDo/index.html", "https://sajrus33.github.io/Card-game-prototype/", "https://sajrus33.github.io/Escape-Layout/", "https://sajrus33.github.io/Flubmaster-web/"]
        iframesSrcs: ["https://sajrus33.github.io/game-tower-defence/", "https://sajrus33.github.io/avangarde/", "https://sajrus33.github.io/app-todo", "https://sajrus33.github.io/game-memory-cards/", "https://sajrus33.github.io/app-maps/", "https://sajrus33.github.io/web-flubmaster/"]

    }



    const myDOM = {
        // NAV
        nav: {
            ham: document.querySelector(".ham"),
            bar1: document.querySelector(".ham__bar--first"),
            bar2: document.querySelector(".ham__bar--second"),
            bar3: document.querySelector(".ham__bar--thirt"),
            hamList: document.querySelector(".ham__list"),
            hamLinks: [...document.querySelectorAll(".ham__link")],
            links: [...document.querySelectorAll(".nav__link")]

        },
        // ADDS
        paralax: document.querySelector(".paralax"),
        arrow: document.querySelector(".arrow"),

        // HEADER
        header: document.querySelector(".header"),
        headerBtn: document.querySelector(".header__button"),

        // ABOUT SECTION
        about: document.querySelector(".main__section--about"),

        // SKILLS SECTION
        skills: document.querySelector(".main__section--skills"),

        // PROGRESS SECTION
        progress: document.querySelector(".main__section--progress"),
        progressMiddle: undefined,
        progressCanvases: [...document.querySelectorAll(".progress__canvas")],
        progressSections: [...document.querySelectorAll(".progress__technology")],
        progressDescribe: document.querySelector(".progress__describe"),

        // PROJECTS SECTION
        projects: document.querySelector(".main__section--projects"),

        // FOOTER SECTION
        footer: document.querySelector(".main__section--footer"),
        footerBtn: document.querySelector(".footer__button"),
        footerEmail: document.querySelector(".myEmail"),


        mailForm: {
            name: document.querySelector(".footer__name"),
            email: document.querySelector(".footer__email"),
            number: document.querySelector(".footer__number"),
            message: document.querySelector(".footer__message"),
            submit: document.querySelector(".footer__submit"),
        },

        // IFRAMES
        iframes: {
            srcs: mySetUp.iframesSrcs,
            iframes: [...document.querySelectorAll(".project__iframe")],
            check: [...document.querySelectorAll(".project__check")],
            code: [...document.querySelectorAll(".project__code")],
        },


        // FUNCTIONS
        createProgressCircles: function () {
            myDOM.progressCanvases.forEach((circle, i) => {
                myObjects.circles.push(new ProgresCircle(circle, mySetUp.speed[i], mySetUp.progress[i], .15, "rgba(252,198,38,1)", "white", "bold calc(2.6vw + 2.6vh) Open Sans", 1));
                console.log(circle, mySetUp.speed[i], mySetUp.progress[i], .15, "rgba(252,198,38,1)", "white", "bold calc(2.6vw + 2.6vh) Open Sans", 1);
                myObjects.circles[i].init();

            });
        },


        setUpSrcs: function () {
            myDOM.iframes.iframes.forEach((iframe, i) => {
                iframe.src = myDOM.iframes.srcs[i];
                console.log(iframe.src);

            });
        },


        scrollTo: function (target = myDOM.header, duration = 200) {
            myDOM.paralax.style.animation = "fadeOut .1s forwards";

            console.log({ target });

            const targetPosition = target.offsetTop;//top of target
            const startPosition = window.pageYOffset;//window se

            const distance = targetPosition - startPosition;
            let startTime = null;

            function ease(time, start, distance, duration) {
                time /= duration / 2;
                if (time < 1) return distance / 2 * time * time + start;
                time--;
                return -distance / 2 * (time * (time - 2) - 1) + start;
            }

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
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

        sendEmail: function () {
            //  creating new message from inputs values
            const number = myDOM.mailForm.number.value;
            const name = myDOM.mailForm.name.value;
            const message = myDOM.mailForm.message.value;
            const email = myDOM.mailForm.email.value;


            if(number && name && message &&email){
                const newMessage = {
                    replay_to: String(number),
                    from_name: String(name) +" "+ String(email),
                    to_name: mySetUp.myName,
                    message_html: String(message)
                };
                // send email with emailjs
                emailjs.send('brianwala22_gmail_com', 'template_gqc9FdOP', newMessage)
                    .then(function (response) {
                        console.log('SUCCESS!', response.status, response.text);
                    }, function (error) {
                        console.log('FAILED...', error);
                    });
                // clean inputs values
                for (let property in myDOM.mailForm) {
                    if (myDOM.mailForm.hasOwnProperty(property)) {
                        if (property !== "submit") {
                            myDOM.mailForm[property].value = "";
                        }
                    }
                }
                alert("Message Sended, Thank you :)");
            }else{
                alert(" Please fill out all formmakers");
            }
           

        },

        // MAIN FUNCTIONS INITIALIZATION
        reSize: function () {
            myDOM.progressMiddle = myDOM.progress.offsetTop + myDOM.progress.offsetHeight / 2;
        },
        listen: function () {


            //                                             EVENT LISTENER

            //            WINDOW 
            window.addEventListener("resize", myDOM.reSize, false);
            window.addEventListener("scroll", function () {
                const windowY = scrollY + innerHeight;
                const progressMiddle = myDOM.progressMiddle

                if (!mySetUp.circlesRunning && windowY >= progressMiddle) {
                    myObjects.circles.forEach(circle => {
                        circle.run();
                    });
                    mySetUp.circlesRunning = true;
                } else if (windowY < progressMiddle) {
                    mySetUp.circlesRunning = false;

                }
            }, { passive: true });

            //           HEADER BUTTON
            myDOM.headerBtn.addEventListener("click", function () {
                const scrollTime = myDOM.footer.offsetTop / 2;
                myDOM.scrollTo(myDOM.footer, scrollTime);
            });

            //            main NAV  && hamburger nav  links"on clicks"
            myDOM.nav.links.forEach((link, i) => {
                const targetName = link.classList.value.slice(21, link.classList.value.length)
                link.addEventListener("click", function () {
                    console.log({ targetName });
                    const scrollTime = myDOM[targetName].offsetTop / 2;
                    myDOM.scrollTo(myDOM[targetName], scrollTime);
                });
                myDOM.nav.hamLinks[i].addEventListener("click", function () {
                    console.log({ targetName });
                    const scrollTime = myDOM[targetName].offsetTop / 2;
                    setTimeout(() => {
                        myDOM.scrollTo(myDOM[targetName], scrollTime);
                        myDOM.nav.ham.click();
                    }, 300);
                });
            });

            //               HAMBURGER ico menu on click
            myDOM.nav.ham.addEventListener("click", function () {
                // hamburger ico change  ||| -> X
                myDOM.nav.bar1.classList.toggle("ham__bar--firstA");
                myDOM.nav.bar2.classList.toggle("ham__bar--secondA");
                myDOM.nav.bar3.classList.toggle("ham__bar--thirtA");
                // display MOBILE NAV
                myDOM.nav.hamList.classList.toggle("flex");

            });

            //           ARROW NAVIGATION on click
            myDOM.arrow.addEventListener("click", function () {
                const scrollTime = Math.abs(window.pageYOffset / 3);
                console.log({ scrollTime });
                myDOM.scrollTo(myDOM.header, scrollTime);
            });



            //            PROGRESS CIRCLE on click
            myDOM.progressSections.forEach((section, i) => {
                section.addEventListener("click", function () {
                    myDOM.progressSections.forEach((circle, index) => {
                        if (i !== index) {
                            circle.classList.toggle("displayNone");
                        }
                    });

                    myDOM.progressDescribe.classList.toggle("displayNone");
                    setTimeout(function () {
                        myDOM.progressDescribe.classList.toggle("progress__describe--runIn");

                    }, 10)

                    if (mySetUp.text[i]) {
                        myDOM.progressDescribe.innerText = mySetUp.text[i];

                    } else {
                        myDOM.progressDescribe.innerText = "Content soon..";

                    }
                    console.log(myDOM.progressDescribe.text);

                    myObjects.circles[i].run();

                });
            })





            //             IFRAMES ico menu on click
            myDOM.iframes.code.forEach(iframe => {
                iframe.addEventListener("click", function () {
                    const url = this.previousElementSibling.getAttribute("data-code");
                    console.log({ url });
                    window.open(url);
                });

            });

            //            IFRAMES ico menu on click
            myDOM.iframes.check.forEach(iframe => {
                iframe.addEventListener("click", function () {
                    const url = this.previousElementSibling.previousElementSibling.getAttribute("src");
                    console.log({ url });
                    window.open(url);
                });
            });

            myDOM.mailForm.submit.addEventListener("click", function () {
                event.preventDefault();
                myDOM.sendEmail();
            });


            //            click event for copy email button in footer 
            myDOM.footerBtn.addEventListener("click", function () {
                myDOM.footerEmail.value = mySetUp.myEmail;
                console.log(myDOM.footerEmail.value);
                myDOM.footerEmail.focus();

                myDOM.footerEmail.select();
                // event.clipboardData.setData("text/plain", newEmailAdress);
                document.execCommand("copy");
            });


        }



    };

    function init() {
        myDOM.reSize();
        emailjs.init("user_tdJP5pQdemG5AhJpq5J7O");
        myDOM.createProgressCircles();

        myDOM.listen();
        // slow !!!!!!!!, because it sets iframes src, than they loads..== slow
        myDOM.setUpSrcs();
    }
    init();


    /*
    1
    $ npm install emailjs-com --save
     */
}



