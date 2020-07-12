export default class BaseEventsHandler {
  constructor(events, lazyEvents, dependencies = {}) {
    this.events = events;
    this.lazyEvents = lazyEvents;
    this.Dependencies = dependencies;
  }

  setObserver = (params) => {
    const observer = new MutationObserver((mutationsList) => {
      const loadedButtons = params.buttons.filter((buttonId) => (
        mutationsList.find((mutation) => (
          mutation.target.querySelector(`#${buttonId}`)
        ))
      ));

      if (loadedButtons && loadedButtons.length > 0) {
        this.setLazyHandlers(loadedButtons);
      }
    });

    observer.observe(params.rootSection, params.observerConfig);
  }

  setLazyHandlers = (buttons) => {
    const foundEvent = this.lazyEvents.find((lazyEvent) => (
      buttons.find((buttonId) => buttonId === lazyEvent.id)
    ));

    const button = foundEvent?.id && document.querySelector(`#${foundEvent.id}`);

    if (button && foundEvent) {
      const handler = new this.Dependencies(button);

      handler.addListener(foundEvent.action, foundEvent.effect);
    }
  }

  setHandlers = () => {
    this.events.forEach((item) => {
      const handler = item.button && new this.Dependencies(item.button);

      if (handler) {
        handler.addListener(item.action, item.effect);
      }
    });
  }
}
