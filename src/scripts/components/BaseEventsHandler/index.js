import BaseEventsHandler from './BaseEventsHandler';
import Button from '../Button';

import { buttonsEventList, buttonsLazyEventList } from './settings';

// eslint-disable-next-line import/prefer-default-export
export const baseButtonsEventsHandler = new BaseEventsHandler(buttonsEventList, buttonsLazyEventList, Button);
