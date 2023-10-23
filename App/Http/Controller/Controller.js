
const autobind = require("auto-bind");

module.exports = class Controller {
  constructor(){
    autobind(this)
  }
};