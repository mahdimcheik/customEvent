function CustomEvent() {
  this.listeners = {};
}
CustomEvent.prototype.subscribe = function (eventName, someFunction) {
  if (!this.listeners[eventName]) {
    this.listeners[eventName] = [someFunction];
    return;
  }
  this.listeners[eventName].push(someFunction);
};
CustomEvent.prototype.emit = function (eventName, data) {
  const listeners = this.listeners[eventName];
  listeners &&
    Array.isArray(listeners) &&
    listeners.map((listenr) => {
      listenr.call(null, data);
    });
};
CustomEvent.prototype.unsubscribeAll = function (eventName) {
  this.listeners[eventName] = undefined;
};
CustomEvent.prototype.unsubscribe = function (eventName, someFunction) {
  const funcs = this.listeners[eventName];

  const filteredFuncs = funcs.filter(
    (func) => func.toString() !== someFunction.toString()
  );

  this.listeners[eventName] = filteredFuncs;
};

let customEvent = new CustomEvent();

function triggered() {
  console.log("event triggered and answer is coming 1 ");
}
function triggered2() {
  console.log("event triggered and answer is coming 2 ");
}

customEvent.subscribe("trigger", triggered);
customEvent.subscribe("trigger", triggered2);

customEvent.emit("trigger", null);
