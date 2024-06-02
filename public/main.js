const slides = document.querySelectorAll('[id^="slide"]');
const cardWrapper = document.querySelector(".card-wrapper");

let currentSlide = 0;
let isDown = false;
let startX;
let scrollLeft;
let lastScrollTop = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.opacity = i === index ? "1" : "0";
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

setInterval(nextSlide, 6000); // Change image every 6 seconds
showSlide(currentSlide);

cardWrapper.addEventListener("mousedown", (e) => {
  isDown = true;
  cardWrapper.classList.add("active");
  startX = e.pageX - cardWrapper.offsetLeft;
  scrollLeft = cardWrapper.scrollLeft;
});

cardWrapper.addEventListener("mouseleave", () => {
  isDown = false;
  cardWrapper.classList.remove("active");
});

cardWrapper.addEventListener("mouseup", () => {
  isDown = false;
  cardWrapper.classList.remove("active");
});

cardWrapper.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - cardWrapper.offsetLeft;
  const walk = (x - startX) * 3; // Adjust the scroll speed multiplier as needed
  cardWrapper.scrollLeft = scrollLeft - walk;
});

document.addEventListener("DOMContentLoaded", () => {
  const counterNums = document.querySelectorAll(".counter-number");
  const speed = 20;

  const startCounter = (curElem) => {
    const updateNumber = () => {
      const targetNumber = parseInt(curElem.dataset.number, 10);
      let initialNum = parseInt(curElem.innerText.replace("+", ""), 10);
      const incrementNumber = Math.ceil(targetNumber / speed);

      if (initialNum < targetNumber) {
        initialNum += incrementNumber;
        if (initialNum > targetNumber) {
          initialNum = targetNumber;
        }
        curElem.innerText = `${initialNum}+`;
        setTimeout(updateNumber, 50);
      } else {
        curElem.innerText = `${targetNumber}+`;
      }
    };
    updateNumber();
  };

  const resetCounter = (curElem) => {
    curElem.innerText = "0+";
  };

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounter(entry.target);
      } else {
        resetCounter(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);

  counterNums.forEach((counterNum) => {
    observer.observe(counterNum);
  });
});

function scrollToFooter() {
  document.getElementById("footer").scrollIntoView({ behavior: "smooth" });
}

document.addEventListener("DOMContentLoaded", function () {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target;
        const animationClasses = element
          .getAttribute("data-animation")
          .split(" ");
        animationClasses.forEach((animationClass) => {
          element.classList.add("animate__animated", animationClass);
        });
        observer.unobserve(element);
      }
    });
  }, options);

  document.querySelectorAll("[data-animation]").forEach((element) => {
    observer.observe(element);
  });
});

function sendWhatsAppMessage() {
  // Get form data
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var phone = document.getElementById("phone").value;
  var content = document.getElementById("content").value;

  if (!name && !email && !phone && !content) {
    alert("Please fill in at least one field.");
    return;
  }

  var message =
    "Name: " +
    encodeURIComponent(name) +
    "%0aPhone: " +
    encodeURIComponent(phone) +
    "%0aEmail: " +
    encodeURIComponent(email) +
    "%0aContent: " +
    encodeURIComponent(content);

  // Check if the user is on a mobile device
  var isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  var link;
  if (isMobile) {
    link = `whatsapp://send?phone=918076038808&text=${message}`;
    window.open(link, "_self");
  } else {
    link = `https://wa.me/918076038808?text=${message}`;
    window.open(link, "_blank").focus();
  }
}
