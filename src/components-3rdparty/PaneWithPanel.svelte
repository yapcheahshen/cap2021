<script>
	import SplitPane from './SplitPane.svelte';
	export let type = 'horizontal'
	export let pos = 50;
</script>

<SplitPane type={type} bind:pos={pos}>
	<div id="left" slot="a">
		<div class='panel-left-menu'><slot name="panel-left-menu"/></div>
		<slot name="panel-left"/>
	</div>
	<div id="right" slot="b">
		<div class='panel-right-menu'><slot name="panel-right-menu"/></div>
		<slot name="panel-right"/>
	</div>
</SplitPane>

<style>
	.panel-left-menu {
		height:30px;
		overflow-y: clip;
		background:rgba(0,0,0,0.2);
		border-radius: 5px;
		position:fixed;
		/* z-index: 999; */
	}
	.panel-right-menu {
		height:30px;
		overflow-y: clip;
		background:rgba(255,255,255,0.9);
		position:fixed;
		/* z-index: 999; */
	}

</style>