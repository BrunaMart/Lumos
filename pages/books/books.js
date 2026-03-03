function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');

  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const revealPoint = 150;

    if (elementTop < windowHeight - revealPoint) {
      reveals[i].classList.add('active');
    } else {
      reveals[i].classList.remove('active');
    }
  }
}






window.addEventListener('scroll', revealOnScroll);


//SCROLL ANIMATION
ScrollReveal({
  reset: true,
  distance: '60px',
  duration: 2500,
  delay: 400,
});

ScrollReveal().reveal('',  { delay: 500, origin: 'left' });

//ScrollReveal().reveal('.sec_1, .img, .info', { delay: 600, origin: 'bottom' });
//ScrollReveal().reveal('.text-box', { delay: 700, origin: 'rigth' });
//ScrollReveal().reveal('media-icon i', { delay: 500, origin: 'bottom', interval: 200 });
//ScrollReveal().reveal('.sec_2, .img .sec_3, .img', { delay: 500, origin: 'top' });
//ScrollReveal().reveal('.media-info li', { delay: 500, origin: 'left', interval: 200 });//menu


