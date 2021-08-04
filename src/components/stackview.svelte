<script>
    import {onMount,onDestroy} from 'svelte';
    import {receive} from './crossfade.js'
    import {mainStack,loadSettings, saveSettings,containers} from '../store.js'
    import CardView from './cardview.svelte'
    import {flip} from 'svelte/animate'
    import { scale,slide ,draw,fade,fly} from 'svelte/transition';
    let stack=[],promoting;
    const unsubscribe = mainStack.subscribe(n=>stack=n);
    const totop=(event)=>{
        let e=event.target;
        while (e&& e.scrollTop==0) e=e.parentElement;
        if (e)e.scrollTo(0,0)
    }
    onDestroy ( ()=>{
        unsubscribe();
        saveSettings({mainstack:stack})
    })
    onMount(async ()=>{
        const {mainstack}=await loadSettings();
        mainStack.set(mainstack)
        containers.set({dictionary:CardView})
    })
    const removeItem=({detail})=>{
        stack.splice(detail,1);
        mainStack.set(stack)
    }
    const promoteItem=({detail})=>{
        promoting=detail;
        stack.unshift({addr:detail});
        mainStack.set(stack)
    }
</script>
<div>
    {#each stack as item,idx (item)}
        <div in:receive={{key:promoting}} style="z-index:{100-idx}" out:fly={{x:200}} animate:flip={{duration:800}}>
        <CardView on:removeItem={removeItem} 
        on:promoteItem={promoteItem} idx={idx} addr={item.addr} depth=0/>
        </div>
    {/each}
    <div class="endmarker"><span on:click={totop}>⇈⇈⇈</span></div>
</div>

<style>
    .endmarker {text-align: center;border-top:1px solid black;cursor:pointer}
</style>