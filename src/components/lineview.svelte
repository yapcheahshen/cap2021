<script>
    import { createEventDispatcher } from 'svelte'
    import {getCursorText} from '../utils/cursortext';
    import {tosim,addCard} from '../store.js'
    import simplifiedChinese from '../actions/tosim.js'
    import hyperlink from '../actions/hyperlink.js'
    const dispatch = createEventDispatcher()
    export let basket='', nline=0, text='' ,idx=0;

    const click=e=>{
        if (e.target.dataset.target) {
            let target=e.target.dataset.target;
            const ns=e.target.dataset.ns;
            if (target.indexOf('#')==-1) target=ns+'#'+target;
            addCard({addr:basket+'/'+target},e);
            return;
        }
        const {tofind,offset}=getCursorText(e.target);
        dispatch('cursorText',{tofind,basket,nline,idx,offset} );
    }
</script>
<div on:click={click}>
    <span use:hyperlink={{nline,basket}} use:simplifiedChinese={$tosim}  >{@html text}</span>
</div>
<style>
    
</style>
