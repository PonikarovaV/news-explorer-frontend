import './index.css';
import '@babel/polyfill';

import HeaderNavigation from '../../scripts/components/HeaderNavigation';
import BaseEventsHandler from '../../scripts/components/BaseEventsHandler';
import SigninForm from '../../scripts/components/SigninForm';
import SignupForm from '../../scripts/components/SignupForm';
import Popup from '../../scripts/components/Popup';
import Searcher from '../../scripts/components/Searcher/Searcher';
import MainApi from '../../scripts/api/MainApi';

import {
  headerScreenNavigationOptions,
  headerMobileNavigationOptions,
} from './settings/header-navigation-settings';

import {
  signinForm,
  signupForm,
} from './settings/form-validation-settings';

import {
  signinFormOptions,
  signupFormOptions,
} from './settings/form-settings';

import { getButtonsEventList } from './settings/base-events-handler-settings';

import {
  setNewsListSectionState, setNewsList, showSnackbarWithError, getAuthState,
} from '../../scripts/utils/helpers';


const popup = document.querySelector('.popup');
const mobileMenu = document.querySelector('.mobile-menu');
const successMessagePopup = popup.querySelector('.success-message');

async function newsLoader() {
  try {
    const articles = JSON.parse(localStorage.getItem('articles'));

    if (!articles || !articles.length) {
      setNewsListSectionState('newsListReject');

      return;
    }

    if (!getAuthState()) {
      setNewsList(articles, []);
      setNewsListSectionState('newsListSuccess');

      return;
    }

    const { articles: savedArticles } = await MainApi.getArticles();

    setNewsList(articles, savedArticles);

    setNewsListSectionState('newsListSuccess');
  } catch (error) {
    showSnackbarWithError(error);
  }
}

const popupInstance = new Popup(popup);

const headerScreenNavigation = new HeaderNavigation(headerScreenNavigationOptions);
const headerMobileNavigation = new HeaderNavigation(headerMobileNavigationOptions);

const signinFormInstance = new SigninForm(signinFormOptions, {
  headerScreenNavigation,
  headerMobileNavigation,
  newsLoader,
});
const signupFormInstance = new SignupForm(signupFormOptions, successMessagePopup);

const searcher = new Searcher({
  searchField: '.search__input',
  notFoundSection: '#not-found',
  notFoundMessageSection: '.request-info__message',
});

const buttonsEventList = getButtonsEventList({
  signinForm,
  signupForm,
  signinFormInstance,
  signupFormInstance,
  popupInstance,
  mobileMenu,
  searcher,
  newsLoader,
  successMessagePopup,
  headerScreenNavigation,
  headerMobileNavigation,
});

const baseButtonsEventsHandler = new BaseEventsHandler(buttonsEventList);

(function pageLoader() {
  baseButtonsEventsHandler.setHandlers();

  newsLoader();

  headerScreenNavigation.render();
  headerMobileNavigation.render();

  signinFormInstance.render();
  signupFormInstance.render();
}());
