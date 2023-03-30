interface NukeJSCoreInterface {
    hooks : {
        useState : Function
    }
    doom : NukeJSDoom;
    clientCallback: clientCallback
}

class clientCallback {
    private makeKey(){
        let key = "";
        const array = ["N","U","K","E","J","S"];
        for(let i=0;i<10;i++){
            key += array[Math.floor(Math.random()*5)];
        }
        return key;
    }
    create(callback: Function) {
        let key = "";
        try {
            let _window:any = window;
            if(!_window.NukeJSCore) {
                _window.NukeJSCore = new NukeJSCoreStructDefine;
            }
            key = 'CALLBACK_' + this.makeKey();
            _window.NukeJSCore.callback[key] = callback;
            window = _window;
        }catch(e) {
        }
        return `NukeJSCore.callback.${key}()`;
    }
}
class NukeJSCoreStructDefine {
    status : any = {}
    callback: any = {}
}
class NukeJSCoreUseState {
    constructor(private key:string="",private value:string="") {
        let _window : any = window;
        if(_window.NukeJSCore && _window.NukeJSCore.status && _window.NukeJSCore.status[this.key]) {
            this.value = _window.NukeJSCore.status[this.key];
        } 
    }
    set(value:any = "") {
        this.value = value;
        try {
            let _window:any = window;
            if(!_window.NukeJSCore) {
                _window.NukeJSCore = new NukeJSCoreStructDefine;
            }
            _window.NukeJSCore.status[this.key] =  this.value;
            _window.nukepage.render();
            window = _window;
        }catch(e) {

        }
    }
    get(){
        return this.value;
    }
}
class NukeJSDoom extends Document {
    constructor(){
        super();
        
    }
    build(rootId:string = "",html : string=""){
        this.add(rootId,html);
    }
    private add(rootId:string = "",html : string=""){
        if(document.getElementById(rootId)) {
            let root = window.document.getElementById(rootId);
            if(root !== null) {
                root.innerHTML = html;
            }
        }
    }
}
class NukeJSAdapter implements NukeJSCoreInterface {
    hooks : {
        useState : Function
    } = {
        useState : (key:string="",defaultValue:string = "") => {
            return new NukeJSCoreUseState(key,defaultValue)
        }
    }
    doom: NukeJSDoom = new NukeJSDoom;
    clientCallback: clientCallback = new clientCallback;
}

export default class _NukeJSCore extends NukeJSAdapter {}