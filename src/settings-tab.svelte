<script>
    import {settings,updateSettings} from './store.js'
    
    const save=()=>{
        saveSettings();
    }
    const switchToSim=()=>{
        let tosim=$settings.tosim+1;
        if (tosim>2) tosim=0;
        updateSettings({tosim});
    }
    const labels={0:"原樣",1:"简體",2:"简体"}
</script>
<div class="settings">
    <span class="sim" on:click={switchToSim}>{ labels[$settings.tosim] }</span> 
</div>

<style>
    .settings {-webkit-user-select: none}
    .sim{cursor:pointer;}
    .sim:hover{border-bottom:1px solid blue}
</style>