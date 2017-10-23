# debug-popup-log

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

![debug-popup-log](https://user-images.githubusercontent.com/5953115/31875229-8b537170-b7a3-11e7-8dff-4321de0a4cd6.png)

Javascript popup to help you watch and debug you logs

## Description

This package creates a popup fixed on the viewport where you can send persistent data that will help you to debug.

The main goal was to send functions with values that will change in runtime and the popup core will watch all the changes.

## How to install

[![NPM](https://nodei.co/npm/debug-popup-log.png)](https://www.npmjs.com/package/debug-popup-log)

## How to use

Just require the module and create and instance of the `DebugPopupLog` class.

```
const DebugPopupLog = require('debug-popup-log');

const popupLog = new DebugPopupLog();
```

The `DebugPopupLog` can receive two paramaters:

```
const popupLog = new DebugPopupLog(container, styles);
```

`container`: The DOM container where the popup will be add on, by default is `document.body`.

`styles`: The inline styles for wrapper tag element. The styles should be pass as an object. The css properties with more than one word will be capitalized.

Example:

```
const popupLog = new DebugPopupLog(container, {
    borderTop: '1px solid #4a4444',
    marginTop: 5,
    paddingTop: 5
});
```

## Examples

### How to add a panel

The instance of the class includes a method calls `addPanel` where you can add any amount of panel you want to watch.

Parameters:
1. Panel title
2. Panel content

The title is a plain string and the content can be whetever you want. It can be the result of function, a javascript primitive type or a function that will be executed all the time.

```
popupLog.addPanel('DOM Tags', document.querySelectorAll('*').length);

popupLog.addPanel('Window size', () => `width: ${window.innerWidth}, height: ${window.innerHeight}`);
```

### How to run the examples

You will find in the example folder a file call `index.js` that includes an example of how to use the package.

To run it you should bundle it with a bundler, for example `browserify`. To easy test it I recommend the use of `budo`, a quick library for prototyping.

Run:

```
$ budo index.js
```