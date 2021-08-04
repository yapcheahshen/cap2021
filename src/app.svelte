<script>
	import { onMount ,onDestroy} from 'svelte';
	import {openBasket} from 'pitaka'
	import StackView from './components/stackview.svelte'
	import PaneWithPanel from './components-3rdparty/PaneWithPanel.svelte';
	import Card from './components/card.svelte'
	import DictTab from './dict-tab.svelte';
	import TocTab from './toc-tab.svelte';
	import SettingsTab from './settings-tab.svelte';
	import FavoriteTab from './favorite-tab.svelte';
	import {debounce} from './utils/event.js';
	import {referPages,settings,updateSettings} from './store'
	let cards2=[];

	const unsubscribe = referPages.subscribe(n=>cards2=n);
	let type='',ready=false,isFavorite=false;
	let tab=$settings.tab||'tab-toc';

	$: updateSettings({tab})

	const mm=q=>window.matchMedia(q).matches;
	window.onresize=()=>{
		setTimeout(()=>{
			if (mm('(min-width: 769px)') || mm('(orientation:landscape)')) type='horizontal';
			else type='vertical'
		})
	}
	onDestroy (unsubscribe);
	onMount(async ()=> {
		await openBasket('cct');
		await openBasket('moedict');
		ready=true;
		onresize();
	});
	let panepos=$settings.panepos;
	const setPanePos=debounce(()=>updateSettings({panepos}));
	$: setPanePos(panepos)
</script>



{#if !ready}
	<div>Loading</div>
{:else}
	<PaneWithPanel bind:pos={panepos} bind:type>
		<div slot="panel-left-menu">
			top menu
			
		</div>
		<div slot="panel-left">
			<div class='spacer'></div>
			<StackView/>
		</div>
		<div class="tabs" slot="panel-right-menu">
		    <button class:active="{tab=='tab-toc'}" on:click="{() => tab = 'tab-toc'}" title='TOC'>☰</button>
    		<button class='search' class:active="{tab=='tab-search'}" on:click="{()=>tab='tab-search'}" title='search'>⌕</button>
    		<button class:active="{tab=='tab-dict'}" on:click="{()=>tab='tab-dict'}" title='dictionary'>ॐ</button>
    		<button class:active="{tab=='tab-refer'}" on:click="{()=>tab='tab-refer'}" title='refer'>⇆</button>
    		<button class:active="{tab=='tab-favorite'}" on:click="{()=>tab='tab-favorite'}" title='favorite'>★</button>
    		<button class:active="{tab=='tab-note'}" on:click="{()=>tab='tab-note'}" title='note'>✎</button>
    		<button class:active="{tab=='tab-settings'}" on:click="{()=>tab='tab-settings'}" title='settings'>⋮</button>
		</div>

		<div slot="panel-right">
			<div class='spacer'></div>
			<div class="tab-content" class:visible={tab=='tab-toc'}>		
				<TocTab/>		
			</div>
			<div class="tab-content" class:visible={tab=='tab-search'}>		
			</div>
			<div class="tab-content" class:visible={tab=='tab-dict'}>
				<DictTab/>
			</div>

			<div class="tab-content" class:visible={tab=='tab-refer'}>				
				{#each cards2 as card, index}
				<Card id={card.id} idx={card.i} />
				{/each}
			</div>
			<div class="tab-content" class:visible={tab=='tab-favorite'}>
				<FavoriteTab/>
			</div>
			<div class="tab-content" class:visible={tab=='tab-note'}>		
			</div>
			<div class="tab-content" class:visible={tab=='tab-settings'}>
				<SettingsTab/>	
			</div>
		</div>
	</PaneWithPanel>
{/if}

<style>
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
		color: #999;
		border-radius: 0;
	}
	
	button.active {
		border-bottom: 3px solid darkorange;
		color: #333;
	}

	button.search {transform:rotateY(180deg)}

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