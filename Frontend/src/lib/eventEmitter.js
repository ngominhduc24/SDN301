export default class EventEmitter {
  static events = {}

  static subscribe(eventName, fn) {
    this.events[eventName] = this.events[eventName] || []
    this.events[eventName].push(fn)
  }

  static unsubscribe(eventName, fn) {
    if (this.events[eventName]) {
      for (let i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1)
          break
        }
      }
    }
  }

  static unsubscribeEventName(eventName) {
    if (this.events[eventName]) {
      delete this.events[eventName]
    }
  }

  static publish(eventName, data = {}) {
    const events = this.events[eventName]

    events && events.forEach((fn) => fn(data))
  }
}
