export default class NukeLink {
    constructor(private rootId:string) {

    }
    build(){
        document.getElementById(this.rootId)?.querySelectorAll("a").forEach((item,index) => {
            if(item.getAttribute("link")) {
                item.addEventListener("click",(event: Event) => {
                    return window.history.pushState({}, "", item.getAttribute("link"));
                });    
            }
        })
    }
}