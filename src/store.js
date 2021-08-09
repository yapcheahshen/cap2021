import {writable} from 'svelte/store'
const pf='cap2021.'
import { scrollToTop } from './utils/event'
export const loadSettings=()=>{
    let mainstack=JSON.parse(localStorage.getItem(pf+'mainstack'));
    if (!mainstack ||!mainstack.length || !Array.isArray(mainstack)) {
        mainstack= [{addr:'cct/易經'}]; //welcome page
    }
    const tosim=parseInt(localStorage.getItem(pf+'tosim')||'0');
    const panepos=parseInt(localStorage.getItem(pf+'panepos')||'70')||70;
    const tab=localStorage.getItem(pf+'tab')||'tab-toc';
    const favorite=JSON.parse(localStorage.getItem(pf+'favorite')||'[]') || [];
    return {mainstack,tosim,panepos,tab,favorite};
}
export const saveSettings=()=>{ //immediate save
    for (let key in settingsToBeSave) {
        localStorage.setItem(key, settingsToBeSave[key]);
        delete settingsToBeSave[key]
    }
    clearTimeout(updateTimer);
    console.log('settings autosaved on',new Date())
}
let updateTimer=0;
const settingsToBeSave={};
const updateSettings=_settings=>{
    let updated=false,oldval;
    for (let key in _settings) {
        if (_settings.hasOwnProperty(key) ) {
            if (settings[key]!==_settings[key]) {
                let val=_settings[key];
                if (typeof val=='object') {
                    val=JSON.stringify(_settings[key]);
                    oldval=JSON.stringify(settings[key]);
                }
                if (val!==oldval) {
                    settingsToBeSave[pf+key]=val;
                    if (typeof _settings[key]=='object') {
                        settings[key]=JSON.parse(JSON.stringify(_settings[key]));
                    } else {
                        settings[key]=_settings[key];
                    }
                    updated=true;
                }    
            }
        }
    }
    if (updated) {
        clearTimeout(updateTimer);
        updateTimer=setTimeout(saveSettings,3000); //autosave in 5 seconds
    }
}

export const settings=loadSettings();
export const tosim=writable(settings.tosim);
export const tab=writable(settings.tab);
export const panepos=writable(settings.panepos);
export const containers=writable({});
export const favoritelist=writable([].concat(settings.favorite));
export const mainstack=writable([].concat(settings.mainstack));

panepos.subscribe(panepos=>updateSettings({panepos}));
mainstack.subscribe(mainstack=>updateSettings({mainstack}));
favoritelist.subscribe(favorite=>updateSettings({favorite}));
tosim.subscribe(tosim=>updateSettings({tosim}));
tab.subscribe(tab=>updateSettings({tab}));
