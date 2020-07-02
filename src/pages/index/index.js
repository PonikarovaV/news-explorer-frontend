import './index.css';

const openMenuIcon = document.querySelector('.header__menu-icon');
const closeMenuIcon = document.querySelector('.header__menu-close-icon');
const mobileMenu = document.querySelector('.mobile-menu');

openMenuIcon.addEventListener('click', () => {
  mobileMenu.classList.remove('mobile-menu_invisible');
});

closeMenuIcon.addEventListener('click', () => {
  mobileMenu.classList.add('mobile-menu_invisible');
});
