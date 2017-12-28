const { BrowserWindow } = require('electron')
const Store = require('./Store')
const uuid = require('uuid/v4')

class WidgetManager {
  constructor() {
    this.windows = [];
    this.widgetStore = new Store({
      configName: 'widgets',
      defaults: []
    })
  }

  create(widget) {
    widget.id = uuid();
    this.widgetStore.set(widget.id, widget)
    this.openWindow(widget)
  }

  update(widget) {
    this.widgetStore.set(widget.id, widget)
  }

  delete(id) {
    this.widgetStore.delete(id)
    this.windows[id].close()
    delete this.windows[id]
  }

  openAllWindow() {
    let widgets = this.widgetStore.getAll();

    for (let label in widgets) {
      this.openWindow(widgets[label])
    }
  }

  openWindow(opt) {
    if (!opt.isActive) return;
    let win = new BrowserWindow({
        title: opt.name,
        x: opt.position.x,
        y: opt.position.y,
        width: opt.size.width,
        height: opt.size.height,
        alwaysOnTop: opt.isOnTop,
        autoHideMenuBar: true
    })
  
    if (opt.type === 'web') {
        win.loadURL(opt.url, {userAgent: 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Mobile Safari/537.36'})
    } else {
        // some code creating window for native widget
    }
  
    win.on('closed', () => {
        win = null
    })
  
    this.windows[opt.id] = win
  }
}

module.exports = WidgetManager