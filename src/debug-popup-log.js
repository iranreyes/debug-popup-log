var toStyleString = require('to-style').string;
var check = require('check-types');

var defaultValues = require('./defaultValues');

function DebugPopupLog(documentContainer, wrapperStyles) {
  this._init(documentContainer, wrapperStyles);
}

DebugPopupLog.prototype._init = function(documentContainer, wrapperStyles) {
  this.container = document.createElement('div');
  this.container.id = 'j3-info-popup';

  var paramStyles = wrapperStyles || {};
  var styles = Object.assign({}, defaultValues.defaultContainerStyles, paramStyles);

  var stringifyStyles = toStyleString(defaultValues.defaultContainerStyles, { addUnits: true });

  if (stringifyStyles) {
    this.container.style.cssText = stringifyStyles;
  }

  var container = documentContainer || document.body;
  container.appendChild(this.container);
};

DebugPopupLog.prototype.addPanel = function(title, content) {
  // Panel container
  var panelElement = document.createElement('div');
  panelElement.classList.add('panel');

  if (this.container.children.length > 0) {
    panelElement.style.cssText = toStyleString(defaultValues.defaultPanelStyles);
  }

  if (title) {
    var titleElement = document.createElement('div');
    titleElement.style.cssText = toStyleString(defaultValues.defaultPanelTitleStyles);
    titleElement.innerText = title;
    panelElement.appendChild(titleElement);
  }

  if (content) {
    var contentElement = document.createElement('div');
    contentElement.style.cssText = toStyleString(defaultValues.defaultPanelContentStyles);

    // Refactor checking and use check-types module
    if (check.number(content) || check.boolean(content) || check.string(content)) {
      this._generatePrimitive(panelElement, contentElement, content);
    } else if (check.function(content)) {
      this._generateFunction(panelElement, contentElement, content);
    } else if (content.nodeType && content.nodeType === 1) {
      this._generateDOMElement(panelElement, contentElement, content);
    } else if (check.object(content)) {
      this._generateObject(panelElement, contentElement, content);
    } else {
      console.error('Unsupported content data type');
    }
  }
  this.container.appendChild(panelElement);
};

DebugPopupLog.prototype._generatePrimitive = function(panelElement, contentElement, content) {
  contentElement.innerText = content;
  panelElement.appendChild(contentElement);
};

DebugPopupLog.prototype._generateFunction = function(panelElement, contentElement, content) {
  panelElement.appendChild(contentElement);
  var loop = function() {
    var result = content();

    // Require the function returns a value
    if (result) {
      contentElement.innerText = result;
      requestAnimationFrame(loop);
    } else {
      contentElement.innerText = 'void function';
      console.warn('Detected void return in callback function. Callback function executed only once');
    }
  };
  requestAnimationFrame(loop);
};

DebugPopupLog.prototype._generateDOMElement = function(panelElement, contentElement, content) {
  contentElement.innerHTML = content.innerHTML;
  panelElement.appendChild(contentElement);
};

DebugPopupLog.prototype._generateObject = function(panelElement, contentElement, content) {
  contentElement.innerText = JSON.stringify(content);
  panelElement.appendChild(contentElement);
};

module.exports = DebugPopupLog;
