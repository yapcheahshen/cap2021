export const getCursorText=ele=>{
    const sel=getSelection()
    let offset=sel.anchorOffset;
    const psib=sel.anchorNode.previousSibling ;
    if (psib && psib.dataset) {
        offset+=parseInt(psib.dataset.offset)+psib.innerText.length;
    }
    const ori=sel.anchorNode.parentElement.dataset.ori
    let str=(ori||sel.anchorNode.data).replace(/<.+?>/g,'');;
    let dictch=str.substr(offset,20);

    if (!dictch.match( /[\u3400-\u9fff]/u )) {
        offset--;
        dictch=str.substr(offset,20);
    }
    let tofind='';
    for (let i=0;i<dictch.length;i++) {
        if (dictch[i].match( /[\u3400-\u9fff]/u)) tofind+=dictch[i];
        else break;
    }
    return {tofind,offset}
}

export const copySelection=(from=0,size=1)=>{
    const sel=getSelection()
    const range=document.createRange()
    range.setStart(sel.anchorNode,from||sel.anchorOffset);
    range.setEnd(sel.anchorNode,from||sel.anchorOffset+size);
    sel.removeAllRanges()
    sel.addRange(range);
    document.execCommand('copy')
}