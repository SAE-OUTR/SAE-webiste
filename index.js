import { achievements } from "./achievements.js";
import { experiences } from "./experiences.js";
import { courses } from "./courses.js";

var keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent =
  "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

function disableScroll() {
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener("touchmove", preventDefault, wheelOpt);
  window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
}

$(document).ready(function () {
  $("#toggle").click(function () {
    var elem = $("#toggle").text();
    if (elem == "MEET OUR FOUNDERS") {
      //Stuff to do when btn is in the read more state
      $("#toggle").text("SHOW LESS");
      $("#text").slideDown();
    } else {
      //Stuff to do when btn is in the read less state
      $("#toggle").text("MEET OUR FOUNDERS");
      $("#text").slideUp();
    }
  });

  var achievements_main = $(".achieve-main");
  achievements.forEach((elem) => {
    achievements_main.append(`
      <div class="achieve-card" data-aos="fade-up" data-aos-delay="300">
        <div class="a-card-body">
          <div class="a-card-top">
            <h4>#${elem.id}</h4>
            <h5>${elem.title}</h5>
          </div>
          <p>${elem.details}</p>
          <h3>${elem.date}</h3>
        </div>
      </div>`);
  });

  var course_main = $(".course-main ");
  courses.forEach((elem) => {
    course_main.append(`
    <div class="blog-card course-open" data-value="${elem.id}">
      <img src= ${elem.img} alt="" />
    </div>`);
  });

  var exp_main = $(".exp-main");
  experiences.forEach((elem) => {
    exp_main.append(`
      <li class="">
        <div class="content exp-btn btn-open" style="background-image: url('assets/seniors/${elem.name}.jpg');" data-value="${elem.name}">
        </div>
        <p>${elem.name}</p>
      </li>`);
  });

  const modal = document.querySelector(".exp-modal");
  const overlay = document.querySelector(".exp-overlay");
  const closeModalBtn = document.querySelector(".btn-close");

  const course_modal = document.querySelector(".courses-modal");
  const closeBtn = document.querySelector(".course-close");

  // close modal function
  const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    enableScroll();
  };

  const closeCourseModal = function () {
    course_modal.classList.add("hidden");
    overlay.classList.add("hidden");
    enableScroll();
  };

  // close the modal when the close button and overlay is clicked
  closeBtn.addEventListener("click", closeCourseModal);

  closeModalBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  // close modal when the Esc key is pressed
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !course_modal.classList.contains("hidden")) {
      closeCourseModal();
    }
  });

  // open modal function
  const openModal = function () {
    var person = this.getAttribute("data-value");
    var details = experiences.filter((e) => e.name === person)[0].body;
    $(".modal-name").text(person);
    $(".modal-img").attr("src", `assets/seniors/${person}.jpg`);
    $(".modal-p").text(details);
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    // disableScroll();
  };

  const openCourseModal = function () {
    var course = this.getAttribute("data-value");
    var myCourse = courses.filter((e) => e.id == course)[0];
    var title = myCourse.title;
    var author = myCourse.author;
    var img = myCourse.img;
    var details = myCourse.details;

    $(".course-modal-name").text(title);
    $(".course-modal-img").attr("src", img);
    $(".course-modal-p").text(details);
    course_modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    disableScroll();
  };
 
  $(".btn-open").each(function () {
    $(this).bind("click", openModal);
  });

  $(".course-open").each(function () {
    $(this).bind("click", openCourseModal);
  });

  var gallery_img = $(".gallery");
  var hidden_gallery_img = $(".hiddenGallery");
  $.ajax({
    method: "GET",
    url: `https://www.googleapis.com/drive/v3/files?q='1QcJp-yfy8m8KdY_7wTeJyAReTvtQ7-jZ' in parents&key=AIzaSyCC-4JThLZ2lqUXPOvQuTLnL4XfEOLTpA8`,
    success: function (data) {
      var imgV = 0;
      data.files.forEach((elem) => {
        if (imgV < 6) {
          gallery_img.append(
            `<div class="img-c"><div class="img-w"><img src="https://lh3.googleusercontent.com/d/${elem.id}" alt="" class="gallery-img" /></div></div>`
          );
        } else {
          hidden_gallery_img.append(
            `<div class="img-c"><div class="img-w"><img src="https://lh3.googleusercontent.com/d/${elem.id}" alt="" class="gallery-img" /></div></div>`
          );
        }
        imgV++;
      });
    },
  });

  $(".hiddenGallery").slideUp();
  $("#galleryBtn").click(function () {
    var elem = $("#galleryBtn").text();
    if (elem == "SHOW MORE") {
      //Stuff to do when btn is in the read more state
      $("#galleryBtn").text("SHOW LESS");
      $(".hiddenGallery").slideDown();
    } else {
      //Stuff to do when btn is in the read less state
      $("#galleryBtn").text("SHOW MORE");
      $(".hiddenGallery").slideUp();
    }
  });
});

// var numberElements = 4;
var numberViewed = 11; // change this based on of experiences
var currentPosition = 1;

function countLi() {
  return $(".experiences ul li").length;
}

function slideRight() {
  if (countLi() > numberViewed)
    if (currentPosition == countLi() - (numberViewed - 1)) {
      $(".experiences ul li")
        .css("visibility", "hidden")
        .css("transition", "none");
      setSliderPosition(numberViewed + 1, countLi());
      $(".experiences ul li")
        .css("transition", "left .75s ease-out")
        .css("visibility", "visible");
      setSliderPosition(currentPosition + 1, countLi());
      return;
    } else return setSliderPosition(currentPosition + 1, countLi());
}

function slideLeft() {
  if (countLi() > numberViewed)
    if (currentPosition == 1) {
      $(".experiences ul li").css("transition", "none");
      setSliderPosition(countLi() - (2 * numberViewed + 1), countLi()).css(
        "transition",
        "left .75s ease-out"
      );
      return setSliderPosition(currentPosition - 1, countLi());
    } else return setSliderPosition(currentPosition - 1, countLi());
}

function setSliderPosition(n1, count) {
  if (n1 < 1) {
    setSliderPosition(count - (numberViewed - 1) + n1, count);
    return;
  }
  n1 = ((n1 - 1) % (count - (numberViewed - 1))) + 1;
  currentPosition = n1;
  return $(".experiences ul li").css("left", function () {
    return -(n1 - 1) * $(".experiences ul li").width();
  });
}

function initWidths() {
  $(".experiences ul li").css("width", 100 / countLi() + "%");
  $(".experiences ul").css(
    "width",
    100 + (countLi() - numberViewed) * (100 / numberViewed) + "%"
  );
}

function initClones() {
  if (countLi() >= numberViewed) {
    for (var i = 1; i < numberViewed + 1; i++) {
      $(".experiences ul li:nth-child(" + i + ")")
        .clone(true, true)
        .insertAfter(".experiences ul li:last-child");
    }
    var c = countLi();
    for (i = c - numberViewed + 1; i <= c; i++) {
      $(".experiences ul li:nth-last-child(" + i + ")")
        .clone(true, true)
        .insertBefore(".experiences ul li:first-child");
    }
  }
}

function initSlider() {
  initClones();
  initResponsive();
  initWidths();
}

function initPosition() {
  setSliderPosition(currentPosition, countLi());
}

function initResponsive() {
  if ($(window).width() > 1000) {
    if (numberViewed != 4) {
      numberViewed = 4;
      initWidths();
    }
  } else if ($(window).width() > 800) {
    if (numberViewed != 3) {
      numberViewed = 3;
      initWidths();
    }
  } else if ($(window).width() > 600) {
    if (numberViewed != 2) {
      numberViewed = 2;
      initWidths();
    }
  } else if (numberViewed != 1) {
    numberViewed = 1;
    initWidths();
  }
  initPosition();
}
$(document).ready(function () {
  initSlider();
  $(window).resize(initResponsive);
  $(".experiences .slide-left").click(slideLeft);
  $(".experiences .slide-right").click(slideRight);
});
