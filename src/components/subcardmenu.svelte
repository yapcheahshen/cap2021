<script>
    import { createEventDispatcher } from 'svelte'
    import { bringtotop_icon } from '../icons';
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
<span class="stickie" title="置頂" on:click={promote} alt="↸">{@html bringtotop_icon}</span>

<style>
    .btnclose {float:right;color:rgba(0,0,0,0.3);cursor:pointer}
    .btnclose:hover {color:rgba(255,0,0,1)}
    .stickie {float:right;padding-right:1em;fill:rgba(0,0,0,0.3);cursor:pointer}
    .stickie:hover{fill:black}
</style>