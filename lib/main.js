const DOMNodeCollection = require('./dom_node_collection.js');
let documentLoaded = false;
let eventQueueue = [];

document.addEventListener("DOMContentLoaded", () => {
  documentLoaded = true;
  eventQueueue.forEach ((el) => el());
});



window.$l = function (arg) {
  // debugger
  let DOMArg;
  if (arg instanceof HTMLElement) {
    DOMArg = [arg];
    return new DOMNodeCollection(DOMArg);
  } else if (typeof arg === 'function') {

    if (documentLoaded) {
      arg();
    }else{
      eventQueueue.push(arg);
    }

  } else {
    const elList = document.querySelectorAll(arg);
    DOMArg = Array.from(elList);
    return new DOMNodeCollection(DOMArg);
  }
};


$l( ()=> console.log('loaded document') );
