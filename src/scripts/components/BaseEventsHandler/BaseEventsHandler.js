export default class BaseEventsHandler {
  constructor(events = []) {
    this.events = events;
  }

  setHandlers = () => {
    this.events.forEach((item) => {
      const button = item.rootSection
        ? item.rootSection.querySelector(item.identifier)
        : document.querySelector(item.identifier);

      if (button) {
        button.addEventListener(item.action, item.effect);
      }
    });
  }
}
