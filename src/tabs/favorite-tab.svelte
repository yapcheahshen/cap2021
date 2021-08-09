<script>
    import {favoritelist} from '../store.js'
    import {addCard} from '../control/cards'
    const go=addr=>{
        addCard({addr});
    }
</script>
<div>
    {#each $favoritelist as favor (favor)}
        <div><span class="btn" on:click={()=>go(favor)}>{favor}</span></div>
    {/each}
</div>

<style>
    .btn {cursor:pointer}
    .btn:hover {border-bottom:blue 1px solid}
</style>