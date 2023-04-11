interface NukeJSCoreInterface {
    hooks: {
        useState: Function
    }
    doom: NukeJSDoom;
    clientCallback: clientCallback
}

class clientCallback {
    private makeKey() {
        let key = "";
        const array = ["N", "U", "K", "E", "J", "S","P","O","I","M","Q","W"];
        for (let i = 0; i < 16; i++) {
            key += array[Math.floor(Math.random() * 11)];
        }
        return key;
    }
    create(callback: Function) {
        let key = "";
        try {
            let _window: any = window;
            if (!_window.NukeJSCore) {
                _window.NukeJSCore = new NukeJSCoreStructDefine;
            }
            key = 'CALLBACK_' + this.makeKey();
            _window.NukeJSCore.callback[key] = callback;
            window = _window;
        } catch (e) {
        }
        return `NukeJSCore.callback.${key}(this)`;
    }
}
class NukeJSCoreStructDefine {
    status: any = {}
    callback: any = {}
}
class NukeJSCoreUseState {
    constructor(private key: string = "", private value: string = "",private recovery : boolean = true) {
        let _window: any = window;
        if (_window.NukeJSCore && _window.NukeJSCore.status && _window.NukeJSCore.status[this.key] && this.recovery === true) {
            this.value = _window.NukeJSCore.status[this.key];
        }
    }
    set(value: any = "",applyRender : boolean = true) {
        this.value = value;
        try {
            let _window: any = window;
            if (!_window.NukeJSCore) {
                _window.NukeJSCore = new NukeJSCoreStructDefine;
            }
            _window.NukeJSCore.status[this.key] = this.value;
            if(applyRender === true ) {
                _window.nukepage.render();
            }
            window = _window;
        } catch (e) {

        }
    }
    get() {
        return this.value;
    }
}
class NukeJSDoom extends Document {
    constructor() {
        super();

    }
    build(rootId: string = "", html: string = "") {
        this.add(rootId, html);
    }
    private add(rootId: string = "", html: string = "") {
        if (document.getElementById(rootId)) {
            let rootOld = window.document.getElementById(rootId);
            if(!rootOld) {
                return;
            }
            return rootOld.innerHTML = html;
        }
    }
}
class NukeJSAdapter implements NukeJSCoreInterface {
    hooks: {
        useState: Function
    } = {
            useState: (key: string = "", defaultValue: string = "") => {
                return new NukeJSCoreUseState(key, defaultValue)
            }
        }
    doom: NukeJSDoom = new NukeJSDoom;
    clientCallback: clientCallback = new clientCallback;
}

export default class _NukeJSCore extends NukeJSAdapter { }