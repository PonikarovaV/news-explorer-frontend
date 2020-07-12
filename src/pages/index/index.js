import './index.css';
import '@babel/polyfill';

import {
  headerScreenNavigation,
  headerMobileNavigation,
} from '../../scripts/components/HeaderNavigation';

import {
  signinFormInstance,
  signupFormInstance,
} from '../../scripts/components/Form';

import { baseButtonsEventsHandler } from '../../scripts/components/BaseEventsHandler';


signinFormInstance.render();
signupFormInstance.render();

headerScreenNavigation.render();
headerMobileNavigation.render();

baseButtonsEventsHandler.setHandlers();
