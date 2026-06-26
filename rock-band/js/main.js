const burger = document.querySelector('.header__burger');
  const nav = document.querySelector('.header__nav');

  burger.addEventListener('click', () => {
    burger.classList.toggle('header__burger--active');
    nav.classList.toggle('header__nav--open');
  });

  document.addEventListener('DOMContentLoaded', () => {
    // 1. Находим все ссылки в меню и все секции, у которых есть ID
    const menuLinks = document.querySelectorAll('.header__link');
    const sections = document.querySelectorAll('section[id]');
  
    // 2. Настраиваем параметры для Observer
    const options = {
      root: null, // следим относительно области видимости браузера
      rootMargin: '-40% 0px -50% 0px', // триггер срабатывает, когда блок занимает центр экрана
      threshold: 0 // срабатывает сразу при пересечении границы
    };
  
    // 3. Создаем сам Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Если секция зашла в активную зону экрана
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          
          // Перебираем все ссылки и вешаем класс .active только на нужную
          menuLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, options);
  
    // 4. Запускаем слежку за каждой секцией
    sections.forEach(section => {
      observer.observe(section);
    });
  });