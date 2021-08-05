import { pool } from "pitaka";


export default function hyperlink(node,{basket,nline}){
    // node.innerHTML=node.innerHTML.replace(/\&lt;[^&]+\&gt;/g,'');
    const links=pool.get(basket).getLinksAtLine(nline);
    // if (links.length) console.log(nline,links)

    if (!links.length) return;

    const text=node.innerHTML;

    let s='',i=0,intag=false ,nlink=0;
    let [start,len,target,ns]=links[nlink];

    while (i<text.length) {
        if (nlink<links.length) {
            if (i==start) {
                intag=true;
                s+='<span data-target="'+ target+'" data-offset="'+i
                +'" data-ns="'+ns
                +'" style="color:blue;cursor:pointer">';
            } else if (i==start+len) {
                s+='</span>';
                intag=false;
                nlink++;
                if (nlink==links.length) break;
                [start,len,target,ns]=links[nlink];
            }
        }
        s+=text[i];
        i++
    }
    node.innerHTML=s;
}