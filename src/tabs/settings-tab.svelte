<script>
    import { get } from 'svelte/store';
    import {tosim} from '../store.js'

    const switchToSim=()=>{
        let ts=get(tosim)+1;
        if (ts>2) ts=0;
        tosim.set(ts);    
    }
    const labels={0:"原樣",1:"简體",2:"简体"}
</script>
<div class="settings">
    <span class="sim" on:click={switchToSim}>{ labels[$tosim] }</span> 
</div>

<style>
    .settings {-webkit-user-select: none}
    .sim{cursor:pointer;}
    .sim:hover{border-bottom:1px solid blue}
</style>