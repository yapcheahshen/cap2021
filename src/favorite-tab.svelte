<script>
    import {onMount} from 'svelte';
    import {loadSettings,favoriteList,addCard} from './store.js'

    onMount(async ()=>{
        const {favorite}=await loadSettings();
        favoriteList.set(favorite)
    })
    const go=addr=>{
        addCard({addr});
    }

    
</script>
<div>
    {#each $favoriteList as favor (favor)}
        <div><span class="btn" on:click={()=>go(favor)}>{favor}</span></div>
    {/each}
</div>

<style>
    .btn {cursor:pointer}
    .btn:hover {border-bottom:blue 1px solid}
</style>