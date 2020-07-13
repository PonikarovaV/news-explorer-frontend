export default class Observer {
  constructor(options) {
    this.rootSection = document.querySelector(options.rootSectionIdentifier);
    this.config = options.config;
    this.domElementsIdentifiers = options.domElementsIdentifiers;
    this.eventList = options.eventList;
    this.Dependency = options.dependency;
    this.TransferDependency = options.transferDependency;
  }

  setObserver = () => {
    const observer = new MutationObserver((mutationsList) => {
      const loadedElements = this.domElementsIdentifiers.filter((identifier) => (
        mutationsList.find((mutation) => (
          mutation.target.querySelector(identifier)
        ))
      ));

      if (loadedElements && loadedElements.length > 0) {
        const handler = new this.Dependency(this.eventList, this.TransferDependency);

        handler.setLazyHandlers(loadedElements);
      }
    });

    observer.observe(this.rootSection, this.config);
  }
}
