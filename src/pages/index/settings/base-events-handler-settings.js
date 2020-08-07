import { MainApi } from '../../../scripts/api';
import {
  showSnackbarWithError, setNewsList, setNewsListSectionState, getAuthState,
} from '../../../scripts/utils/helpers';

export const getButtonsEventList = (settings) => (
  [
    {
      identifier: '.navigation_place_header',
      action: 'click',
      effect: (event) => {
        if (event.target.closest('#button-logout-screen')) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          settings.headerScreenNavigation.render();
          settings.newsLoader();
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
        if (event.target.closest('#button-logout-mobile')) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          settings.headerMobileNavigation.render();
          settings.newsLoader();
        }

        if (event.target.closest('#button-login-mobile')) {
          settings.popupInstance.show();
          settings.signinFormInstance.show();
        }
      },
    },
    {
      rootSection: settings.signinForm,
      identifier: '.form__redirect-link',
      action: 'click',
      effect: (event) => {
        event.preventDefault();
        settings.signinFormInstance.hide();
        settings.signupFormInstance.show();
      },
    },
    {
      rootSection: settings.signupForm,
      identifier: '.form__redirect-link',
      action: 'click',
      effect: (event) => {
        event.preventDefault();
        settings.signupFormInstance.hide();
        settings.signinFormInstance.show();
      },
    },
    {
      identifier: '.success-message',
      action: 'click',
      effect: (event) => {
        event.preventDefault();
        settings.signinFormInstance.show();
        settings.successMessagePopup.classList.remove('success-message_visible');
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
      identifier: '.search__button',
      action: 'click',
      effect: async () => {
        try {
          setNewsListSectionState('startSearch');

          await settings.searcher.sendRequest();

          const articles = JSON.parse(localStorage.getItem('articles'));

          if (!articles) {
            throw new Error('Ошибка поиска.');
          }

          if (!getAuthState()) {
            setNewsList('index', articles, []);

            setNewsListSectionState('newsListSuccess');

            return;
          }

          const { articles: savedArticles } = await MainApi.getArticles();

          setNewsList('index', articles, savedArticles);

          setNewsListSectionState('newsListSuccess');
        } catch (error) {
          setNewsListSectionState('notFound');
          showSnackbarWithError(error);
        } finally {
          setNewsListSectionState('endSearch');
        }
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
              const { article } = await MainApi.deleteArticle(card.id);

              if (!article) {
                throw new Error('Не удалось удалить карточку из избранных.');
              }

              settings.newsLoader();

              return;
            }

            const cardLink = card.getAttribute('data-link');

            const articles = JSON.parse(localStorage.getItem('articles'));

            const foundData = articles.find((article) => article.urlToImage === cardLink);

            const { data } = await MainApi.saveAtricle({
              keyword: foundData.keyword,
              title: foundData.title,
              text: foundData.description,
              date: foundData.publishedAt,
              source: foundData.source.name,
              link: foundData.url,
              image: foundData.urlToImage,
            });

            if (!data) {
              throw new Error('К сожалению статью не удалось сохранить. Попробуйте позже.');
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
