interface NukeJSCoreInterface {
    hooks : {
        useState : Function
    }
    doom : NukeJSDoom
}
class NukeJSCoreUseState {
    constructor(private key:string="",private value:string="") {
        let _window : any = window;
        if(_window.NukeJSCore.status[this.key]) {
            this.value = _window.NukeJSCore.status[this.key];
        }
    }
    set(value:any = "") {
        this.value = value;
        try {
            let _window:any = window;
            if(!_window.NukeJSCore) {
                _window.NukeJSCore = {
                    status : {}
                };
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
}

export default class _NukeJSCore extends NukeJSAdapter {}