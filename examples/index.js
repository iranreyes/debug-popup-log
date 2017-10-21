const DebugPopupLog = require('../src/debug-popup-log');

var popupLog = new DebugPopupLog();
popupLog.addPanel('DOM Tags', document.querySelectorAll('*').length);
popupLog.addPanel('Window size', () => `width: ${window.innerWidth}, height: ${window.innerHeight}`);
popupLog.addPanel('Object', { a: 1, b: 2 });
