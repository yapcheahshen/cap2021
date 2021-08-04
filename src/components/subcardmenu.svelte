<script>
    import { createEventDispatcher } from 'svelte'
    const dispatch = createEventDispatcher()
    let isFavorite=false;
    const close=()=>{
        dispatch('close'); 
    }
    const promote=()=>{
        dispatch('promote'); 
    }
</script>


<span class="btnclose"  on:click={close}>⨯</span>
<span class="stickie" title="置頂" on:click={promote}>↸</span>

<style>
    .btnclose {float:right;color:rgba(0,0,0,0.3);cursor:pointer}
    .btnclose:hover {color:rgba(255,0,0,1)}
    .stickie {float:right;padding-right:1em;color:rgba(0,0,0,0.3);cursor:pointer}
    .stickie:hover{color:black}
</style>