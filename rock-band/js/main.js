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

  document.addEventListener('DOMContentLoaded', () => {
    // Находим кнопку покупки билета (с БЭМ-модификатором)
    const ticketBtn = document.querySelector('.hero__btn_theme_ticket'); 
    // Находим блок нашего уведомления
    const rockToast = document.getElementById('rock-toast');        

    // Проверяем, что оба элемента есть на странице, чтобы не было ошибок в консоли
    if (ticketBtn && rockToast) {
        ticketBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Отменяем стандартное поведение (если это была ссылка-якорь)

            // 1. Включаем эффект вспышки на кнопке
            ticketBtn.classList.add('hero__btn_flash');
            
            // Удаляем класс вспышки через 400мс (когда анимация в CSS закончится)
            setTimeout(() => {
                ticketBtn.classList.remove('hero__btn_flash');
            }, 400);

            // 2. Добавляем БЭМ-модификатор состояния, который делает блок видимым
            rockToast.classList.add('rock-toast_show');

            // 3. Через 4 секунды (4000 мс) плавно скрываем уведомление, убирая модификатор
            setTimeout(() => {
                rockToast.classList.remove('rock-toast_show');
            }, 4000);
        });
    }
});

document.addEventListener('DOMContentLoaded', () => {
  // 1. Ищем ВСЕ кнопки с классом .concerts__btn (получаем коллекцию элементов)
  const orderButtons = document.querySelectorAll('.concerts__btn'); 
  const modal = document.getElementById('modal-order');              
  const closeBtn = document.querySelector('.modal-order__close');    
  const overlay = document.querySelector('.modal-order__overlay');   

  const openModal = (e) => {
      if (e) e.preventDefault();
      modal.classList.add('modal-order_open');
      document.body.classList.add('body_modal-open');
  };

  const closeModal = () => {
      modal.classList.remove('modal-order_open');
      document.body.classList.remove('body_modal-open');
  };

  // 2. Проверяем, нашлись ли кнопки и есть ли модалка
  if (orderButtons.length > 0 && modal) {
      // Перебираем каждую кнопку в цикле и вешаем событие клика
      orderButtons.forEach((btn) => {
          btn.addEventListener('click', openModal);
      });
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('modal-order_open')) {
          closeModal();
      }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // 1. Кнопки афиши и модалка ЗАКАЗА (новая форма)
  const orderButtons = document.querySelectorAll('.concerts__btn'); 
  const modalOrder = document.getElementById('modal-order');              
  const closeOrderBtn = document.querySelector('.modal-order__close');    
  const overlayOrder = document.querySelector('.modal-order__overlay');   
  const orderForm = document.querySelector('.modal-order__form');

  // 2. Твоя СТАРОЙ форма контактов на странице
  const contactsForm = document.querySelector('.contacts__form');

  // 3. Центральное окно УСПЕХА
  const modalSuccess = document.getElementById('modal-success');
  const closeSuccessBtn = document.querySelector('.modal-success__close');
  const overlaySuccess = document.querySelector('.modal-success__overlay');

  // Функции открытия/закрытия окон
  const openOrderModal = (e) => {
      if (e) e.preventDefault();
      if (modalOrder) modalOrder.classList.add('modal-order_open');
      document.body.classList.add('body_modal-open');
  };

  const closeOrderModal = () => {
      if (modalOrder) modalOrder.classList.remove('modal-order_open');
      document.body.classList.remove('body_modal-open');
  };

  const openSuccessModal = () => {
      if (modalSuccess) modalSuccess.classList.add('modal-success_open');
      document.body.classList.add('body_modal-open');
  };

  const closeSuccessModal = () => {
      if (modalSuccess) modalSuccess.classList.remove('modal-success_open');
      document.body.classList.remove('body_modal-open');
  };

  // Слушатели для новой формы заказа
  if (orderButtons.length > 0 && modalOrder) {
      orderButtons.forEach(btn => btn.addEventListener('click', openOrderModal));
  }
  if (closeOrderBtn) closeOrderBtn.addEventListener('click', closeOrderModal);
  if (overlayOrder) overlayOrder.addEventListener('click', closeOrderModal);

  // Слушатели для окна успеха
  if (closeSuccessBtn) closeSuccessBtn.addEventListener('click', closeSuccessModal);
  if (overlaySuccess) overlaySuccess.addEventListener('click', closeSuccessModal);


  // --- ОЖИВЛЯЕМ ТВОЮ СТАРУЮ ФОРМУ КОНТАКТОВ ---
  if (contactsForm) {
      contactsForm.addEventListener('submit', (e) => {
          e.preventDefault(); // Железный блок от перезагрузки страницы и ошибки 405

          // Находим кнопку внутри формы контактов
          const submitBtn = contactsForm.querySelector('.contacts__btn');
          const originalBtnText = submitBtn.textContent;

          // Включаем статус загрузки
          submitBtn.textContent = "Надсилання...";
          submitBtn.disabled = true;

          // Собираем данные напрямую по существующим ID из твоего HTML
          const contactsData = {
              formSource: 'Contacts Form (Page)',
              name: document.getElementById('form-name')?.value || '',
              email: document.getElementById('form-email')?.value || '',
              message: document.getElementById('form-message')?.value || '',
              timestamp: new Date().toISOString()
          };

          // Имитируем ответ сервера через 800мс
          setTimeout(() => {
              // Выводим данные в консоль для проверяющего тимлида
              console.log('%c Contacts Form Submitted Successfully!', 'background: #222; color: #00ffcc; font-size: 14px; padding: 4px; font-weight: bold;');
              console.dir(contactsData);

              // Эффектно открываем центральное окно успеха!
              openSuccessModal();

              // Очищаем поля формы и возвращаем кнопку в норму
              contactsForm.reset();
              submitBtn.textContent = originalBtnText;
              submitBtn.disabled = false;
          }, 800);
      });
  }


  // --- ОБРАБОТКА НОВОЙ ФОРМЫ ЗАКАЗА ---
  if (orderForm) {
      orderForm.addEventListener('submit', (e) => {
          e.preventDefault();

          const submitBtn = orderForm.querySelector('.modal-order__submit-btn');
          const originalBtnText = submitBtn.textContent;

          submitBtn.textContent = "Надсилання...";
          submitBtn.disabled = true;

          setTimeout(() => {
              console.log('%c Order Form Submitted Successfully!', 'background: #222; color: #bada55; font-size: 14px; padding: 4px; font-weight: bold;');
              
              closeOrderModal();
              openSuccessModal();

              orderForm.reset();
              submitBtn.textContent = originalBtnText;
              submitBtn.disabled = false;
          }, 800);
      });
  }

  // Закрытие по кнопке Esc
  document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
          closeOrderModal();
          closeSuccessModal();
      }
  });
});

// --- ПЛАВНЫЙ СКРОЛЛ ИЗ HERO К КОНТАКТАМ ---
const heroBtn = document.querySelector('.hero__btn'); // Класс твоей кнопки в Hero
const contactsSection = document.getElementById('contacts'); // ID секции контактов

if (heroBtn && contactsSection) {
    heroBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Отменяем стандартный резкий переход по ссылке, если кнопка была ссылкой

        // Плавно скроллим к секции
        contactsSection.scrollIntoView({
            behavior: 'smooth', // Плавная анимация
            block: 'start'      // Выравнивание по верхнему краю экрана
        });
    });
}