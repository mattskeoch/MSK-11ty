let navToggle = document.querySelector(".nav__toggle");
let navWrapper = document.querySelector(".nav__list");

navToggle.addEventListener("click", function () {
  if (navWrapper.classList.contains("active")) {
    this.setAttribute("aria-expanded", "false");
    this.setAttribute("aria-label", "menu");
    navWrapper.classList.remove("active");
  } else {
    navWrapper.classList.add("active");
    this.setAttribute("aria-label", "close menu");
    this.setAttribute("aria-expanded", "true");
  }
});

let toggle = document.querySelector('.nav__link--toggle')

if (localStorage.getItem('dark-mode')){
  document.body.classList.add('dark-mode'); 
}

toggle.addEventListener('click', function () {
  if (document.body.classList.contains('dark-mode')) {   
    document.body.classList.remove('dark-mode');
    localStorage.removeItem('dark-mode');
  } else {
    document.body.classList.add('dark-mode');
    localStorage.setItem('dark-mode', 'true')
  }
});