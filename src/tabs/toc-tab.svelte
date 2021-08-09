<script>
    import {opened} from 'pitaka';
    import Downloader from '../components/downloader.svelte';
    const baskets=opened();
    import {addCard} from '../control/cards.js'

    let namespaces=baskets.length?baskets[0][1].parse().namespaces:[];
    const showInfo=basket=>{
        namespaces=basket.parse().namespaces;
    }
    const go=ns=>{
        addCard({addr:'cct/'+ns});
    }
</script>

<div>
    {#each baskets as basket (basket)}
        {#if basket[1].header.title}
        <div><span class="btn" on:click={()=>showInfo(basket[1])}>{basket[0]}  {basket[1].header.title}
        </span><Downloader basket={basket[0]}/></div>
        {/if}
    {/each}
    {#each namespaces as namespace (namespace)} 
        <span class="btn" on:click={()=>go(namespace[0])}> {namespace[1].split(';')[0]} </span>
    {/each}
</div>

<style>
    .btn {cursor:pointer}
    .btn:hover {border-bottom:blue 1px solid}
</style>