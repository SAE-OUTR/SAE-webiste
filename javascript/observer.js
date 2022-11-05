const header = document.querySelector("nav");
const sectionOne = document.querySelector(".hero");

const sectionOneOptions = {
  rootMargin: "-200px 0px 0px 0px"
};

const sectionOneObserver = new IntersectionObserver(function(
  entries,
  sectionOneObserver
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      header.classList.add("nav-color");
    } else {
      header.classList.remove("nav-color");
    }
  });
},
sectionOneOptions);

sectionOneObserver.observe(sectionOne);