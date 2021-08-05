import {toSim} from 'lossless-simplified-chinese'
export default function simplifiedChinese(node,mode=0){
    // const simChildren=(node,mode)=>{
    //     if (node.children&&node.children.length) {
    //         for (let i=0;i<node.children.length;i++) {
    //             simChildren(node.children[i],mode);
    //         }
    //     } else {
    //         if (!node.dataset.ori) node.dataset.ori=node.innerText;
    //         node.innerText = toSim(node.dataset.ori,mode);
    //     }
    // }
    const simChildren=(node,mode)=>{
             if (!node.dataset.ori) node.dataset.ori=node.innerHTML;
             node.innerHTML = toSim(node.dataset.ori,mode);
    }
    simChildren(node,mode);
    return {
        update(mode) {
            simChildren(node,mode);
        }
    }
}