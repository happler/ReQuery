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

$l.extend = (base, ...adds) =>{
  adds.forEach(obj =>{
    const keys = Object.keys(obj);
    keys.forEach(key =>{
      base[key] = obj[key];
    });
  });
  return base;
};

$l.ajax = optionObj =>{
  const defaults = {
    method:'GET',
    contentType:'application/x-www-form-urlencoded; charset=UTF-8',
    
  }
  const xhr = new XMLHttpRequest();
  xhr.open()
}

$l( ()=> console.log('loaded document') );
