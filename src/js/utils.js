
export class DispatcherEvent {
    constructor(eventName) {
        this.eventName = eventName;
        this.callbacks = [];
    }

    registerCallback(callback) {
        this.callbacks.push(callback);
    }

    unregisterCallback(callback) {
        const index = this.callbacks.indexOf(callback);
        if (index > -1) {
            this.callbacks.splice(index, 1);
        }
    }

    fire(data) {

        const callbacks = this.callbacks.slice(0);
        callbacks.forEach((callback) => {
            callback(data);
        });
    }
}

export class Dispatcher {
    constructor() {
        this.events = {};
    }

    dispatch(eventName, data) {
        const event = this.events[eventName];

        if (event) {
            event.fire(data);
        }
    }

    on(eventName, callback) {
        let event = this.events[eventName];
        if (!event) {
            event = new DispatcherEvent(eventName);
            this.events[eventName] = event;
        }

        event.registerCallback(callback);
    }

    off(eventName, callback) {
        const event = this.events[eventName];
        if (event && event.callbacks.indexOf(callback) > -1) {

            event.unregisterCallback(callback);
            if (event.callbacks.length === 0) {
                delete this.events[eventName];
            }
        }
    }
}
const ModuleEventManager = new Dispatcher();


/**
 * Debounces function calls triggered by event fired
 * @param {function} callback
 * @param {number} wait - interval
 * @return {function}
 */
const debounce = (callback, wait) => {
    let timeoutId = null;
    return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
            callback.apply(null, args);
        }, wait);
    };
}

export {
    ModuleEventManager,
    debounce
}