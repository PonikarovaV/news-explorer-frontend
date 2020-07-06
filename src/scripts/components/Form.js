export default class Form {
  constructor(options) {
    this.form = options.form;
    this.validator = options.validator;
    // console.log(this.form, this.validator);
  }

  render() {
    this.validator.run();
  }
}
