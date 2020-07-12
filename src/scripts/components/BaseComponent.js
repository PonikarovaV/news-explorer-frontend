export default class BaseComponent {
  constructor(domElement) {
    this.domElement = domElement;
  }

  addListener = (...args) => {
    this.domElement.addEventListener(...args);
  }
}
