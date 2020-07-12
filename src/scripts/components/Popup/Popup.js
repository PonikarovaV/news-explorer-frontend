import BaseComponent from '../BaseComponent';

export default class Popup extends BaseComponent {
  show = () => {
    this.domElement.classList.remove('popup_invisible');
  }

  hide = () => {
    this.domElement.classList.add('popup_invisible');
  }
}
