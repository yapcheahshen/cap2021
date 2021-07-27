<script>
    export let idx,id,checkdict=false;
    import { pool } from 'pitaka/db';
	import {onMount,createEventDispatcher} from 'svelte'
    import { scale,slide ,draw,fade,fly} from 'svelte/transition';
	let content='',mx=1,db,moving=false;
    let  firsttouch={},lasttouch={} ;//, dictch='';
    const dispatch=createEventDispatcher();

	import { quintOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
	const [send, receive] = crossfade({
		duration: d => Math.sqrt(d * 200),

		fallback(node, params) {
			const style = getComputedStyle(node);
			const transform = style.transform === 'none' ? '' : style.transform;

			return {
				duration: 600,
				easing: quintOut,
				css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
			};
		}
	});

	onMount(async ()=>{
		db=pool.get('moedict');
        if (!db)return;
        if (parseInt(idx).toString()==idx) {
            content=db.getLine(idx);        
        } else {
            await getEntry(idx);
        }
	})
    const getEntry=async hw=>{
        const [from,to]=db.labels[0].getRange(hw);
        const lines=await db.readLines(from,to-from);
        content=lines.join('\n');
    }
$: if(db) content=parseInt(idx).toString()==idx?db.getLine(idx):getEntry(idx);
    const mouseclick=e=>{
        if (!checkdict)return;
        const sel=getSelection()
        let off=sel.anchorOffset;
        let dictch=sel.anchorNode.data.substr(off,20);
        if (!dictch.match( /[\u3fff-\u9fff]/u )) {
            off--;
            dictch=sel.anchorNode.data.substr(off,20);
        }
        let out='';
        for (let i=0;i<dictch.length;i++) {
            if (dictch[i].match( /[\u3fff-\u9fff]/u)) out+=dictch[i];
            else break;
        }
        dispatch('dict',out)
    }

    const dodict=e=>{
        // dispatch('dict',dictch)
    }
    function deleteCard(){
        dispatch('delete', id)
    }

</script>

<div  in:scale out:fly={{x:200}}>
    <span class='delete' on:click={deleteCard}>⨯</span>
    <span class='menu'>≡</span>{idx}/
    {#key content}
    <span class='maintext' on:click={mouseclick} 
    in:scale>{content}</span>
    {/key}
</div>

<style>
    .maintext {font-size:125%}
    .menu {cursor:default;height: 1em;width:1em;
        border:0px;background:rgba(0,0,0,0);color:rgba(0,0,0,0.1)}
    .menu:hover{color:rgb(0, 0, 255)}
    .delete {float:right;height:1em;width:1em;color:rgba(0,0,0,0.3)}
    .delete:hover {color:rgba(255,0,0,1);cursor:default}
</style>