const DOMNodeCollection = require("./dom_node_collection.js");
let documentLoaded = false;
let eventQueueue = [];

document.addEventListener("DOMContentLoaded", () => {
  documentLoaded = true;
  eventQueueue.forEach(el => el());
});

window.$r = function(arg) {
  let DOMArg;
  if (arg instanceof HTMLElement) {
    DOMArg = [arg];
    return new DOMNodeCollection(DOMArg);
  } else if (typeof arg === "function") {
    if (documentLoaded) {
      arg();
    } else {
      eventQueueue.push(arg);
    }
  } else {
    const elList = document.querySelectorAll(arg);
    DOMArg = Array.from(elList);
    return new DOMNodeCollection(DOMArg);
  }
};

$r.extend = (base, ...adds) => {
  adds.forEach(obj => {
    const keys = Object.keys(obj);
    keys.forEach(key => {
      base[key] = obj[key];
    });
  });
  return base;
};

$r.ajax = optionObj => {
  const defaults = {
    method: "GET",
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    data: {},
    url: window.location.href,
    error: () => console.log("An error has occured"),
    success: data => {
      console.log("Successful request");
      console.log(data);
    }
  };
  const xhr = new XMLHttpRequest();
  const toSend = $r.extend(defaults, optionObj);
  xhr.open(toSend.method, toSend.url);
  xhr.onload = () => {
    if (xhr.status == "200") {
      toSend.success(JSON.parse(xhr.response));
    } else {
      toSend.error(`${xhr.status}:${xhr.response}`);
    }
  };
  return xhr.send(toSend.data);
};

$r(() => console.log("loaded document"));
