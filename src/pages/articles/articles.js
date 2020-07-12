import './articles.css';

import HeaderNavigation from '../../scripts/components/HeaderNavigation/HeaderNavigation';
import {
  headerScreenNavigationOptions,
  headerMobileNavigationOptions,
} from '../../scripts/components/HeaderNavigation/options/articles-page-options';

const headerScreenNavigation = new HeaderNavigation(headerScreenNavigationOptions);
const headerMobileNavigation = new HeaderNavigation(headerMobileNavigationOptions);

headerScreenNavigation.render();
headerMobileNavigation.render();
