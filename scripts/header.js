window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  if (!header) return; // защита от ошибок, если шапка отсутствует
  header.classList.toggle('header--scrolled', window.scrollY > 10);
});