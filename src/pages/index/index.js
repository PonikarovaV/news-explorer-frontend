import './index.css';
import '@babel/polyfill';

import HeaderNavigation from '../../scripts/components/HeaderNavigation';
import BaseEventsHandler from '../../scripts/components/BaseEventsHandler';
import Button from '../../scripts/components/Button';
import Form from '../../scripts/components/Form';
import Popup from '../../scripts/components/Popup';
import Observer from '../../scripts/components/Observer';

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

import {
  getButtonsEventList,
  getButtonsLazyEventList,
} from './settings/base-events-handler-settings';

const popup = document.querySelector('.popup');
const mobileMenu = document.querySelector('.mobile-menu');

const popupInstance = new Popup(popup);

const headerScreenNavigation = new HeaderNavigation(headerScreenNavigationOptions);
const headerMobileNavigation = new HeaderNavigation(headerMobileNavigationOptions);

const signinFormInstance = new Form(signinForm, headerScreenNavigation, signinFormOptions);
const signupFormInstance = new Form(signupForm, headerScreenNavigation, signupFormOptions);

const buttonsLazyEventList = getButtonsLazyEventList({
  popupInstance,
  signinFormInstance,
  signupFormInstance,
  headerScreenNavigation,
  headerMobileNavigation,
});

const buttonsEventList = getButtonsEventList({
  signinForm,
  signupForm,
  signinFormInstance,
  signupFormInstance,
  popupInstance,
  mobileMenu,
});

const baseButtonsEventsHandler = new BaseEventsHandler(buttonsEventList, Button);

const headerScreenNavigationObserver = new Observer({
  rootSectionIdentifier: '.navigation_place_header',
  domElementsIdentifiers: [
    '#button-logout-screen',
    '#button-login-screen',
  ],
  config: {
    childList: true,
    subtree: true,
  },
  eventList: buttonsLazyEventList,
  dependency: BaseEventsHandler,
  transferDependency: Button,
});

const headerMobileNavigationObserver = new Observer({
  rootSectionIdentifier: '.navigation_place_mobile-menu',
  domElementsIdentifiers: [
    '#button-logout-mobile',
    '#button-login-mobile',
  ],
  config: {
    childList: true,
    subtree: true,
  },
  eventList: buttonsLazyEventList,
  dependency: BaseEventsHandler,
  transferDependency: Button,
});

headerScreenNavigationObserver.setObserver();
headerMobileNavigationObserver.setObserver();

signinFormInstance.render();
signupFormInstance.render();

headerScreenNavigation.render();
headerMobileNavigation.render();

baseButtonsEventsHandler.setHandlers();
