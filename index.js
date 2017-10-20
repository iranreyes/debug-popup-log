const containerElement = document.createElement( 'div' );
containerElement.id = 'j3-info-popup';
containerElement.style.cssText = `
    background-color: rgba(0,0,0,0.8);
    min-width: 100px;
    min-height: 45px;
    position: fixed;
    top: 10px;
    right: 10px;
    padding: 15px;
    font-size: 16px;
    color: white;
    border-radius: 3px;
    box-shadow: 0px 0px 7px 2px rgba(0,0,0,0.2);
    line-height: 1.5;
    font-family: sans-serif;
`;
document.body.appendChild(containerElement);

function addPanel(title = '', content = false) {
    // Panel container
    const panelElement = document.createElement( 'div' );
    panelElement.classList.add('panel');

    if(containerElement.children.length > 0) {
        panelElement.style.cssText = `
            border-top: 1px solid #4a4444;
            margin-top: 5px;
            padding-top: 5px;
        `;
    }

    if (title) {
        const titleElement = document.createElement('div');
        titleElement.style.cssText = "color: #b1b0b0;"
        titleElement.innerText = title;
        panelElement.appendChild(titleElement);
    }

    if (content) {
        const contentElement = document.createElement('div');
        contentElement.style.cssText = "font-size: 12px;"

        // Refactor checking and use check-types module
        if (typeof content === "number" || typeof content === "string" || typeof content === "boolean") {
            contentElement.innerText = content;
            panelElement.appendChild(contentElement);
        } else if (typeof content === "function") {
            panelElement.appendChild(contentElement);
            const loop = function() {
                const result = content();

                // Require the function returns a value
                if(result) {
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
    containerElement.appendChild(panelElement);
}

addPanel('Window size', `width: 230px, height: 456px`)