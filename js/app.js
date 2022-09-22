const header = document.querySelector("header");
function stickyNavbar() {
  //   console.log("hello");
  //   header.classList.toggle("scrolled");
  //   header.classList.toggle("scrolled", true);
  //   header.classList.toggle("scrolled", false);
  header.classList.toggle("scrolled", window.pageYOffset > 0);
  //   console.log(window.pageYOffset);
  //   console.log(window.pageYOffset > 0);
}
stickyNavbar();
window.addEventListener("scroll", stickyNavbar);

/* --------------- Reveal Animation --------------- */
let sr = ScrollReveal({
  duration: 2500,
  distance: "60px",
});

sr.reveal(".showcase-info", { delay: 600 });
sr.reveal(".showcase-image", { origin: "top", delay: 700 });

/*=======================skills progress bar animation==================================*/
const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle");
const ml_section = document.querySelector(".milestones");
const ml_counters = document.querySelectorAll(".number span");
const prt_section = document.querySelector(".portfolio");
const zoom_icons = document.querySelectorAll(".zoom_icon");
const modal_overlay = document.querySelector(".modal-overlay");
const images = document.querySelectorAll(".images img");
const prev_btn = document.querySelector(".prev-btn");
const next_btn = document.querySelector(".next-btn");

const links = document.querySelectorAll(".nav-link");

const toggle_btn = document.querySelector(".toggle-btn");

const hamburger = document.querySelector(".hamburger");

window.addEventListener("scroll", () => {
  activeLink();
  // console.log("ss");
  if (!skillsPlayed) skillsCounter();
  if (!mlPlayer) mlCounter();
});
function hasReached(el) {
  let topPosition = el.getBoundingClientRect().top;
  // console.log(topPosition);
  if (window.innerHeight >= topPosition + el.offsetHeight) {
    // console.log("s");
    return true;
  } else {
    return false;
  }
}
function updateCount(num, maxNum) {
  let currentNum = +num.innerText;

  if (currentNum < maxNum) {
    num.innerText = currentNum + 1;
    setTimeout(() => {
      updateCount(num, maxNum);
    }, 12);
  }
}

let skillsPlayed = false;

function skillsCounter() {
  if (!hasReached(first_skill)) return;

  skillsPlayed = true;
  // console.log("ss");
  // console.log(hasReached(first_skill));

  sk_counters.forEach((counter, i) => {
    let target = +counter.dataset.target;
    let strokeValue = 427 - 427 * (target / 100);
    // console.log(target);
    // console.log(strokeValue);
    progress_bars[i].style.setProperty("--target", strokeValue);

    setTimeout(() => {
      updateCount(counter, target);
    }, 400);
  });

  progress_bars.forEach(
    (p) => (p.style.animation = "progress 2s ease-in-out forwards ")
  );
}

/* --------------- Services Counter Animation --------------- */
let mlPlayer = false;

function mlCounter() {
  if (!hasReached(ml_section)) return;
  mlPlayer = true;

  ml_counters.forEach((ctr) => {
    let target = +ctr.dataset.target;
    // console.log(target);
    setTimeout(() => {
      updateCount(ctr, target);
    }, 400);
  });
}

/* --------------- Grab elements from DOM --------------- */

/* --------------- Sticky Navbar --------------- */

/* --------------- Skills Progress Bar Animation --------------- */

/* --------------- Modal Pop Up Animation Animation --------------- */

/* --------------- Portfolio Filter Animation --------------- */
let mixer = mixitup(".portfolio-gallery", {
  selectors: {
    target: ".prt-card",
  },
  animation: {
    duration: 500,
    nudge: true,
    reverseOut: true,
    effects:
      "fade scale(0.01) translateX(20%) translateZ(-100px) rotateZ(180deg) stagger(30ms)",
  },
});

/* --------------- Modal Pop Up Animation Animation --------------- */

let currentIndex = 0;

zoom_icons.forEach((icn, i) =>
  icn.addEventListener("click", () => {
    prt_section.classList.add("open");
    document.body.classList.add("stopScrolling");
    currentIndex = i;
    changeImage(currentIndex);
  })
);

modal_overlay.addEventListener("click", () => {
  prt_section.classList.remove("open");
  document.body.classList.remove("stopScrolling");
});

prev_btn.addEventListener("click", () => {
  if (currentIndex === 0) {
    currentIndex = 5;
  } else {
    currentIndex--;
  }
  // console.log(currentIndex);
  changeImage(currentIndex);
});

next_btn.addEventListener("click", () => {
  if (currentIndex === 5) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  // console.log(currentIndex);
  changeImage(currentIndex);
});

function changeImage(index) {
  images.forEach((img) => img.classList.remove("showImage"));
  // console.log(images[index]);
  images[index].classList.add("showImage");
}

// swiper

const swiper = new Swiper(".swiper", {
  loop: true,
  speed: 500,
  autoplay: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

/* --------------- Change Active Link On Scroll --------------- */
function activeLink() {
  // console.log("scroll");
  let sections = document.querySelectorAll("section[id]");
  // console.log(sections);
  // console.log(Array.from(sections));
  let passedSections = Array.from(sections)
    .map((sct, i) => {
      return {
        y: sct.getBoundingClientRect().top - header.offsetHeight,
        id: i,
      };
    })
    .filter((sct) => sct.y <= 0);
  // console.log(passedSections);

  let currSectionID = passedSections.at(-1).id;
  // console.log(currSectionID);

  links.forEach((l) => l.classList.remove("active"));
  links[currSectionID].classList.add("active");
}

activeLink();

/* --------------- Change Page Theme --------------- */

let firstTheme = localStorage.getItem("dark");
// console.log(firstTheme);
// console.log(typeof firstTheme);
// console.log(typeof +firstTheme);
// console.log(+firstTheme);

changeTheme(+firstTheme);

function changeTheme(isDark) {
  // if (!document.body.classList.contains("dark")) {
  if (isDark) {
    document.body.classList.add("dark");
    // <i class="uil uil-sun"></i>
    toggle_btn.classList.replace("uil-moon", "uil-sun");
    localStorage.setItem("dark", 1);
  } else {
    document.body.classList.remove("dark");
    toggle_btn.classList.replace("uil-sun", "uil-moon");
    localStorage.setItem("dark", 0);
  }
}
toggle_btn.addEventListener("click", () => {
  changeTheme(!document.body.classList.contains("dark"));
});

/* --------------- Open & Close Navbar Menu --------------- */

hamburger.addEventListener("click", () => {
  document.body.classList.toggle("open");
  document.body.classList.toggle("stopScrolling");
});

links.forEach((link) =>
  link.addEventListener("click", () => {
    document.body.classList.remove("open");
    document.body.classList.remove("stopScrolling");
  })
);
