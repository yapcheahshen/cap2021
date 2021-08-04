<script>
const dictionaries=[
    {"name":'moedict',"title":'台灣教育部國語字典'}
]
export let matchmode=0
const matchmodes=[
    {name:'開頭',value:'head'},
    {name:'中間',value:'middle'},
    {name:'結尾',value:'tail'}
]
</script>

<div>
    {#each dictionaries as dict } {dict.title} {/each}
    <select bind:value={matchmode}>
        {#each matchmodes as matchmode}
        <option value={matchmode.value}>{matchmode.name}</option>
        {/each}
    </select>
    <input/>
</div>

<style>

</style>