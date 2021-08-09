import {favoritelist} from '../store.js'
import {get} from 'svelte/store'

export const isFavorite=addr=>{
    const list=get(favoritelist);
    for (let i in list) {
        if (list[i]==addr) {
            return true;
        }
    }
}
export const setFavorite=(addr,on)=>{
    const favorite=get(favoritelist);
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
    favoritelist.set(favorite);
}

