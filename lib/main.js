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
    method: 'GET',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {},
    url: window.location.href,
    error: () =>console.log('An error has occured'),
    success: (data) => {
      console.log('Successful request');
      console.log(data);
    }

  };
  const xhr = new XMLHttpRequest();
  const toSend = $l.extend(defaults, optionObj);
  xhr.open(toSend.method, toSend.url);
  xhr.onload = () =>{
    if (xhr.status == '200'){
      toSend.success(JSON.parse(xhr.response));
    } else{
      toSend.error(`${xhr.status}:${xhr.response}`);
    }
  };
  return xhr.send(toSend.data)
};

$l( ()=> console.log('loaded document') );
