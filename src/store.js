import {writable ,get} from 'svelte/store'
const pf='cap2021.'
export const loadSettings=()=>{
    const mainstack=JSON.parse(localStorage.getItem(pf+'mainstack'))||
            [{addr:'cct/shijing#鄘風.柏舟'},{addr:'cct/易經'}]
    const tosim=parseInt(localStorage.getItem(pf+'tosim')||0);
    const panepos=parseInt(localStorage.getItem(pf+'panepos'))||70;
    const tab=localStorage.getItem(pf+'tab')||'tab-toc';
    const favorite=JSON.parse(localStorage.getItem(pf+'favorite')||'[]');
    return {mainstack,tosim,panepos,tab,favorite};
}

export const saveSettings=()=>{ //immediate save
    for (let key in settingsToBeSave) {
        localStorage.setItem(key, settingsToBeSave[key]);
        delete settingsToBeSave[key]
    }
    clearTimeout(updateTimer);
    console.log('settings saved',new Date())
}

let updateTimer=0;
export const updateSettings=_settings=>{
    const s=get(settings);
    let updated=false;
    for (let key in _settings) {
        if (_settings.hasOwnProperty(key) ) {
            if (s[key]!==_settings[key]) {
                let val=_settings[key];
                if (typeof val=='object') {
                    val=JSON.stringify(_settings[key]);
                }
                settingsToBeSave[pf+key]=val;
                s[key]=_settings[key];
                updated=true;
            }
        }
    }
    if (updated) {
        clearTimeout(updateTimer);
        settings.set(s);
        updateTimer=setTimeout(saveSettings,3000); //autosave in 5 seconds
    }
}
export const addCard=obj=>{
    const stack=get(mainStack);
    for (let card in stack){
        if (stack[card].addr==obj.addr) {
            // if (card==0) return;
            stack.splice(card,1);
            break;
        }
    }
    stack.unshift(obj);
    mainStack.set(stack);    
}
export const isFavorite=addr=>{
    const list=get(favoriteList);
    for (let i in list) {
        if (list[i]==addr) {
            return true;
        }
    }
}
export const setFavorite=(addr,on)=>{
    const favorite=get(favoriteList);
    let del=-1;
    for (let i in favorite) {
        if (favorite[i]==addr){
            if (!on) {
                del=i;
            } else {
                on=false;
            }
            break;
        }
    }
    if (del>-1) favorite.splice(del,1);
    if (on) {
        favorite.unshift(addr);
    }
    updateSettings({favorite})
    favoriteList.set(favorite);
}
const settingsToBeSave={};

export let settings=writable(loadSettings());
export const mainStack=writable([]);
export const favoriteList=writable([]);
export const referPages=writable([]);
export const containers=writable({});
