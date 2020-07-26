import { MainApi } from '../../../scripts/api';
import { showSnackbarWithError } from '../../../scripts/utils/helpers';

export const getButtonsEventList = (settings) => (
  [
    {
      identifier: '.navigation_place_header',
      action: 'click',
      effect: (event) => {
        const location = window.location.origin;

        if (event.target.closest('#button-logout-screen')) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');

          window.location.replace(location);
        }

        if (event.target.closest('#button-login-screen')) {
          settings.popupInstance.show();
          settings.signinFormInstance.show();
        }
      },
    },
    {
      identifier: '.navigation_place_mobile-menu',
      action: 'click',
      effect: (event) => {
        const location = window.location.origin;

        if (event.target.closest('#button-logout-mobile')) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');

          window.location.replace(location);
        }

        if (event.target.closest('#button-login-mobile')) {
          settings.popupInstance.show();
          settings.signinFormInstance.show();
        }
      },
    },
    {
      identifier: '.header__menu-icon',
      action: 'click',
      effect: () => {
        settings.mobileMenu.classList.remove('mobile-menu_invisible');
      },
    },
    {
      identifier: '.close-icon_type_mobile',
      action: 'click',
      effect: () => {
        settings.mobileMenu.classList.add('mobile-menu_invisible');
      },
    },
    {
      identifier: '.close-icon_type_screen',
      action: 'click',
      effect: () => {
        settings.popupInstance.hide();
        settings.signupFormInstance.hide();
      },
    },
    {
      identifier: '.close-icon_type_mobile',
      action: 'click',
      effect: () => {
        settings.popupInstance.hide();
        settings.signinForm.classList.remove('form_active');
      },
    },
    {
      identifier: '.news__cards',
      action: 'click',
      effect: async (event) => {
        if (event.target.closest('.card__button')) {
          try {
            const button = event.target.closest('.card__button');

            const card = event.target.closest('.card__image');

            if (button.classList.contains('card__button_saved')) {
              const data = await MainApi.deleteArticle(card.id);

              if (!data.article) {
                throw new Error('Не удалось удалить карточку из избранных.');
              }

              settings.newsLoader();

              return;
            }

            settings.newsLoader();
          } catch (error) {
            showSnackbarWithError(error);
          }
        }
      },
    },
  ]
);

export default getButtonsEventList;
