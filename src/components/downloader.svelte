<script>
    import {download_icon} from '../icons'
    export let basket='';
    let downloadable=true;
</script>
<div>
    <span class="btn" title='Download' alt={basket} class:downloadable>{@html download_icon}</span>
</div>


<style>
    .btn {display : none;}
    .downloadable {display:inline; cursor:pointer;fill:gray}
    .downloadable:hover {fill:rgb(0, 255, 242)}
</style>