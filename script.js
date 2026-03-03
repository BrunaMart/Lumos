// Preloader
window.addEventListener('load', () => {
  const letters = document.querySelectorAll('.letter');
  const preloader = document.getElementById('preloader');
  const content = document.getElementById('content');

  // Após entrada, iniciar saída das letras
  setTimeout(() => {
    letters.forEach((letter, index) => {
      setTimeout(() => {
        letter.classList.add('fade-out');
      }, index * 100);
    });
  }, 2000);

  // Após saída completa, esconder preloader e mostrar conteúdo
  setTimeout(() => {
    preloader.classList.add('hidden');
    content.classList.add('visible');
  }, 3000);
});


// Importa o menu

  fetch('/menu/menu.html')
    .then(res => res.text())
    .then(data => {
      document.getElementById('menu-container').innerHTML = data;

      // Carrega o JS do menu só depois que ele foi inserido no DOM
      const script = document.createElement('script');
      script.src = '/menu/menu.js';
      document.body.appendChild(script);
    });
