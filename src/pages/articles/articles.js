import './articles.css';
import '@babel/polyfill';

import HeaderNavigation from '../../scripts/components/HeaderNavigation';
import BaseEventsHandler from '../../scripts/components/BaseEventsHandler';
import MainApi from '../../scripts/api/MainApi';
import GreetSection from '../../scripts/components/GreetSection';

import {
  headerScreenNavigationOptions,
  headerMobileNavigationOptions,
} from './settings/header-navigation-settings';

import { getButtonsEventList } from './settings/base-events-handler-settings';

import {
  setNewsListSectionState, setNewsList, showSnackbarWithError, getAuthState, cleanRootSection,
} from '../../scripts/utils/helpers';

(function isAuth() {
  if (!getAuthState()) {
    const location = window.location.origin;

    window.location.replace(location);
  }
}());

const mobileMenu = document.querySelector('.mobile-menu');

const headerScreenNavigation = new HeaderNavigation(headerScreenNavigationOptions);
const headerMobileNavigation = new HeaderNavigation(headerMobileNavigationOptions);

async function newsLoader() {
  try {
    const { articles } = await MainApi.getArticles();

    const greetSection = new GreetSection({
      rootSection: '.header__info-block',
      titleField: '.info-block__title',
      subtitleField: '.info-block__subtitle',
      articles,
      cleanRootSection,
    });

    greetSection.render();

    setNewsList('articles', articles, articles);

    setNewsListSectionState('newsListSuccess');
  } catch (error) {
    showSnackbarWithError(error);
  }
}

const buttonsEventList = getButtonsEventList({
  mobileMenu,
  newsLoader,
  headerScreenNavigation,
  headerMobileNavigation,
});

const baseButtonsEventsHandler = new BaseEventsHandler(buttonsEventList);

(function pageLoader() {
  baseButtonsEventsHandler.setHandlers();

  newsLoader();

  headerScreenNavigation.render();
  headerMobileNavigation.render();
}());
