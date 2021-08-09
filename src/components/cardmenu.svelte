<script>
    import { createEventDispatcher } from 'svelte'
    import {isFavorite} from '../control/favorites';
    const dispatch = createEventDispatcher()
    export let addr='';

    let favor=isFavorite(addr);
    const close=()=>{
        dispatch('close'); 
    }
    const favorite=()=>{
        favor=!favor
        dispatch('favorite',favor); 
    }
</script>


<div>
    <span class="btnclose" on:click={close}>⨯</span>
    <span class='togglestar'  on:click={favorite} 
    class:star={favor}>{favor?'★':'☆'}</span>
    
</div>

<style>
    span.btnclose {float:right;height:1em;width:1em;color:rgba(0,0,0,0.3);cursor:pointer}
    span.btnclose:hover {color:rgba(255,0,0,1)}
    span.togglestar{float:right;padding-right:1em;cursor:pointer}
    span.togglestar:hover {color:goldenrod}
	span.star {color:gold}

</style>