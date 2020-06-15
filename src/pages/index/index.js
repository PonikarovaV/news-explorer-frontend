import './index.css';

const menuIcon = document.querySelector('.header__menu-icon');
const closeMenuIcon = document.querySelector('.header__menu-close-icon');

menuIcon.addEventListener('click', () => {
  closeMenuIcon.classList.add('header__menu-close-icon_visible');
  menuIcon.classList.add('header__menu-icon_invisible');
});

closeMenuIcon.addEventListener('click', () => {
  closeMenuIcon.classList.remove('header__menu-close-icon_visible');
  menuIcon.classList.remove('header__menu-icon_invisible');
});
