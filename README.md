# debug-popup-log
Javascript popup to help you watch and debug you logs

This package creates a popup fixed on the viewport where you can send persistent data that will help you to debug.

The main goal was to send functions with values that will change in runtime and the popup core will watch all the changes.

## How to use

```
npm i debug-popup-log
```

```
const DebugPopupLog = require('debug-popup-log');

const popupLog = new DebugPopupLog();

popupLog.addPanel('DOM Tags', document.querySelectorAll('*').length);

popupLog.addPanel('Window size', () => `width: ${window.innerWidth}, height: ${window.innerHeight}`);
```
