/**
 * text: string, container?: HTMLElement
 */

/**
 * Fixes IE by appending element to body
 *  opts {
    appendToBody: boolean
  }
 */

function useClipboard(opts) {
    const appendToBody = opts && opts.appendToBody != undefined ? opts.appendToBody : true;
    return {
        toClipboard(text, container) {
            return new Promise((resolve, reject) => {
                // make fake element
                const fakeEl = document.createElement('button')
                // setup a new Clipboard.js
                const clipboard = new ClipboardJS(fakeEl, {
                    text: () => text,
                    action: () => 'copy',
                    container: container !== undefined ? container : document.body
                })
                clipboard.on('success', (e) => {
                    clipboard.destroy()
                    resolve(e)
                })
                clipboard.on('error', (e) => {
                    clipboard.destroy()
                    reject(e)
                })
                // appendToBody fixes IE
                if (appendToBody) document.body.appendChild(fakeEl)
                // simulate click
                fakeEl.click()
                // remove from body if appended
                if (appendToBody) document.body.removeChild(fakeEl)
            })
        }
    }
}
