<script>
    import { createEventDispatcher } from 'svelte'
    import {getCursorText} from '../utils/cursortext';
    import {settings} from '../store.js'
    import {toSim} from 'lossless-simplified-chinese'
    const dispatch = createEventDispatcher()
    export let basket='', nline=0, text='' ,idx=0;

    const click=e=>{
        const {tofind,offset}=getCursorText(e.target);
        dispatch('cursorText',{tofind,basket,nline,idx,offset} );
    }
</script>
<div on:click={click}>
    {#if $settings.tosim}
    <span data-ori={text}>{toSim(text,$settings.tosim-1)}</span>
    {:else}
    <span></span>{text}
    {/if}
</div>

