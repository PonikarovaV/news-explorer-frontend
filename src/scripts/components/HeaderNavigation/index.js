import HeaderNavigation from './HeaderNavigation';
import {
  headerScreenNavigationOptions,
  headerMobileNavigationOptions,
} from './options/main-page-options';

export const headerScreenNavigation = new HeaderNavigation(headerScreenNavigationOptions);
export const headerMobileNavigation = new HeaderNavigation(headerMobileNavigationOptions);
