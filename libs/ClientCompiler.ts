import NukeJSAdapter from "./NukeJSCore";
export default class ClientCompiler {
  constructor(private html: string) {}
  run() {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(this.html, "text/html");
    htmlDoc.querySelectorAll("*[nuk-for]").forEach((item, _index) => {
      item = isLoop(item);
    });
    return htmlDoc.body;
  }
}

function isLoop(html: Element) {
  let _window: any = window;
  let cloneItem = html.querySelectorAll("*")[0].cloneNode(true);
  html.innerHTML = "";
  let dataStatusKey: any = html.getAttribute("nuk-for");
  const data: any =
    _window.NukeJSCore &&
    _window.NukeJSCore.status &&
    _window.NukeJSCore.status[dataStatusKey] &&
    _window.NukeJSCore.status[dataStatusKey][0]
      ? _window.NukeJSCore.status[dataStatusKey]
      : [];
  const key: any = html.getAttribute("key");
  data.forEach((_data: any,i : number) => {
    const e = i;
    const miniLoop = (list: Node,_data: any) => {
      Array.from((<Element>list).attributes).forEach((attr) => {
        if (attr.value !== "") {
          Object.keys(_data).forEach((_key, _in) => {
            const keyOfArray = _key;
            (<Element>list).setAttribute(
              attr.name,
              attr.value.replaceAll(
                "Nuk[" + keyOfArray + "]",
                _data[keyOfArray].toString()
              )
            );
          });
        }
      });
      (<Element>list).querySelectorAll("*").forEach((item, _index) => {
        if (item.getAttribute("html")) {
          const keyhtml: any = item.getAttribute("html");
          item.innerHTML = _data[keyhtml];
        }
        if (item.getAttribute("text")) {
          const keytext: any = item.getAttribute("text");
          item.textContent = _data[keytext];
        }
        if (item.getAttribute("show")) {
          const keyshow: any = item.getAttribute("show");
          if (_data[keyshow] === false) {
            item.remove();
          }
        }
        Array.from(item.attributes).forEach((attr) => {
          if (attr.value !== "") {
            Object.keys(_data).forEach((_key, _in) => {
              
              if (attr.name === "if") {
                let keyIf: string = attr.value;
                
                keyIf = keyIf.replaceAll('Nuk['+_key+']',`_data['${_key}']`);
                if(keyIf.indexOf('Nuk') === -1){
                  if(eval(keyIf)) {
                    // notthing
                  } else {
                    item.remove();
                  }  
                }
              } else {
                item.setAttribute(
                  attr.name,
                  attr.value.replaceAll(
                    "Nuk[" + _key + "]",
                    _data[_key].toString()
                  )
                );
              }
            });
          }
        });
        if (item.innerHTML !== "" && item.querySelectorAll("*").length === 0) {
          item.innerHTML = item.innerHTML.replaceAll(
            "Nuk[" + key + "]",
            e.toString()
          );
        }
        if (item.querySelectorAll("*").length >= 0) {
          miniLoop(item,_data);
        }
      });
    };
    const _cloneItem = cloneItem.cloneNode(true);
    miniLoop(_cloneItem,_data);
    html.appendChild(_cloneItem);
  });
  return html;
}
