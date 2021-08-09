import { mainstack } from "../store.js";
import {scrollToTop} from "../utils/event.js"
export const addCard=(obj,e,pos=-1)=>{
    const stack=get(mainstack);
    for (let card in stack){
        if (stack[card].addr==obj.addr) {
            // if (card==0) return;
            stack.splice(card,1);
            break;
        }
    }
    if (pos==-1) {
        stack.unshift(obj);
        if (e)scrollToTop(e);
    } else {
        stack.splice(pos,0,obj);
    }
    
    mainstack.set(stack);    
}
