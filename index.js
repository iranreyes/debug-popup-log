const DebugPopupLog = require('./debug-popup-log');

var popupLog = new DebugPopupLog();
popupLog.addPanel('DOM Tags', document.querySelectorAll('*').length);
popupLog.addPanel('Window size', () => `width: ${window.innerWidth}, height: ${window.innerHeight}`);
