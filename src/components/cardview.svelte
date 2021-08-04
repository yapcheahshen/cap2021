<script>
    import {parse,readLines} from 'pitaka';
    import { onMount } from 'svelte';
    import CardMenu from './cardmenu.svelte'
    import SubCardMenu from './subcardmenu.svelte'
    import {send} from './crossfade.js'
    import { createEventDispatcher } from 'svelte'
    import {setFavorite} from '../store'
    const dispatch = createEventDispatcher()

    import Linesview from './linesview.svelte';
    export let addr='', depth=0, idx=-1;
    let lineWidgets=[],basket=null;

    onMount(async ()=>{
        const r=await parse(addr);
        if (!r || !r.basket) {
            dispatch('close', idx)
            return;
        }
        basket=r.basket;

        let rawlines=await readLines(r);
        let lines=rawlines;
        if (basket=='moedict') {
            lines =[ rawlines[0] ]
            for (let i=1;i<rawlines.length;i++) {
                const t=rawlines[i][1];
                if (t[0]=='#') break;
                else if (t[0]!==':') {
                    lines.push(rawlines[i]);
                }
            }
        } 
        lineWidgets=lines.map(item=>({type:0,nline:item[0],text:item[1],basket}))
    })

    const onInsertWidget=({detail})=>{
        const {idx,tofind}=detail;
        let out=lineWidgets;
        out.splice(idx+1,0,{type:1,addr:'moedict/'+tofind});
        lineWidgets=out;
    }
    const close=()=>{
        dispatch('close', idx)
    }
    const remove=()=>{
        dispatch('removeItem', idx)
    }
    const promote=()=>{
        dispatch('close', idx)
        dispatch('promote',{idx,addr});
    }
    const onPromoteItem=({detail})=>{
        if (parseInt(depth)) {
            dispatch('promote',detail)
        } else {
            dispatch('promoteItem',detail.addr) //to stackview
        }
        
    }
    const removeWidget=idx=>{
        let out=lineWidgets;
        out.splice(idx,1);
        lineWidgets=out;
    }
    const onRemoveWidget=({detail})=>{
        removeWidget(detail)
    }
    const favorite=({detail})=>{
        setFavorite(addr,detail)
    }
</script>

<div style="background:hsl({90-depth*30} ,100%,95%);  padding-left: {(depth?3:0)}px;padding-right: {depth?3:0}px; z-index:{parseInt(depth)+10}" out:send={{key:addr}}>
    {#if parseInt(depth)}
    <SubCardMenu  on:close={close}  on:promote={promote}/>
    {:else} 
    <CardMenu on:favorite={favorite} on:close={remove} addr={addr}/>
    {/if}
    <Linesview depth={depth} 
    on:promoteItem={onPromoteItem}
    on:removeWidget={onRemoveWidget}
    on:insertWidget={onInsertWidget} lines={lineWidgets}/>
</div>

<style>
    div {box-shadow:  0px 0px 3px 1px #7f7f7f;}
</style>