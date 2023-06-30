<script lang="ts">
    import { page } from "$app/stores";
    import { coinData } from "../store";

    const sym = $coinData.find(s => s.symbol === $page.url.searchParams.get('symbol'));

    function goBack() {
        window.history.back();
    }
</script>

<svelte:head>
    <title>Detail</title>
	<meta name="description" content="Detail" />
</svelte:head>

<section>
    <div class="detail-container">
        <div style="display: flex; flex-direction: column;">
            <div style="display: flex; margin: 1% 1%;">
                <button type="button" class="back-btn" on:click={goBack}>Back</button>
                <p class="title">Save / Update Token</p>
            </div>
            <div style="display: flex; flex-direction: column;">
                <div style="display: flex;">
                    <p class="input-title">Price: </p>
                    <p class="input-title" style="font-weight: bold;">{sym?.price}</p>
                </div>
                <hr style="margin: 10px 50px;"/>
                <div style="display: flex;">
                    <p class="input-title">Total Supply:</p>
                    <p class="input-title">{sym?.totalSupply}</p>
                </div>
                <hr style="margin: 10px 50px;"/>
                <div style="display: flex;">
                    <p class="input-title">Total Holders:</p>
                    <p class="input-title">{sym?.totalHolder}</p>
                </div>
                <hr style="margin: 10px 50px;"/>
                <div style="display: flex;">
                    <p class="input-title">Name:</p>
                    <p class="input-title">{sym?.name}</p>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .detail-container {
    width: auto;
    height: auto;
    margin: 1%;
    padding: 2%;
    border-width: 1px;
    border-style: solid;
    border-color: lightgray;
}

.input-title {
    padding: 1% 5%;
    text-wrap: nowrap;
    min-width: 200px;
}

.back-btn {
    padding: 0.5rem 1rem;
    margin: 0.25rem;
    border-width: 0;
    background-color: gainsboro;
    border-radius: 0.25rem;
}

.title {
    font-weight: bold;
    margin: 0 5%;
    display: flex;
    align-self: center;
}

</style>