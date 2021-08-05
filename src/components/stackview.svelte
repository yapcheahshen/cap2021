<script>
    import {onMount,} from 'svelte';
    import {receive} from './crossfade.js'
    import {mainstack,containers} from '../store.js'
    import CardView from './cardview.svelte'
    import {flip} from 'svelte/animate'
    import {scrollToTop} from '../utils/event'
    import { scale,slide ,draw,fade,fly} from 'svelte/transition';
    import { get } from 'svelte/store';
    let promoting;

    onMount(async ()=>{
        containers.set({dictionary:CardView})
    })
    const removeItem=({detail})=>{
        const stack=get(mainstack);
        stack.splice(detail,1);
        mainstack.set(stack)
    }
    const promoteItem=({detail})=>{
        promoting=detail;
        const stack=get(mainstack);
        stack.unshift({addr:detail});
        mainstack.set(stack);
    }
</script>
<div>
    {#each $mainstack as item,idx (item)}
        <div in:receive={{key:promoting}} style="z-index:{100-idx}" out:fly={{x:200}} animate:flip={{duration:800}}>
        <CardView on:removeItem={removeItem} 
        on:promoteItem={promoteItem} idx={idx} addr={item.addr} depth=0/>
        </div>
    {/each}
    <div class="endmarker"><span on:click={scrollToTop}>⇈⇈⇈</span></div>
</div>

<style>
    .endmarker {text-align: center;border-top:1px solid black;cursor:pointer}
</style>