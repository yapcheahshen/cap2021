<script>
    import { createEventDispatcher } from 'svelte'
    import {getCursorText,copySelection} from '../utils/cursortext';
    import {tosim} from '../store.js'
    import {addCard} from '../control/cards.js'
    import simplifiedChinese from '../actions/tosim.js'
    import hyperlink from '../actions/hyperlink.js'
    import {getNotificationsContext} from '../components-3rdparty/notifications/'
    const dispatch = createEventDispatcher()
    export let basket='', nline=0, text='' ,idx=0;

    const {addNotification } = getNotificationsContext();

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

        copySelection(0,tofind.length);
        addNotification({
            id: new Date().getTime(),
            text:"copied!"+tofind.substr(0,10),
            removeAfter:4000,
            position:'top-right'})
    }
</script>
<div on:click={click}>
    <span use:hyperlink={{nline,basket}} use:simplifiedChinese={$tosim}  >{@html text}</span>
</div>
<style>
    
</style>
