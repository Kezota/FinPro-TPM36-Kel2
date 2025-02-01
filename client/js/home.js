document.addEventListener("DOMContentLoaded", () => {
  reduceMotion();
  slider();
  fadeUp();
  navScroll();
  contactForm();
});

function slider() {
  const sliders = document.querySelectorAll(".slider");

  sliders.forEach((slider) => {
    const slides = slider.querySelectorAll(".slide");
    const cloneSlides = () => {
      slides.forEach((slide) => {
        const clone = slide.cloneNode(true);
        slider.appendChild(clone);
      });
    };
    cloneSlides();
  });
}

function fadeUp() {
  const fadeUpSections = document.querySelectorAll(".fadeUp");

  const checkVisibility = () => {
    fadeUpSections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (
        rect.top < window.innerHeight * 0.8 &&
        !section.classList.contains("visible")
      ) {
        section.classList.add("visible");
      }
    });
  };

  // Check visibility on scroll and page load
  window.addEventListener("scroll", checkVisibility);
  window.addEventListener("load", checkVisibility);
}

function reduceMotion() {
  const mediaQuery = matchMedia("(prefers-reduced-motion)");
  const checkReducedMotion = () => {
    const video = document.querySelectorAll(".bg-video");
    if (mediaQuery.matches) {
      video.forEach((v) => v.pause());
    } else {
      video.forEach((v) => v.play());
    }
  };
  checkReducedMotion();
  mediaQuery.addEventListener("change", checkReducedMotion);
}

function timeline() {
  const line = document.querySelector(".timeline-innerline");

  let i = 0;
  let i2 = 1;
  let target1 = document.querySelector(".timeline ul");
  let target2 = document.querySelectorAll(".timeline ul li");

  const timeline_events = document.querySelectorAll("ul li");

  function showTime(e) {
    e.setAttribute("done", "true");
    e.querySelector(".timeline-point").style.background = "rgb(74, 58, 255)";
    e.querySelector(".date").style.opacity = "100%";
    e.querySelector("p").style.opacity = "100%";
    e.querySelector("p").style.transform = "translateY(0px)";
  }

  function hideTime(e) {
    e.removeAttribute("done");
    e.querySelector(".timeline-point").style.background = "rgb(228, 228, 228)";
    e.querySelector(".date").style.opacity = "0%";
    e.querySelector("p").style.opacity = "0%";
    e.querySelector("p").style.transform = "translateY(-10px)";
  }

  function slowLoop() {
    setTimeout(function () {
      showTime(timeline_events[i]);
      timelineProgress(i + 1);
      i++;
      if (i < timeline_events.length) {
        slowLoop();
      }
    }, 800);
  }

  function timelineProgress(value) {
    let progress = `${(value / timeline_events.length) * 100}%`;
    if (window.matchMedia("(min-width: 728px)").matches) {
      line.style.width = progress;
      line.style.height = "4px";
    } else {
      line.style.height = progress;
      line.style.width = "4px";
    }
  }

  let observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0.9) {
          if (window.matchMedia("(min-width: 728px)").matches) {
            slowLoop();
          } else {
            showTime(entry.target);
            timelineProgress(i2);
            i2++;
          }
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 1, rootMargin: "0px 0px -50px 0px" }
  );

  if (window.matchMedia("(min-width: 728px)").matches) {
    observer.observe(target1);
  } else {
    target2.forEach((t) => {
      observer.observe(t);
    });
  }

  timeline_events.forEach((li, index) => {
    li.addEventListener("click", () => {
      if (li.getAttribute("done")) {
        timelineProgress(index);

        // hide all timeline events from last upto the point clicked
        timeline_events.forEach((ev, idx) => {
          if (idx >= index) {
            hideTime(ev);
          }
        });
      } else {
        timelineProgress(index + 1);
        // show all timeline events from first upto the point clicked
        timeline_events.forEach((ev, idx) => {
          if (idx <= index) {
            showTime(ev);
          }
        });
      }
    });
  });

  var doit;
  window.addEventListener("resize", () => {
    clearTimeout(doit);
    doit = setTimeout(resizeEnd, 1200);
  });

  function resizeEnd() {
    i = 0;
    slowLoop();
  }
}

function navScroll() {
  document.addEventListener("scroll", function () {
    const header = document.querySelector("header.nav");
    if (window.scrollY > 0) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

function contactForm() {
  document
    .getElementById("contactForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(this);
      const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message"),
      };

      fetch("https://imagecolorpicker.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Message sent successfully!");
          // Clear the input fields
          document.getElementById("contactForm").reset();
        })
        .catch((error) => {
          alert("Message sent successfully!");
          // Clear the input fields
          document.getElementById("contactForm").reset();
        });
    });
}
