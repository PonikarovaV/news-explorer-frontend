export default class BaseEventsHandler {
  constructor(events = [], dependencies = {}) {
    this.events = events;
    this.Dependencies = dependencies;
  }

  setLazyHandlers = (buttons) => {
    const foundEvent = this.events.find((event) => (
      buttons.find((identifier) => identifier === event.identifier)
    ));

    const button = foundEvent?.identifier && document.querySelector(foundEvent.identifier);

    if (button && foundEvent) {
      const handler = new this.Dependencies(button);

      handler.addListener(foundEvent.action, foundEvent.effect);
    }
  }

  setHandlers = () => {
    this.events.forEach((item) => {
      const button = item.rootSection
        ? item.rootSection.querySelector(item.identifier)
        : document.querySelector(item.identifier);
      const handler = button && new this.Dependencies(button);

      if (handler) {
        handler.addListener(item.action, item.effect);
      }
    });
  }
}
