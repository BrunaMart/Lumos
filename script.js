
// Importa o menu

  //fetch('/menu/menu.html')
    //.then(res => res.text())
    //.then(data => {
     // document.getElementById('menu-container').innerHTML = data;

      // Carrega o JS do menu só depois que ele foi inserido no DOM
      //const script = document.createElement('script');
      //script.src = '/menu/menu.js';
      //document.body.appendChild(script);
    //});


    document.addEventListener('click', function(e) {
      // Intercepta apenas links com a classe
      const link = e.target.closest('.page-transition-link');
      if (!link) return;

      const href = link.getAttribute('href');
      if (!href || href.startsWith('#')) return;

      e.preventDefault();

      // Adiciona a classe de animação de saída
      const currentPage = document.querySelector('.pt-page-current');
      currentPage.classList.add('pt-page-moveToTop');

      // Opcional: fade suave junto
      currentPage.classList.add('fade-helper');

      // Espera a animação terminar antes de redirecionar
      setTimeout(() => {
        window.location.href = href;
      }, 800); // mesmo tempo ou um pouco maior que a duração da animação (0.8s)
    });