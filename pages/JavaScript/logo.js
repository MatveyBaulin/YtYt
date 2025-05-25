// Увеличение логотипа в подвале
document.addEventListener('DOMContentLoaded', () => {
  const logo = document.querySelector('.footer-logo');

  logo.addEventListener('mouseenter', () => {
    logo.classList.add('enlarged');
  });

  logo.addEventListener('mouseleave', () => {
    logo.classList.remove('enlarged');
  });
});