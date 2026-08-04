// ==========================================
// 1. МОБИЛЬНОЕ МЕНЮ (Global Navigation)
// ==========================================
(function () {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return; // Безопасность: если элементов нет на странице, скрипт тихо завершится

  const iconBurger = btn.querySelector('[data-icon="burger"]');
  const iconClose = btn.querySelector('[data-icon="close"]');

  const setIcons = (isOpen) => {
    iconBurger.classList.toggle('hidden', isOpen);
    iconClose.classList.toggle('hidden', !isOpen);
  };

  const close = () => {
    btn.setAttribute('aria-expanded', 'false');
    setIcons(false);
    menu.classList.remove('is-open');
    document.body.classList.remove('overflow-hidden');
    void document.body.offsetHeight;

    setTimeout(() => {
      menu.classList.add('hidden');
    }, 350);
  };

  const open = () => {
    menu.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    btn.setAttribute('aria-expanded', 'true');
    setIcons(true);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        menu.classList.add('is-open');
      });
    });
  };

  btn.addEventListener('click', () => {
    menu.classList.contains('hidden') ? open() : close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.classList.contains('hidden')) close();
  });

  const mq = window.matchMedia('(min-width: 1024px)');
  mq.addEventListener?.('change', (e) => {
    if (e.matches && !menu.classList.contains('hidden')) close();
  });
})();


// ==========================================
// 2. ПРОВЕРКА ВОЗРАСТА И КУКИ (Age Gate & Cookies)
// ==========================================
(function () {
  const ageVerified = localStorage.getItem('age_verified');

  document.addEventListener('DOMContentLoaded', () => {
    if (ageVerified !== 'true') {
      showAgeGate();
    } else {
      checkCookieConsent();
    }
  });

  function showAgeGate() {
    document.body.classList.add('overflow-hidden');

    const overlay = document.createElement('div');
    overlay.id = 'age-gate-overlay';
    overlay.className = 'fixed inset-0 z-[9999] bg-wine flex flex-col justify-center items-center px-6 text-center select-none';
    
    overlay.innerHTML = `
      <div class="absolute inset-0 z-0 pointer-events-none opacity-10 mix-blend-multiply bg-repeat" style="background-image: url('./img/background.webp');"></div>
      
      <div id="age-gate-question" class="relative z-10 max-w-md flex flex-col items-center transition-all duration-300">
        <span class="font-montserrat text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-gold mb-6 block">
          Винодельческий дом Бюрнье
        </span>
        <h2 class="font-apparel text-3xl md:text-4xl text-paper leading-tight tracking-tight text-balance mb-4">
          Вам исполнилось 18 лет?
        </h2>
        <div class="w-12 h-px bg-gold mb-8"></div>
        <p class="font-montserrat text-[13px] md:text-[14px] font-light text-paper/70 leading-relaxed mb-10 text-pretty">
          Сайт содержит информацию о регулируемой алкогольной продукции, которая не предназначена для лиц младше 18 лет.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          <button id="age-yes" class="font-montserrat text-[11px] font-bold uppercase tracking-widest bg-gold text-wine hover:bg-paper hover:text-wine px-10 py-4 transition-colors duration-300">
            Да, мне есть 18
          </button>
          <button id="age-no" class="font-montserrat text-[11px] font-bold uppercase tracking-widest border border-paper/20 text-paper hover:border-gold hover:text-gold px-10 py-4 transition-colors duration-300">
            Нет, мне меньше 18
          </button>
        </div>
      </div>

      <div id="age-gate-warning" class="relative z-10 max-w-xl flex flex-col items-center transition-all duration-300 hidden">
        <span class="font-montserrat text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-gold mb-6 block">
          Винодельческий дом Бюрнье
        </span>
        <h2 class="font-apparel text-2xl md:text-4xl text-paper leading-tight tracking-tight text-balance mb-6">
          Информация на сайте предназначена для лиц старше 18 лет
        </h2>
        <div class="w-12 h-px bg-gold mb-8"></div>
        <p class="font-montserrat text-[13px] md:text-[14px] font-light text-paper/70 leading-relaxed mb-10 text-pretty">
          В соответствии с законодательством РФ мы не можем предоставить доступ к материалам сайта несовершеннолетним.
        </p>
        <div class="flex justify-center w-full sm:w-auto">
          <button id="age-back" class="font-montserrat text-[11px] font-bold uppercase tracking-widest border border-paper/20 text-paper hover:border-gold hover:text-gold px-12 py-4 transition-colors duration-300">
            Назад
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    const questionScreen = document.getElementById('age-gate-question');
    const warningScreen = document.getElementById('age-gate-warning');

    document.getElementById('age-yes').addEventListener('click', () => {
      localStorage.setItem('age_verified', 'true');
      document.body.classList.remove('overflow-hidden');
      overlay.remove();
      checkCookieConsent();
    });

    document.getElementById('age-no').addEventListener('click', () => {
      questionScreen.classList.add('hidden');
      warningScreen.classList.remove('hidden');
    });

    document.getElementById('age-back').addEventListener('click', () => {
      warningScreen.classList.add('hidden');
      questionScreen.classList.remove('hidden');
    });
  }

  function checkCookieConsent() {
    const consent = localStorage.getItem('cookie_consent');
    if (consent === 'true') return;

    const cookieBanner = document.createElement('div');
    cookieBanner.id = 'cookie-consent-banner';
    cookieBanner.className = 'fixed bottom-0 left-0 right-0 md:left-auto md:right-6 md:bottom-6 z-[9990] bg-wine text-paper md:max-w-md p-6 shadow-xl border-t md:border border-paper/10 flex flex-col sm:flex-row items-center gap-4 select-none';
    
    cookieBanner.innerHTML = `
      <div class="absolute inset-0 z-0 pointer-events-none opacity-5 mix-blend-multiply bg-repeat" style="background-image: url('./img/background.webp');"></div>
      <div class="relative z-10 flex-1">
        <p class="font-montserrat text-[12px] font-light text-paper/80 leading-relaxed text-pretty text-center sm:text-left">
          Мы используем файлы для сохранения пользовательских настроек и корректной работы сайта (cookies), чтобы сделать его удобнее.
        </p>
      </div>
      <div class="relative z-10 shrink-0">
        <button id="cookie-accept" class="font-montserrat text-[10px] font-bold uppercase tracking-widest bg-gold text-wine hover:bg-paper hover:text-wine px-6 py-2.5 transition-colors duration-300">
          ОК
        </button>
      </div>
    `;

    document.body.appendChild(cookieBanner);

    document.getElementById('cookie-accept').addEventListener('click', () => {
      localStorage.setItem('cookie_consent', 'true');
      cookieBanner.remove();
    });
  }
})();

// Универсальное автоматическое переключение языков (RU/EN) для любой вложенности
document.addEventListener('DOMContentLoaded', () => {
  let path = window.location.pathname; // например, "/wines/cabernet_franc.html"

  // Нормализуем путь (если зашли просто на домен без указания index.html)
  if (!path || path === '/') {
    path = '/index.html';
  }

  let ruPath = '';
  let enPath = '';

  // Проверяем, начинается ли текущий путь с английской папки /en/
  if (path.startsWith('/en/') || path === '/en') {
    // Мы находимся на английской версии страницы
    enPath = path;
    // Для русской версии отрезаем "/en" (первые 3 символа) из начала пути
    ruPath = path.substring(3) || '/index.html';
  } else {
    // Мы находимся на русской версии страницы
    ruPath = path;
    // Для английской версии дописываем "/en" в самое начало пути
    enPath = '/en' + path;
  }

  // Находим все ссылки переключения языков
  const ruLinks = document.querySelectorAll('.js-lang-ru');
  const enLinks = document.querySelectorAll('.js-lang-en');

  ruLinks.forEach(link => {
    link.href = ruPath;
  });

  enLinks.forEach(link => {
    link.href = enPath;
  });
});