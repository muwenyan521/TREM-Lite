const TREM = require('../constant');

const { BrowserWindow } = require('@electron/remote');
const win = BrowserWindow.fromId(process.env.window * 1);

const { ipcRenderer } = require('electron');

class WindowControler {
  static instance = null;

  constructor() {
    if (WindowControler.instance) {
      return WindowControler.instance;
    }
    this.bindEvents();
    WindowControler.instance = this;
  }

  static getInstance() {
    if (!WindowControler.instance) {
      new WindowControler();
    }
    return WindowControler.instance;
  }

  bindEvents() {
    const events = [
      'EewRelease',
      'EewAlert',
      'RtsPga2',
      'RtsPga1',
      'RtsShindo2',
      'RtsShindo1',
      'RtsShindo0',
      'ReportRelease',
      'IntensityRelease',
      'TsunamiRelease',
      'EewNewAreaAlert',
    ];

    events.forEach((event) => {
      TREM.variable.events.on(event, (ans) => this.windowFocus(event, ans));
    });
  }

  windowFocus(event, ans) {
    if (TREM.constant.SHOW_TREM_EEW || (event.startsWith('Eew') && ans.data.author != 'trem')) {
      if ((win.isMinimized() || !win.isVisible()) && TREM.constant.GAME_MODE) {
        ipcRenderer.send('toggle-pip');
        return;
      }
    }
    win.flashFrame(true);
    win.setAlwaysOnTop(true);
    win.show();
    win.setAlwaysOnTop(false);
  }
}

win.on('minimize', () => {
  if (TREM.constant.GAME_MODE && status_alert()) {
    ipcRenderer.send('toggle-pip');
  }
});

win.on('close', () => {
  if (TREM.constant.GAME_MODE && status_alert()) {
    ipcRenderer.send('toggle-pip');
  }
});

function status_alert() {
  return TREM.variable.cache.rts_trigger.loc.length || TREM.variable.cache.show_eew_box;
}

ipcRenderer.send('toggle-pip');

TREM.class.WindowControler = WindowControler;

WindowControler.getInstance();
