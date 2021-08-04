export const getCursorText=ele=>{
    const sel=getSelection()
    let offset=sel.anchorOffset;
    const ori=sel.anchorNode.parentElement.dataset.ori;
    let str=ori||sel.anchorNode.data;
    let dictch=str.substr(offset,20);

    if (!dictch.match( /[\u3fff-\u9fff]/u )) {
        offset--;
        dictch=str.substr(offset,20);
    }
    let tofind='';
    for (let i=0;i<dictch.length;i++) {
        if (dictch[i].match( /[\u3fff-\u9fff]/u)) tofind+=dictch[i];
        else break;
    }
    return {tofind,offset}
}
