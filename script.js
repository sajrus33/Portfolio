import { ProgresCircle } from "/Portfolio/ProgressCircle.js";
import { myAlert } from "/Portfolio/myAlert.js";

("use strict");
window.addEventListener("DOMContentLoaded", app);
function app() {
  let myObjects = {
    //just object containers
    circles: [],
    circlesRunning: false
  };

  const mySetUp = {
    //Here you can set up page app, circles parametrs.. for now.
    myName: "Brian",
    myEmail: "brianwala22@gmail.com",
    // progress
    progress: [0.70, 0.75, 0.3, 0.6, 0.15],
    speed: [70 * 1, 75 * 1, 30 * 1, 60 * 1, 15 * 1],
    text: [
      'HTML5 STANDARDS, BEM, SEMANTIC TAGS, SEO, tinypng, PWA, og protocol, UX basics, flex, grid, Books I have read: "Advanced Game Design with HTML5 and JavaScript". I am currently studing on Python + TensorFlow :D.',
      'Vanilla, JSX, Typescript, OOP, DRY, all Data Types and all methods/properties, Algorithms(most knowledge based on C++) and algorithmic computational complexity (O, Ω, Θ). Data modeling. navigator, history, DOM + manipulation, prototype, settter/getter, canvas context drawing(games and effects), localStorage, application filesystem patterns.  ES8 and ES6(good knowledge) Promises, try catch block, emailjs, lodash, axios, reCAPTCHA, leaflet.js, google analytics and much more :). Books I have read: "Advanced Game Design with HTML5 and JavaScript". Currently learning: Python + TensorFlow :D.',
      'Node 12.*, my own email-checker, express, body-parser, dotenv, helmet, @hapi/joi, aws-sdk, bcrypt, cookie-parser, cors, express-joi-validation, jsonwebtoken, knex, multer, multer-s3, pg, twilio, reCaptcha, nodemailer, mailjet.',
      'React 16.7 and 16.8 (Hooks), MUI, react-redux, Next.js, next-routes, redux-form, react-material-ui-form-validator, react-draggable, react-image-crop, react-map-gl, react-notification-system, react-google-recaptcha, prop-types.',
      'My first programming language :). All kind of data types (beside vector) and methods/properties, OOP, pointers, class, public, private, protected, inherit, polymorphism, algorithms(tree sort ,bubble sort, quick sort, binary search, merge sort), libs: iostream, string, cstdlib > windows.h, conio.h, ctime, creating my own headers, SDL2. C++ builder. I created: 1) turn-based strategy, text game. 2) coverter app for units of measurement. Much more small projects for learning. Books I have read: "The C++ Programming Language, 4th Edition". In the future i would like to get back into C++ and V8.'
    ]
  };

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
      submit: document.querySelector(".footer__submit")
    },


    // IFRAMES
    iframes: {
      imgs: [
        "img/game-tower.png",
        "img/web-avangarde.png",
        "img/app-todo.png",
        "img/game-memory.png",
        "img/app-maps.png",
        "img/web-flubmaster.png"
      ],
      // srcs: mySetUp.iframesSrcs,
      iframes: [...document.querySelectorAll(".project__iframe")]
      // check: [...document.querySelectorAll(".project__check")],
      // code: [...document.querySelectorAll(".project__code")]
    },

    // FUNCTIONS
    createProgressCircles: function () {
      myDOM.progressCanvases.forEach((circle, i) => {
        myObjects.circles.push(
          new ProgresCircle(
            circle,
            mySetUp.speed[i],
            mySetUp.progress[i],
            0.15,
            "rgba(252,198,38,1)",
            "white",
            "bold calc(2.6vw + 2.6vh) Open Sans",
            1
          )
        );
        myObjects.circles[i].init();
      });
    },

    scrollTo: function (target = myDOM.header, duration = 200) {
      myDOM.paralax.style.animation = "fadeOut .1s forwards";

      const targetPosition = target.offsetTop; //top of target
      const startPosition = window.pageYOffset; //window se

      const distance = targetPosition - startPosition;
      let startTime = null;

      function ease(time, start, distance, duration) {
        time /= duration / 2;
        if (time < 1) return (distance / 2) * time * time + start;
        time--;
        return (-distance / 2) * (time * (time - 2) - 1) + start;
      }

      function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const newPosition = ease(
          timeElapsed,
          startPosition,
          distance,
          duration
        );
        window.scrollTo(0, newPosition);
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        } else {
          myDOM.paralax.style.animation = "fadeIn .5s forwards";
        }
      }
      requestAnimationFrame(animation);
    },

    sendEmail: () => {
      const number = myDOM.mailForm.number.value;
      const name = myDOM.mailForm.name.value;
      const email = myDOM.mailForm.email.value;
      const message = myDOM.mailForm.message.value;

      if (number && email && message && name) {

        //  creating new message from inputs values
        const newMessage = {
          replay_to: String(number),
          from_name: String(name) + " " + String(email),
          to_name: mySetUp.myName,
          message_html: String(message)
        };
        // send email with emailjs
        emailjs
          .send("brianwala22_gmail_com", "template_gqc9FdOP", newMessage)
          .then(
            response => {
              // console.log(response)
              myAlert("Message has been sent");
              for (let property in myDOM.mailForm) {
                if (myDOM.mailForm.hasOwnProperty(property)) {
                  if (property !== "submit") {
                    myDOM.mailForm[property].value = "";
                  }
                }

              }

            },

            error => {
              let alertString;
              if (error.status == 400) {
                alertString = "Verification by reCAPTCHA is needed !";
              } else {
                alertString = "We are sorry, automatic mailbox is full !";
              }
              myAlert(alertString);
            }
          );
        // clean inputs values
      } else myAlert("Please fill out all form positions");
      grecaptcha.reset();

    },

    // MAIN FUNCTIONS INITIALIZATION
    reSize: () => {
      myDOM.progressMiddle =
        myDOM.progress.offsetTop + myDOM.progress.offsetHeight / 2;
    },
    listen: () => {
      //                                             EVENT LISTENER

      //            WINDOW
      window.addEventListener("resize", myDOM.reSize, false);
      window.addEventListener(
        "scroll",
        () => {
          const windowY = scrollY + innerHeight;
          const progressMiddle = myDOM.progressMiddle;

          if (!mySetUp.circlesRunning && windowY >= progressMiddle) {
            myObjects.circles.forEach(circle => {
              circle.run();
            });
            mySetUp.circlesRunning = true;
          } else if (windowY < progressMiddle) {
            mySetUp.circlesRunning = false;
          }
        },
        { passive: true }
      );

      //           HEADER BUTTON
      myDOM.headerBtn.addEventListener("click", () => {
        const scrollTime = myDOM.footer.offsetTop / 2;
        myDOM.scrollTo(myDOM.footer, scrollTime);
        console.log(myDOM.footer.offsetTop);
        // window.scrollTo({ top: myDOM.footer.offsetTop, behavior: "smooth" })
      });

      //            main NAV  && hamburger nav  links"on clicks"
      myDOM.nav.links.forEach((link, i) => {
        const targetName = link.classList.value.slice(
          21,
          link.classList.value.length
        );
        link.addEventListener("click", () => {
          const scrollTime = myDOM[targetName].offsetTop / 2;
          myDOM.scrollTo(myDOM[targetName], scrollTime);
        });
        myDOM.nav.hamLinks[i].addEventListener("click", () => {
          const scrollTime = myDOM[targetName].offsetTop / 2;
          setTimeout(() => {
            myDOM.scrollTo(myDOM[targetName], scrollTime);
            myDOM.nav.ham.click();
          }, 300);
        });
      });

      //               HAMBURGER ico menu on click
      myDOM.nav.ham.addEventListener("click", () => {
        // hamburger ico change  ||| -> X
        myDOM.nav.bar1.classList.toggle("ham__bar--firstA");
        myDOM.nav.bar2.classList.toggle("ham__bar--secondA");
        myDOM.nav.bar3.classList.toggle("ham__bar--thirtA");
        // display MOBILE NAV
        myDOM.nav.hamList.classList.toggle("flex");
      });

      //           ARROW NAVIGATION on click
      myDOM.arrow.addEventListener("click", () => {
        const scrollTime = Math.abs(window.pageYOffset / 3);
        myDOM.scrollTo(myDOM.header, scrollTime);
      });

      //            PROGRESS CIRCLE on click
      myDOM.progressSections.forEach((section, i) => {
        section.addEventListener("click", () => {
          myDOM.progressSections.forEach((circle, index) => {
            if (i !== index) {
              circle.classList.toggle("displayNone");
            }
          });

          myDOM.progressDescribe.classList.toggle("displayNone");
          setTimeout(() => {
            myDOM.progressDescribe.classList.toggle(
              "progress__describe--runIn"
            );
          }, 10);

          if (mySetUp.text[i]) {
            myDOM.progressDescribe.innerText = "";

            const newH2 = document.createElement("h2");
            newH2.innerText = "My knowledge";

            const newP = document.createElement("p");
            newP.innerText = mySetUp.text[i];

            myDOM.progressDescribe.appendChild(newH2);
            myDOM.progressDescribe.appendChild(newP);
          } else {
            myDOM.progressDescribe.innerText = "Content soon..";
          }

          myObjects.circles[i].run();
        });
      });

      myDOM.iframes.iframes.forEach((iframe, i) => {
        iframe.style.backgroundImage = "url('" + myDOM.iframes.imgs[i] + "')";
      });

      myDOM.mailForm.submit.addEventListener("click", function () {
        event.preventDefault();
        myDOM.sendEmail();
      });

      //            click event for copy email button in footer
      myDOM.footerBtn.addEventListener("click", function () {
        myDOM.footerEmail.value = mySetUp.myEmail;
        myDOM.footerEmail.focus();

        myDOM.footerEmail.select();
        // event.clipboardData.setData("text/plain", newEmailAdress);
        document.execCommand("copy");
      });
    }
  };

  const init = () => {
    myDOM.reSize();
    emailjs.init("user_tdJP5pQdemG5AhJpq5J7O");
    myDOM.createProgressCircles();

    myDOM.listen();
  };
  init();

  /*
  1
  $ npm install emailjs-com --save
   */
}
