import './articles.css';
import '@babel/polyfill';

import HeaderNavigation from '../../scripts/components/HeaderNavigation';

import {
  headerScreenNavigationOptions,
  headerMobileNavigationOptions,
} from './settings/header-navigation-settings';

export const headerScreenNavigation = new HeaderNavigation(headerScreenNavigationOptions);
export const headerMobileNavigation = new HeaderNavigation(headerMobileNavigationOptions);

headerScreenNavigation.render();
headerMobileNavigation.render();
