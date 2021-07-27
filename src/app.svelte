<script>
	import { onMount ,onDestroy,setContext} from 'svelte';
	import { get} from 'svelte/store';
	import {open} from 'pitaka'
	import PaneWithPanel from './PaneWithPanel.svelte';
	import Card from './card.svelte'
	import {bsearch} from 'pitaka/utils'
	let cards1=[];
	import { flip } from 'svelte/animate';
	import {referPages} from './store'
	let cards2=[];

	const unsubscribe = referPages.subscribe(n=>cards2=n);
	let type='',ready=false,isFavorite=false;
	let db=null,tab='tab4';
	const mm=q=>window.matchMedia(q).matches;
	window.onresize=()=>{
		setTimeout(()=>{
			if (mm('(min-width: 769px)') || mm('(orientation:landscape)')) type='horizontal';
			else type='vertical'
		})
	}

	onDestroy (unsubscribe);
	onMount(async ()=> {
		db=await open('moedict');
		await db.prefetchLines(1,800);

		for (let i=1;i<10;i++) {
			cards1.push({id:'a'+Math.floor(Math.random()*10000), i:i+1000});
		}
		// for (let i=1;i<35;i++) {
		// 	cards2.push({id:'b'+i, i:2600+i});
		// }
		ready=true;
		onresize();
	});
	function deleteCard({detail}){
		cards1=cards1.filter( item=>item.id!==detail);
	}
	function findHeadword(hw){
		const candidates=[];
		for (let i=1;i<hw.length+1;i++) {
			const at=bsearch(db.labels[0].headword,hw.substr(0,i));
			if (at>-1) {
				candidates.unshift(hw.substr(0,i));
			}
		}
		return candidates;
	}
	function dodict({detail}) {
		const candidates=findHeadword(detail);
		const rp=get(referPages);
		if (rp.length) {
			const i0=rp[0].i;
			if (parseInt(i0).toString()!==i0.toString()) {
				rp.shift()
			}
		}
		if (candidates.length) {
			referPages.set([{id:'b'+Math.floor(Math.random()*10000) , 
		i:candidates[0]}].concat(rp))
		}
	}

  

</script>



{#if !ready}
	<div>Loading</div>
{:else}
	<PaneWithPanel pos={60} bind:type>
		<div slot="panel-left-menu">
			<span>xxxlx;lkjas/dfsadf/sfsadfsdf//</span>
			<span class='togglestar' 
			on:click="{() => isFavorite=!isFavorite}" 
			class:star={isFavorite}>{isFavorite?'★':'☆'}</span>
			
		</div>
		<div slot="panel-left">
			<div class='spacer'></div>
			<div>
				{#each cards1 as  card (card.id)}
				<div  animate:flip >
				<Card id={card.id} idx={card.i} 
				on:delete={deleteCard} checkdict={true} on:dict={dodict}/>
				</div>
				{/each}

			</div>
		</div>
		<div slot="panel-right-menu">
		    <button class:active="{tab=='tab1'}" on:click="{() => tab = 'tab1'}" title='TOC'>☰</button>
    		<button class='search' class:active="{tab=='tab4'}" on:click="{()=>tab='tab4'}" title='search'>⌕</button>
    		<button class:active="{tab=='tab5'}" on:click="{()=>tab='tab5'}" title='dictionary'>ॐ</button>
    		<button class:active="{tab=='tab6'}" on:click="{()=>tab='tab6'}" title='refer'>⇆</button>
    		<button class:active="{tab=='tab2'}" on:click="{()=>tab='tab2'}" title='bookmark'>★</button>
    		<button class:active="{tab=='tab3'}" on:click="{()=>tab='tab3'}" title='note'>✎</button>
    		<button class:active="{tab=='tab7'}" on:click="{()=>tab='tab7'}" title='settings'>⋮</button>
		</div>

		<div slot="panel-right">
			<div class='spacer'></div>
			<div class="tab-content" class:visible={tab=='tab1'}>				
				<div>xxx</div>TAB111
				<div>xxx</div>TAB111
				<div>xxx</div>TAB111
				<div>xxx</div>TAB111
			</div>
			<div class="tab-content" class:visible={tab=='tab2'}>		
			</div>
			<div class="tab-content" class:visible={tab=='tab3'}>		
			</div>

			<div class="tab-content" class:visible={tab=='tab4'}>				
				{#each cards2 as card, index}
				
				<Card id={card.id} idx={card.i} />
				{/each}
			</div>
			<div class="tab-content" class:visible={tab=='tab5'}>		
			</div>
			<div class="tab-content" class:visible={tab=='tab6'}>		
			</div>
			<div class="tab-content" class:visible={tab=='tab7'}>		
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
		border-bottom: 3px solid transparent;
		/* padding: 12px 12px 8px 12px; */
		color: #999;
		border-radius: 0;
	}
	span.togglestar:hover{cursor:default}
	button.active {
		border-bottom: 3px solid darkorange;
		color: #333;
	}

	button.search {transform:rotateY(180deg)}
	span.star {color:gold}
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

</style>