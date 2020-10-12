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