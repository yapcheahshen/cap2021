<script>
    import Lineview from './lineview.svelte';
    import { createEventDispatcher } from 'svelte'
    import { scale,slide ,draw,fade,fly} from 'svelte/transition';
    import { containers } from '../store';
    const dispatch = createEventDispatcher()
    export let lines=[],depth=0;
    const onCursorText=({detail})=> {
        dispatch('insertWidget',detail)
    }
    const onClose=({detail})=>{
        dispatch('removeWidget',detail)
    }
    const onPromote=({detail})=>{
        console.log('linesview promote',detail)
        dispatch('promoteItem',detail);
    }
</script>

<div in:fly="{{x:-300}}" out:slide={{duration:700}}>
{#each lines as line,idx  (line) }
    {#if (line.type==0)}
        <Lineview on:cursorText={onCursorText} basket={line.basket} idx={idx} nline={line.nline} 
        text={line.text}  />
    {:else}
        <svelte:component this={$containers.dictionary} 
        idx={idx} on:close={onClose} on:promote={onPromote}
        depth={parseInt(depth)+1} addr={line.addr}/>
    {/if}
{/each}
</div>

<style>
   
</style>