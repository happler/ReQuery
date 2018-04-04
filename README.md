[Link to the Demo](https://www.harryappler.com/ReQuery)

# ReQuery

DOM manipulation with vanilla JavaScript, while easier now than in the past, can still be frustrating. To make interacting with the DOM easier I created this tool, inspired by the classic jQuery, that eases some of the frustration. ReQuery allows users to find node elements by selector or children of previously found elements, add or remove classes (or any other attribute), add event listers, and make AJAX requests

![Gif of gameplay](https://raw.githubusercontent.com/happler/ReQuery/master/assets/requery.gif)

## Technologies

Vanilla JavaScript, lodash.js for Demo: HTML5, CSS3

## Setup instructions

To use this tool, simply download [this file](..blob/master/lib/requery.js) and put it in your project. In the head of your index.html, include

```html
<script type="text/javascript" src="./__path__/__to__/__file__/requery.js"> </script>
```

before your JavaScript entry point script tag. Now you can use ReQuery! Don't worry if your linter doesn't like `$r`, it'll exist once you load the page.

## Implementation

One key piece of functionality I wanted to replicate was the pure versatility of the $ in jQuery. It can be used execute callbacks once the document is loaded, find elements on the page by any of the regular selectors, or create new elements. I did this by typechecking the input, and then performing the appropriate action based on that.

```javascript
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
```

Once I had each node in an object, I had to actually perform actions on each of them. some of these were trickier than others (especially attr, because it can be used in so many different ways), but the other one I wanted to highlight was adding (and removing) event listeners. To remove an event listener using vanilla JavaScript, you have to pass to the function the specific callback that you used when creating it. Sometimes, this is simple, because you defined the callback elsewhere and still have access to it, but oftentimes, the callback is defined as an anonymous function, so it doesn't even exist to be passed to the remove function. I solved this issue by storing the specific callback _on the element itself_ in an object I created, with the trigger for the callback as the key. This way, there is an easy way to see all callbacks on an element, and remove a specific callback by passing its trigger to .off()

```javascript
on(trigger, callback) {
  this.arr.forEach(el => {
    el.addEventListener(trigger, callback);
    if (el.eventTriggers) {
      el.eventTriggers[trigger] = callback;
    } else {
      el.eventTriggers = { [trigger]: callback };
    }
  });
}

off(trigger) {
  this.arr.forEach(el => {
    const callback = el.eventTriggers[trigger];
    el.removeEventListener(trigger, callback);
    delete el.eventTriggers[trigger];
  });
}
}
```

## Future Updates

One of the wonderful parts of jQuery that I have not yet added is Promises. Right now, you can define actions on success or failure of an AJAX request in the request itself, but the ability to chain together promises onto the end of them is very nice, and I want to implement that in a future version.
