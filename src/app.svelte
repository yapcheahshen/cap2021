<script>
	import { onMount } from 'svelte';
	import { get} from 'svelte/store';
	import {openBasket} from 'pitaka'
	import StackView from './components/stackview.svelte'
	import PaneWithPanel from './components-3rdparty/PaneWithPanel.svelte';
	import DictTab from './dict-tab.svelte';
	import TocTab from './toc-tab.svelte';
	import SettingsTab from './settings-tab.svelte';
	import FavoriteTab from './favorite-tab.svelte';
	import SearchTab from './search-tab.svelte';
	import {debounce} from './utils/event.js';
	import {setting_icon,dictionary_icon,search_icon,reference_icon,
	favorite_icon,note_icon,toc_icon,tool_icon,tools_icon} from './icons'
	import {tab,panepos} from './store'

	let type='',ready=false,isFavorite=false;
	const mm=q=>window.matchMedia(q).matches;
	window.onresize=()=>{
		setTimeout(()=>{
			if (mm('(min-width: 769px)') || mm('(orientation:landscape)')) type='horizontal';
			else type='vertical'
		})
	}
	
	onMount(async ()=> {
		
		await openBasket('cct');
		await openBasket('moedict');
		ready=true;
		onresize();
	});
	let ppos=get(panepos);
	const setPanePos=debounce(()=>panepos.set(ppos));
	$: setPanePos(ppos)
</script>



{#if !ready}
	<div>Loading</div>
{:else}
	<PaneWithPanel bind:pos={ppos} bind:type>
		<div slot="panel-left-menu">
			top menu
		</div>
		<div slot="panel-left">
			<div class='spacer'></div>
			<StackView/>
		</div>
		<div class="tabs" slot="panel-right-menu">
		    <button class:active="{$tab=='tab-toc'}" on:click="{() => $tab = 'tab-toc'}" title='TOC' alt="☰">{@html toc_icon}</button>
    		<button class='search' class:active="{$tab=='tab-search'}" on:click="{()=>$tab='tab-search'}" title='search'>{@html search_icon}</button>
    		<button class:active="{$tab=='tab-dict'}" on:click="{()=>$tab='tab-dict'}" title='dictionary'>{@html dictionary_icon}</button>
    		<button class:active="{$tab=='tab-refer'}" on:click="{()=>$tab='tab-refer'}" title='refer'>{@html reference_icon}</button>
    		<button class:active="{$tab=='tab-favorite'}" on:click="{()=>$tab='tab-favorite'}" title='favorite' alt="★">{@html favorite_icon}</button>
    		<button class:active="{$tab=='tab-note'}" on:click="{()=>$tab='tab-note'}" title='note' alt="✎">{@html note_icon}</button>
			<button class:active="{$tab=='tab-tools'}" on:click="{()=>$tab='tab-tools'}" title='tools'>{@html tools_icon}</button>
    		<button class:active="{$tab=='tab-settings'}" on:click="{()=>$tab='tab-settings'}" title='settings'>{@html setting_icon}</button>
		</div>

		<div slot="panel-right">
			<div class='spacer'></div>
			<div class="tab-content" class:visible={$tab=='tab-toc'}>		
				<TocTab/>		
			</div>
			<div class="tab-content" class:visible={$tab=='tab-search'}>
				<SearchTab/>
			</div>
			<div class="tab-content" class:visible={$tab=='tab-dict'}>
				<DictTab/>
			</div>

			<div class="tab-content" class:visible={$tab=='tab-refer'}>				

			</div>
			<div class="tab-content" class:visible={$tab=='tab-favorite'}>
				<FavoriteTab/>
			</div>
			<div class="tab-content" class:visible={$tab=='tab-note'}>
				notes		
			</div>
			<div class="tab-content" class:visible={$tab=='tab-tools'}>	
				tools	
			</div>
			<div class="tab-content" class:visible={$tab=='tab-settings'}>
				<SettingsTab/>	
			</div>
		</div>
	</PaneWithPanel>
{/if}

<style>
	:root {--selected : #333; --unselected: #999 ; --hover: orange}
	.spacer {height:2em}
	button {
		background: rgba(0,0,0,0);
		text-align: left;
		position: relative;
		border: none;
		height:30px;
		cursor:pointer;
		border-bottom: 3px solid transparent;
		/* padding: 12px 12px 8px 12px; */
		color: var(--unselected);
		fill : var(--unselected);
		border-radius: 0;
	}
	
	button.active {
		border-bottom: 3px solid darkorange;
		color:var(--selected);
		fill: var(--selected) ;
	}

	button:hover { 
		fill: var(--hover)
	}

	/* button.search {transform:rotateY(180deg)} */

	.tab-content {
		position: absolute;
		width: 100%;
		height: calc(100% - 2em) ;
		/* !important; */
		opacity: 0;
		pointer-events: none;
		overflow:auto;
	}
	.tab-content.visible {
		/* can't use visibility due to a weird painting bug in Chrome */
		opacity: 1;
		pointer-events: all;
	}
	.tabs {-webkit-user-select: none;}
</style>