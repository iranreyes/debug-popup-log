var toStyleString = require('to-style').string;
var defaultValues = require('./defaultValues');

function DebugPopupLog(documentContainer) {
  this._init(documentContainer);
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
    if (typeof content === 'number' || typeof content === 'string' || typeof content === 'boolean') {
      contentElement.innerText = content;
      panelElement.appendChild(contentElement);
    } else if (typeof content === 'function') {
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
    } else if (content.nodeType && content.nodeType === 1) {
      contentElement.innerHTML = content.innerHTML;
      console.warn('The support of DOM elements is still in progress');
    } else if (Object.prototype.toString.call(content) === '[object Object]') {
      contentElement.innerText = JSON.stringify(content);
      console.warn('The support of object is still in progress');
    }
  }
  this.container.appendChild(panelElement);
};

module.exports = DebugPopupLog;
